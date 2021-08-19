const { deleteCollectionApp } = require('@/CMSRequest/api');

export default async function (req, res) {
  const { data } = req.body;
  const result = await deleteCollectionApp(data._id);
  res.status(200).json(result);
}
