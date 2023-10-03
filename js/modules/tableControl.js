import { pageDelProduct, pageTotalPrice } from './renderTable.js';
import { dataDelProduct } from './dataControl.js';

const showImage = (target) => {
  const top = screen.height / 2 - 300;
  const left = screen.width / 2 - 400;
  const win = window.open(
    'about:blank',
    '',
    `width=800,height=600,top=${top},left=${left}`
  );
  win.document.body.innerHTML = `
    <div style = "width: 100%; height: 100%;">
      <img src="${target.dataset.pic}" alt="">
    </div>
  `;
}

export const tableControl = (tableBody, totalPrice) => {
  tableBody.addEventListener('click', (e) => {
    if (e.target.closest('.table__btn_del')) {
      pageDelProduct(e.target, tableBody);
      dataDelProduct(e.target);
      pageTotalPrice(totalPrice);
    }

    if (e.target.closest('.table__btn_pic')) {
      showImage(e.target);
    }
  });
};
