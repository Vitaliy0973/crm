import { pageDelProduct, pageTotalPrice } from './renderTable.js';
import { dataDelProduct } from './dataControl.js';

export const tableControl = (tableBody, totalPrice) => {
  tableBody.addEventListener('click', (e) => {
    if (e.target.closest('.table__btn_del')) {
      pageDelProduct(e.target, tableBody);
      dataDelProduct(e.target);
      pageTotalPrice(totalPrice);
    }
  });
};
