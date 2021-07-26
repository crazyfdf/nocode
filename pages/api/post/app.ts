import { postApp } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body.data;
  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();

  const app = await postApp(data);
  res.status(201).json(app);
};
