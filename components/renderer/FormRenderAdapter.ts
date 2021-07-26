function isJSON(str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str);
      return true;
    } catch (e) {
      return false;
    }
  }
  return false;
}

export const configAdapter = data => {
  const filterData = data.filter(item => {
    const flag = item.tags && item.tags.ignore && item.tags.ignore[0].description === true;
    return !flag;
  });
  return filterData.map(item => {
    let type = item.type.name;
    switch (true) {
      case /boolean/i.test(type):
        type = 'Switch';
        break;
      case type === ['object', 'string'].includes(type):
        type = 'Text';
        break;
      case type === 'number':
        type = 'Number';
        break;
      case ['array'].includes(type):
        type = 'FormItems';
        break;
      default:
        type = 'Text';
        break;
    }
    return {
      label: item.description,
      id: item.name,
      value: isJSON(item.defaultValue.value)
        ? JSON.parse(item.defaultValue.value)
        : item.defaultValue.value,
      type,
      placeholder: item.description,
    };
  });
};
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
  let resData = {};
  data.forEach(item => {
    resData = Object.assign(resData, { [item.id]: item.value });
  });
  return resData;
};

export const formListAdapter = data => {
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
