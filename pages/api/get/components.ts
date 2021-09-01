const { getComponents } = require('@/CMSRequest/api');

export default async (req, res) => {
  const data = req.query;
  const components = await getComponents(data);
  res.status(200).json(components);
};
