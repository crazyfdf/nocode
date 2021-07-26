// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function (req, res) {
  const { name, file, title } = req.body.data;

  res.status(200).json({ msg: 'success' });
}
