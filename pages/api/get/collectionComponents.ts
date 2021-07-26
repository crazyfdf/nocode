// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function (req, res) {
  res.status(200).json({
    data: [
      {
        file: 'uni-components/node_modules/uctui/components/uct-details/uct-details.vue',
        name: 'uct-details',
        title: 'details',
        isCollection: 1,
      },
      {
        file: 'uni-components/node_modules/uctui/components/uct-scroll/uct-scroll.vue',
        name: 'uct-scroll',
        title: 'scroll',
        isCollection: 1,
      },
      {
        file: 'uni-components/node_modules/uctui/components/uct-form/uct-form.vue',
        name: 'uct-form',
        title: 'form',
        isCollection: 1,
      },
    ],
  });
}
