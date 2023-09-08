'use strict';

import { goods } from "./goods.js";

{
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

  const createElement = (selector, attributes, relatives) => {

    const elem = document.createElement(selector);

    if (attributes) {
      setAttributes(elem, attributes);
    }

    if (relatives) {
      setRelatives(elem, relatives);
    }

    return elem;
  };

  window.createElement = createElement;
}

const addProductModal = document.querySelector('.overlay');
const cartTableBody = document.querySelector('.table__body');

const createRow = (obj, count) => {

  const tableRow = createElement('tr', {}, {
    appends: [
      createElement('td', {
        className: 'table__cell',
        textContent: count,
      }),
      createElement('td', {
        className: 'table__cell table__cell_left table__cell_name',
        dataset: ['id', obj.id],
        innerHTML: `<span class="table__cell-id">id: ${obj.id}</span>${obj.title}`,
      }),
      createElement('td', {
        className: 'table__cell table__cell_left',
        textContent: obj.category,
      }),
      createElement('td', {
        classList: 'table__cell',
        textContent: obj.units,
      }),
      createElement('td', {
        className: 'table__cell',
        textContent: obj.count,
      }),
      createElement('td', {
        className: 'table__cell',
        textContent: `$${obj.price}`,
      }),
      createElement('td', {
        className: 'table__cell',
        textContent: `$${obj.count * obj.price}`,
      }),
      createElement('td', {
        className: 'table__cell table__cell_btn-wrapper',
      },
        {
          appends: [
            createElement('button', {
              className: 'table__btn table__btn_pic',
            }),
            createElement('button', {
              className: 'table__btn table__btn_edit',
            }),
            createElement('button', {
              className: 'table__btn table__btn_del',
            }),
          ],
        }),
    ],
  });

  return tableRow;
}

const renderGoods = (arr, tableBody) => {
  arr.forEach((item, index) => {
    tableBody.insertAdjacentElement('beforeend', createRow(item, index + 1));
  });
}

const clearTable = (tableBody) => {
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
}

addProductModal.remove('active');

clearTable(cartTableBody);
renderGoods(goods, cartTableBody);
