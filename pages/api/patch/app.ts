const { patchApp } = require('@/CMSRequest/api');

export default async (req, res) => {
  const { data } = req.body;
  const app = await patchApp(data.id, data);
  res.status(201).json(app);
};
