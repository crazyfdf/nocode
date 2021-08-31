import FormItems from '@/components/FormComponents/FormItems/FormItems';
import Color from '@/components/FormComponents/Color/Color';
import { Tooltip } from 'antd';

export default function Theme(props) {
  const { uni, currentLeft, configSave } = props;
  const { theme } = uni.app;
  const formList = theme.filter(item => item.type !== 'Color');
  const themeList = theme.filter(item => item.label.indexOf('主题颜色-') !== -1);
  const fontList = theme.filter(item => item.label.indexOf('字体-') !== -1);
  const mainList = theme.filter(item => item.label.indexOf('主色-') !== -1);
  return (
    <>
      <div className='my-2'>
        <div className='mb-1 font-bold text-base'>主题颜色</div>
        <div className='grid grid-cols-4 px-4'>
          {themeList.map(item => (
            <div key={item.id}>
              <Tooltip title={item.id}>
                <label className='font-medium'>{item.label}</label>
              </Tooltip>
              <div className='my-1'>
                <Color onChange={value => configSave({ ...item, value })} value={item.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-2'>
        <div className='mb-1 font-bold text-base'>主色</div>
        <div className='grid grid-cols-4 px-4'>
          {mainList.map(item => (
            <div key={item.id}>
              <Tooltip title={item.id}>
                <label className='font-medium'>{item.label}</label>
              </Tooltip>
              <div className='my-1'>
                <Color onChange={value => configSave({ ...item, value })} value={item.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='my-2'>
        <div className='mb-1 font-bold text-base'>字体</div>
        <div className='grid grid-cols-4 px-4'>
          {fontList.map(item => (
            <div key={item.id}>
              <Tooltip title={item.id}>
                <label className='font-medium'>{item.label}</label>
              </Tooltip>
              <div className='my-1'>
                <Color onChange={value => configSave({ ...item, value })} value={item.value} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <FormItems
        defaultData={theme}
        edit={currentLeft === 'component'}
        formList={formList}
        onChange={configSave}
      />
    </>
  );
}
