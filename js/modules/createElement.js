const setAttributes = (elem, obj) => {
  const possibleAttr = ['className', 'textContent', 'id', 'href', 'target',
    'name', 'for', 'value', 'type', 'min', 'max'];
  const attrKeys = Object.keys(obj);

  for (const key of attrKeys) {
    if (possibleAttr.includes(key)) {
      elem[key] = obj[key];
    }

    if (key === 'dataset') {
      elem[key][obj[key][0]] = obj[key][1];
    }

    if (key === 'innerHTML') {
      elem.innerHTML = obj[key];
    }
  }
};

const setRelatives = (elem, obj) => {
  const relativesKeys = Object.keys(obj);

  for (const key of relativesKeys) {
    if (typeof obj[key] === 'function') {
      obj[key](elem);
    }

    if (key === 'parrent') {
      obj[key].append(elem);
    }

    if (key === 'appends') {
      obj[key].forEach(item => elem.append(item));
    }
  }
}

export const createElement = (selector, attributes, relatives) => {

  const elem = document.createElement(selector);

  if (attributes) {
    setAttributes(elem, attributes);
  }

  if (relatives) {
    setRelatives(elem, relatives);
  }

  return elem;
};
