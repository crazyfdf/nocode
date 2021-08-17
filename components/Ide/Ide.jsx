import { useEffect, useState } from 'react';
import { Controlled } from 'react-codemirror2';
// 代码模式，clike是包含java,c++等模式的
// import 'codemirror/mode/clike/clike';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/hint/show-hint.css';
// 主题风格
import 'codemirror/theme/solarized.css';
import 'codemirror/addon/lint/lint.css'; // 代码错误提示

export default function Ide (props) {
  const { onChange, defaultValue } = props;
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof navigator !== 'undefined')
    {
      // require('codemirror/mode/css/css');

      // 代码高亮
      require('codemirror/addon/selection/active-line');
      // ctrl+空格代码提示补全
      require('codemirror/addon/hint/show-hint');
      require('codemirror/addon/hint/anyword-hint.js');
      // 折叠代码
      require('codemirror/addon/fold/foldcode.js');
      require('codemirror/addon/fold/foldgutter.js');
      require('codemirror/addon/fold/brace-fold.js');
      require('codemirror/addon/fold/comment-fold.js');
      require('codemirror/addon/edit/closebrackets');
      require('codemirror/addon/edit/matchBrackets');
      require('codemirror/addon/lint/lint.js'); // 错误校验
      require('codemirror/mode/xml/xml');
      require('codemirror/mode/javascript/javascript');
      const CodeMirror = require('codemirror');

      CodeMirror.extendMode('css', {
        commentStart: '/*',
        commentEnd: '*/',
        newlineAfterToken: function (type, content) {
          return /^[;{}]$/.test(content);
        },
      });

      CodeMirror.extendMode('javascript', {
        commentStart: '/*',
        commentEnd: '*/',
        // FIXME semicolons inside of for
        newlineAfterToken: function (type, content, textAfter, state) {
          if (this.jsonMode)
          {
            return /^[\[,{]$/.test(content) || /^}/.test(textAfter);
          } else
          {
            if (content === ';' && state.lexical && state.lexical.type === ')') return false;
            return /^[;{}]$/.test(content) && !/^;/.test(textAfter);
          }
        },
      });

      CodeMirror.extendMode('xml', {
        commentStart: '<!--',
        commentEnd: '-->',
        newlineAfterToken: function (type, content, textAfter) {
          return (type === 'tag' && />$/.test(content)) || /^</.test(textAfter);
        },
      });

      // Comment/uncomment the specified range
      CodeMirror.defineExtension('commentRange', function (isComment, from, to) {
        var cm = this,
          curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
        cm.operation(function () {
          if (isComment)
          {
            // Comment range
            cm.replaceRange(curMode.commentEnd, to);
            cm.replaceRange(curMode.commentStart, from);
            if (from.line === to.line && from.ch === to.ch)
              // An empty comment inserted - put cursor inside
              cm.setCursor(from.line, from.ch + curMode.commentStart.length);
          } else
          {
            // Uncomment range
            var selText = cm.getRange(from, to);
            var startIndex = selText.indexOf(curMode.commentStart);
            var endIndex = selText.lastIndexOf(curMode.commentEnd);
            if (startIndex > -1 && endIndex > -1 && endIndex > startIndex)
            {
              // Take string till comment start
              selText =
                selText.substr(0, startIndex) +
                // From comment start till comment end
                selText.substring(startIndex + curMode.commentStart.length, endIndex) +
                // From comment end till string end
                selText.substr(endIndex + curMode.commentEnd.length);
            }
            cm.replaceRange(selText, from, to);
          }
        });
      });

      // Applies automatic mode-aware indentation to the specified range
      CodeMirror.defineExtension('autoIndentRange', function (from, to) {
        var cmInstance = this;
        this.operation(function () {
          for (var i = from.line; i <= to.line; i++)
          {
            cmInstance.indentLine(i, 'smart');
          }
        });
      });

      // Applies automatic formatting to the specified range
      CodeMirror.defineExtension('autoFormatRange', function (from, to) {
        var cm = this;
        var outer = cm.getMode(),
          text = cm.getRange(from, to).split('\n');
        var state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
        var tabSize = cm.getOption('tabSize');

        var out = '',
          lines = 0,
          atSol = from.ch === 0;
        function newline () {
          out += '\n';
          atSol = true;
          ++lines;
        }

        for (var i = 0; i < text.length; ++i)
        {
          var stream = new CodeMirror.StringStream(text[i], tabSize);
          while (!stream.eol())
          {
            var inner = CodeMirror.innerMode(outer, state);
            var style = outer.token(stream, state),
              cur = stream.current();
            stream.start = stream.pos;
            if (!atSol || /\S/.test(cur))
            {
              out += cur;
              atSol = false;
            }
            if (
              !atSol &&
              inner.mode.newlineAfterToken &&
              inner.mode.newlineAfterToken(
                style,
                cur,
                stream.string.slice(stream.pos) || text[i + 1] || '',
                inner.state,
              )
            )
              newline();
          }
          if (!stream.pos && outer.blankLine) outer.blankLine(state);
          if (!atSol) newline();
        }

        cm.operation(function () {
          cm.replaceRange(out, from, to);
          for (var cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
            cm.indentLine(cur, 'smart');
          cm.setSelection(from, cm.getCursor(false));
        });
      });
      setLoading(true);
    }
  }, []);
  // 格式化代码
  const autoFormatSelection = editor => {
    const script_length = editor.getValue().length;
    const startPos = { line: 0, ch: 0, sticky: null };
    const endPos = editor.doc.posFromIndex(script_length);
    editor.setSelection(startPos, endPos);
    editor.autoFormatRange(startPos, endPos);
    editor.commentRange(false, startPos, endPos);
  };
  const options = {
    mode: { name: 'javascript', json: true },
    theme: 'material',
    autofocus: true, // 自动获取焦点
    styleActiveLine: true, // 光标代码高亮
    lineNumbers: true, // 显示行号
    smartIndent: true, // 自动缩进
    indentUnit: 2, // 一个块应该缩进多少个空格。默认值为 2。
    // start-设置支持代码折叠
    lineWrapping: true,
    foldGutter: true,
    lint: true, // 代码出错提醒
    gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'], // end
    matchBrackets: true, // 括号匹配，光标旁边的括号都高亮显示
    autoCloseBrackets: true, // 键入时将自动关闭()[]{}''""
    extraKeys: {
      Ctrl: 'autocomplete',
      'Ctrl-Z': function (editor) {
        editor.undo();
      }, //undo
      'Ctrl-Y': function (editor) {
        editor.redo();
      }, //Redo
      'Ctrl-S': function (editor) {
        onChange && onChange(value);
        autoFormatSelection(editor);
      },
    },
  };

  return loading ? (
    <Controlled
      className='h-full w-full'
      value={value}
      options={options}
      onBeforeChange={(editor, data, value) => {
        setValue(value);
      }}
      onChange={(editor, data, value) => { }}
    />
  ) : (
    <div />
  );
}
