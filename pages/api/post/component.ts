import { postComponent } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body;
  const componentRes = await postComponent(data);

  res.status(201).json(componentRes);
};
