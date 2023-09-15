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
const addProductForm = document.querySelector('.modal__form');
const cartTableBody = document.querySelector('.table__body');
const addProductButton = document.querySelector('.panel__add-goods');
const cartTotalPrice = document.querySelector('.cms__total-price');

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

const renderGoods = (arr, tableBody) => {
  arr.forEach((item, index) => {
    tableBody.insertAdjacentElement('beforeend', createRow(item, index + 1));
  });
};

const clearTable = (tableBody) => {
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
};

const closeModal = () => {
  addProductModal.classList.remove('active');

  if (addProductForm.discount.checked) {
    addProductForm.discount_count.setAttribute('disabled', '');
  };

  addProductForm.reset();
}

const getRandomId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const calculateTotalPrice = () => {
  let totalPrice = addProductForm.price.value * addProductForm.count.value;

  if (addProductForm.discount.checked && addProductForm.discount_count.value) {
    return totalPrice - (totalPrice * addProductForm.discount_count.value / 100);
  }
  return totalPrice;
};

const createProductData = (data, id) => {
  return {
    "id": id,
    "title": data.name,
    "price": +data.price,
    "description": data.description,
    "category": data.category,
    "count": +data.count,
    "units": data.units,
    "discount": data.hasOwnProperty('discount') ? +data.discount_count : false,
    "images": {
      "small": "img/product-small.jpg",
      "big": "img/produc-big.jpg"
    }
  }
};

const addProductData = (data) => {
  goods.push(data);
}

const addProductPage = (data, tableBody) => {
  tableBody.append(createRow(data, tableBody.rows.length + 1));
};

const pageTotalPrice = () => {
  const totalPrice = goods.reduce((sum, item) => {
    return sum += item.price * item.count - item.price * item.count *
      item.discount / 100 || item.price * item.count;
  }, 0);

  cartTotalPrice.textContent = `$ ${totalPrice}`;
};


closeModal()
clearTable(cartTableBody);
renderGoods(goods, cartTableBody);
pageTotalPrice();


addProductButton.addEventListener('click', () => {
  const productId = addProductModal.querySelector('.vendor-code__id');
  productId.textContent = getRandomId(1, 99999999999999);
  addProductModal.classList.add('active');
});

addProductModal.addEventListener('click', (e) => {
  if (e.target === addProductModal || e.target.closest('.modal__close')) {
    closeModal();
  }
});

cartTableBody.addEventListener('click', (e) => {
  const cartDelProduct = Array.from(cartTableBody.querySelectorAll('.table__btn_del'));

  if (cartDelProduct.includes(e.target)) {
    const row = e.target.closest('tr');
    const id = row.querySelector('.table__cell_name').dataset.id;

    row.remove();

    Array.from(cartTableBody.rows).forEach((item, index) => {
      item.firstChild.textContent = index + 1;
    });

    goods.forEach((item, index) => {
      if (item.id === +id) {
        goods.splice(index, 1);
      }
    });

    pageTotalPrice();
  }
});

addProductForm.addEventListener('change', e => {
  if (e.target === addProductForm.discount) {
    if (addProductForm.discount_count.hasAttribute('disabled')) {
      addProductForm.discount_count.removeAttribute('disabled');
    } else {
      addProductForm.discount_count.setAttribute('disabled', '');
      addProductForm.discount_count.value = '';
    }
  }

  if (e.target === addProductForm.price || e.target === addProductForm.count ||
    e.target === addProductForm.discount_count || e.target === addProductForm.discount) {
    addProductForm.total.value = `$ ${calculateTotalPrice()}`;
  };
});

addProductForm.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProduct = Object.fromEntries(formData);
  const newProductId = +(addProductModal.querySelector('.vendor-code__id').textContent);
  const productData = createProductData(newProduct, newProductId);

  addProductData(productData);
  addProductPage(productData, cartTableBody);
  pageTotalPrice();

  closeModal();
  e.target.reset();
});
