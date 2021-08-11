const { getComponent } = require('@/CMSRequest/api');

export default async (req, res) => {
  const data = req.query;
  const components = await getComponent(data);
  res.status(200).json(components);
};
