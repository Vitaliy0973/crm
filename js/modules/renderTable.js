import { createElement } from './createElement.js';
import { goods } from '../goods.js';

// const cartTotalPrice = document.querySelector('.cms__total-price');

const createRow = (obj, count) => {
  const totalPrice = obj.count * obj.price - obj.count * obj.price *
    obj.discount / 100 || obj.count * obj.price;

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
        textContent: `$${totalPrice}`,
      }),
      createElement('td', {
        className: 'table__cell table__cell_btn-wrapper',
      },
        {
          appends: [
            createElement('button', {
              className: 'table__btn table__btn_pic',
              dataset: ['pic', `${location.origin}/img/img.jpg`],
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
};

export const renderGoods = (arr, tableBody) => {
  arr.forEach((item, index) => {
    tableBody.insertAdjacentElement('beforeend', createRow(item, index + 1));
  });
};

export const clearTable = (tableBody) => {
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
};

export const pageTotalPrice = (cartTotalPrice) => {
  const totalPrice = goods.reduce((sum, item) => {
    return sum += item.price * item.count - item.price * item.count *
      item.discount / 100 || item.price * item.count;
  }, 0);

  cartTotalPrice.textContent = `$ ${totalPrice}`;
};

export const addProductPage = (data, tableBody) => {
  tableBody.append(createRow(data, tableBody.rows.length + 1));
};

export const pageDelProduct = (target, tableBody) => {
  target.closest('tr').remove();

  Array.from(tableBody.rows).forEach((item, index) => {
    item.firstChild.textContent = index + 1;
  });
};
