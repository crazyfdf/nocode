import { useState } from 'react';
import { Popover } from 'antd';
import { SketchPicker, ColorResult } from 'react-color';

export type ColorConfigType = string;

// value 初始值传来，onchange item给的回调
interface ColorProps {
  value?: ColorConfigType;
  onChange?: (v: ColorConfigType) => void;
}

function colorPicker(props: ColorProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(props.value);

  const handleClick = visible => {
    setDisplayColorPicker(visible);
  };

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    props.onChange && props.onChange(color.hex);
  };

  return (
    <Popover
      visible={displayColorPicker}
      onVisibleChange={handleClick}
      trigger='click'
      content={<SketchPicker color={color} onChange={handleChange} />}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '2px',
            background: `${color}`,
          }}
        />
      </div>
    </Popover>
  );
}

export default colorPicker;
