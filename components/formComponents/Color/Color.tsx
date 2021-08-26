import { useState } from 'react';
import { SketchPicker, ColorResult } from 'react-color';
import { rgba2Obj, colorRGBA2Hex } from '@/utils/tool';

export type ColorConfigType = string;

// value 初始值传来，onchange item给的回调
interface ColorProps {
  value?: ColorConfigType;
  onChange?: (v: ColorConfigType) => void;
}

function colorPicker(props: ColorProps) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(props.value);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color: ColorResult) => {
    setColor(color.hex);
    props.onChange && props.onChange(color.hex);
  };

  return (
    <div>
      <div
        style={{
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        }}
        onClick={handleClick}
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
      {displayColorPicker ? (
        <>
          <div
            style={{
              position: 'absolute',
              zIndex: 2000,
            }}
          >
            <SketchPicker color={color} onChange={handleChange} />
          </div>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
              zIndex: 1000,
            }}
            onClick={handleClose}
          />
        </>
      ) : null}
    </div>
  );
}

export default colorPicker;
