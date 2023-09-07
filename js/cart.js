'use strict';

import { goods } from "./goods.js";

const addProductModal = document.querySelector('.overlay');
const cartTableBody = document.querySelector('.table__body');

const createRow = (obj, count) => {
  const tableRow = document.createElement('tr');
  const tableCount = document.createElement('td');
  const productName = document.createElement('td');
  const productCategory = document.createElement('td');
  const productUnit = document.createElement('td');
  const productQuantity = document.createElement('td');
  const productPrice = document.createElement('td');
  const productTotalPrice = document.createElement('td');

  tableCount.classList.add('table__cell');
  tableCount.textContent = count;

  productName.classList.add('table__cell', 'table__cell_left', 'table__cell_name');
  productName.dataset.id = obj.id;
  productName.insertAdjacentHTML(
    'afterbegin', `<span class="table__cell-id">id: ${obj.id}</span>${obj.title}`
  );

  productCategory.classList.add('table__cell', 'table__cell_left');
  productCategory.textContent = obj.category;

  productUnit.classList.add('table__cell');
  productUnit.textContent = obj.units;

  productQuantity.classList.add('table__cell');
  productQuantity.textContent = obj.count;

  productPrice.classList.add('table__cell');
  productPrice.textContent = `$${obj.price}`;

  productTotalPrice.classList.add('table__cell');
  productTotalPrice.textContent = `$${obj.count * obj.price}`;

  tableRow.append(tableCount, productName, productCategory, productUnit,
    productQuantity, productPrice, productTotalPrice);

  tableRow.insertAdjacentHTML('beforeend', `
    <td class="table__cell table__cell_btn-wrapper">
      <button class="table__btn table__btn_pic"></button>
      <button class="table__btn table__btn_edit"></button>
      <button class="table__btn table__btn_del"></button>
    </td>
  `);

  return tableRow;
}

const createRowV2 = (obj, count) => {
  const tableRow = document.createElement('tr');

  tableRow.insertAdjacentHTML('beforeend', `
  <td class="table__cell">${count}</td>
  <td class="table__cell table__cell_left table__cell_name" data-id="${obj.id}">
    <span class="table__cell-id">id: ${obj.id}</span>
    ${obj.title}
  </td>
  <td class="table__cell table__cell_left">${obj.category}</td>
  <td class="table__cell">${obj.units}</td>
  <td class="table__cell">${obj.count}</td>
  <td class="table__cell">$${obj.price}</td>
  <td class="table__cell">$${obj.count * obj.price}</td>
  <td class="table__cell table__cell_btn-wrapper">
    <button class="table__btn table__btn_pic"></button>
    <button class="table__btn table__btn_edit"></button>
    <button class="table__btn table__btn_del"></button>
  </td>
  `);

  return tableRow;
}

const renderGoods = (arr, tableBody) => {
  for (let i = 0; i < arr.length; i++) {
    tableBody.insertAdjacentElement('beforeend', createRow(arr[i], i + 1));
  }
}

const clearTable = (tableBody) => {
  while (tableBody.firstChild) {
    tableBody.firstChild.remove();
  }
}

addProductModal.remove('active');

clearTable(cartTableBody);
renderGoods(goods, cartTableBody);
