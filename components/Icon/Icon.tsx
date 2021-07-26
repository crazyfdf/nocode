import { createFromIconfontCN } from '@ant-design/icons';

export default createFromIconfontCN({
  scriptUrl: [
    process.env.iconPath as string, // icon-javascript, icon-java, icon-shoppingcart (overrided)
  ],
});
