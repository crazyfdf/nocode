const { getPage } = require('@/CMSRequest/api');

export default async (req, res) => {
  const data = req.query;
  const pages = await getPage(data);
  res.status(200).json(pages);
};
