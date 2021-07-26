import { postPage, postUniPagesConfig } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body.data;
  data.path = `pages/${data.type}/${data.name}`;
  data._updateTime = new Date().getTime();
  data._createTime = new Date().getTime();
  const page = await postPage(data);

  await postUniPagesConfig({ ...data, id: page.id });
  res.status(201).json({ data });
};
