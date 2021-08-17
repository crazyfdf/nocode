const { getComponentTemplate, getPageTemplate, getAppTemplate } = require('@/CMSRequest/api');

export default async function (req, res) {
  const data = {
    query: {
      status: {
        $eq: 1,
      },
    },
  };
  const result = (
    await Promise.all([getComponentTemplate(data), getPageTemplate(data), getAppTemplate(data)])
  ).map(item => item.data);

  res.status(200).json({ data: result });
}
