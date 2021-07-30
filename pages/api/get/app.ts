import { getApp } from '@/CMSRequest/api';

export default async (req, res) => {
  const data = req.query;
  const app = await getApp(data);
  res.status(200).json(app);
};
