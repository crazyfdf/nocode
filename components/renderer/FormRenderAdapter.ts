export default data =>
  data.map(item => {
    let type = item.type.name;
    switch (true) {
      case /boolean/i.test(type):
        type = 'Switch';
        break;
      case type === 'string':
        type = 'Text';
        break;
      case type === 'number':
        type = 'Number';
        break;
      case type === 'object':
        type = 'Object';
        break;
      default:
        type = 'Text';
        break;
    }
    return {
      name: item.description,
      key: item.name,
      type,
    };
  });
