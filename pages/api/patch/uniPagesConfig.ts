import { patchUniPagesConfig } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body;
  const pagesConfig = await patchUniPagesConfig(data.id, data.values);
  console.log(pagesConfig);
  res.status(201).json(pagesConfig);
};
