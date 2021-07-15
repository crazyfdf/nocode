export const configAdapter = data =>
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
      case ['object', 'array'].includes(type):
        type = 'FormItems';
        break;
      default:
        type = 'Text';
        break;
    }
    return {
      label: item.description,
      id: item.name,
      value: JSON.parse(item.defaultValue.value),
      type,
      placeholder: item.description,
    };
  });
const typeValue = type => {
  switch (type) {
    case 'number':
      return 'Number';
    case 'boolean':
      return 'Switch';
    case 'object':
      return 'Textarea';
    case 'string':
      return 'Text';
    default:
      return 'Text';
  }
};
export const defaultAdapter = data => {
  let defaultRes: any[] = [];
  const { value } = data;
  Object.entries(value).forEach(item => {
    const res: any = {
      id: item[0],
      type: typeValue(typeof item[1]),
      label: item[0],
      placeholder: item[0],
    };
    defaultRes = [...defaultRes, res];
  });

  return defaultRes;
};
