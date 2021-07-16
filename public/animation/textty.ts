import TweenOne from 'rc-tween-one';
export const getEnter = e => {
  switch (e.index) {
    case 0:
      return {
        rotate: 90,
        opacity: 0,
        y: -60,
      };
    case 10:
    case 1:
      return {
        y: -60,
        x: -10,
        opacity: 0,
      };
    case 9:
    case 2:
      return {
        y: -60,
        x: 20,
        opacity: 0,
      };
    case 3:
      return {
        y: 60,
        opacity: 0,
      };
    case 8:
    case 4:
      return {
        x: 30,
        opacity: 0,
      };
    case 5:
      return {
        enter: [
          {
            scale: 2,
            opacity: 0,
            type: 'set',
          },
          { scale: 1.2, opacity: 1, duration: 300 },
          { scale: 0.9, duration: 200 },
          { scale: 1.05, duration: 150 },
          { scale: 1, duration: 100 },
        ],
        leave: {
          opacity: 0,
          scale: 0,
        },
      };
    case 6:
      return {
        scale: 0.8,
        x: 30,
        y: -10,
        opacity: 0,
      };
    case 7:
      return {
        scale: 0.8,
        x: 30,
        y: 10,
        opacity: 0,
      };
    default:
      return {
        opacity: 0,
      };
  }
};
const p0 = 'M0,100 L25,100 C34,20 40,0 100,0';
const p1 = 'M0,100 C5,120 25,130 25,100 C30,60 40,75 58,90 C69,98.5 83,99.5 100,100';
const ease0 = TweenOne.easing.path(p0);
const ease1 = TweenOne.easing.path(p1);
export const animation = [
  {
    repeatDelay: 500,
    y: -70,
    repeat: -1,
    yoyo: true,
    ease: ease0,
    duration: 1000,
  },
  {
    repeatDelay: 500,
    appearTo: 0,
    scaleX: 0,
    scaleY: 2,
    repeat: -1,
    yoyo: true,
    ease: ease1,
    duration: 1000,
  },
];
