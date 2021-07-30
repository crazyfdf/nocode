import { getUniPagesConfig } from '@/CMSRequest/api';

export default async (req, res) => {
  const data = req.query;
  const pagesConfig = await getUniPagesConfig(data);
  res.status(200).json(pagesConfig);
};
