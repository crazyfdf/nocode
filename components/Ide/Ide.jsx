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
  let { onChange, defaultValue } = props;
  try
  {
    defaultValue = typeof defaultValue === 'string' ? defaultValue : JSON.stringify(defaultValue);
  } catch (err)
  {
    console.log(err);
  }
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
      require('codemirror/addon/hint/anyword-hint');
      // 折叠代码
      require('codemirror/addon/fold/foldcode');
      require('codemirror/addon/fold/foldgutter');
      require('codemirror/addon/fold/brace-fold');
      require('codemirror/addon/fold/comment-fold');
      require('codemirror/addon/edit/closebrackets');
      require('codemirror/addon/edit/matchBrackets');
      require('codemirror/addon/lint/lint'); // 错误校验
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
        const cm = this;
        const curMode = CodeMirror.innerMode(cm.getMode(), cm.getTokenAt(from).state).mode;
        cm.operation(function () {
          if (isComment)
          {
            // Comment range
            cm.replaceRange(curMode.commentEnd, to);
            cm.replaceRange(curMode.commentStart, from);
            if (from.line === to.line && from.ch === to.ch)
            {
              // An empty comment inserted - put cursor inside
              cm.setCursor(from.line, from.ch + curMode.commentStart.length);
            }
          } else
          {
            // Uncomment range
            let selText = cm.getRange(from, to);
            const startIndex = selText.indexOf(curMode.commentStart);
            const endIndex = selText.lastIndexOf(curMode.commentEnd);
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
        const cmInstance = this;
        this.operation(function () {
          for (let i = from.line; i <= to.line; i++)
          {
            cmInstance.indentLine(i, 'smart');
          }
        });
      });

      // Applies automatic formatting to the specified range
      CodeMirror.defineExtension('autoFormatRange', function (from, to) {
        const cm = this;
        const outer = cm.getMode();
        const text = cm.getRange(from, to).split('\n');
        const state = CodeMirror.copyState(outer, cm.getTokenAt(from).state);
        const tabSize = cm.getOption('tabSize');

        let out = '';
        let lines = 0;
        let atSol = from.ch === 0;
        function newline () {
          out += '\n';
          atSol = true;
          ++lines;
        }

        for (let i = 0; i < text.length; ++i)
        {
          const stream = new CodeMirror.StringStream(text[i], tabSize);
          while (!stream.eol())
          {
            const inner = CodeMirror.innerMode(outer, state);
            const style = outer.token(stream, state);
            const cur = stream.current();
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
            {
              newline();
            }
          }
          if (!stream.pos && outer.blankLine) outer.blankLine(state);
          if (!atSol) newline();
        }

        cm.operation(function () {
          cm.replaceRange(out, from, to);
          for (let cur = from.line + 1, end = from.line + lines; cur <= end; ++cur)
          {
            cm.indentLine(cur, 'smart');
          }
          cm.setSelection(from, cm.getCursor(false));
        });
      });
      setLoading(true);
    }
  }, []);
  // 格式化代码
  const autoFormatSelection = editor => {
    const scriptLength = editor.getValue().length;
    const startPos = { line: 0, ch: 0, sticky: null };
    const endPos = editor.doc.posFromIndex(scriptLength);
    editor.setSelection(startPos, endPos);
    editor.autoFormatRange(startPos, endPos);
    editor.commentRange(false, startPos, endPos);
  };
  const options = {
    mode: { name: 'javascript', json: true },
    theme: 'material',
    autofocus: false, // 自动获取焦点
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
      }, // undo
      'Ctrl-Y': function (editor) {
        editor.redo();
      }, // Redo
      'Ctrl-S': function (editor) {
        try { value = JSON.parse(value) } catch (error) { }
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
  ) : null;
}
