import { patchUniAppsConfig } from '@/CMSRequest/api';

export default async (req, res) => {
  const { data } = req.body;
  const appsConfig = await patchUniAppsConfig(data.id, data.values);
  console.log(appsConfig);
  res.status(201).json(appsConfig);
};
