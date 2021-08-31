import FormItems from '@/components/FormComponents/FormItems/FormItems';

const uniAppApp = require('@/public/app/uniAppApp.json');
const uniAppPage = require('@/public/app/uniAppPage.json');

export default function Default(props) {
  const { uni, item, currentLeft, configSave } = props;
  // 右侧数据源
  const dataSource = (key): { list: any; data: any } => {
    switch (key) {
      case 'component0':
        return { list: uni.component.config, data: null };
      case 'page0':
        return { list: uniAppPage, data: uni.page.pagesConfigId.style };
      case 'app0':
        return { list: uniAppApp, data: uni.app?.uctuiConfigId?.uctuiConfig };
      case 'components0':
        return { list: uni.components.config, data: null };
      case 'pages0':
        return { list: uniAppPage, data: uni.pages.pagesConfigId.style };
      case 'pages1':
        return { list: uniAppPage, data: null };
      case 'apps0':
        return { list: uniAppApp, data: uni.apps.uctuiConfigId.uctuiConfig };
      default:
        return { list: null, data: null };
    }
  };
  return (
    <FormItems
      defaultData={dataSource(item.id).data}
      edit={currentLeft === 'component'}
      formList={dataSource(item.id).list}
      onChange={configSave}
    />
  );
}
