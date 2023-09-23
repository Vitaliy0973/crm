import { getElements } from "./modules/getElements.js";
import { goods } from "./goods.js";
import { renderGoods, clearTable, addProductPage, pageTotalPrice } from "./modules/renderTable.js";
import { modalControl, closeModal } from "./modules/modalControl.js";
import { formControl } from "./modules/formControl.js";
import { tableControl } from "./modules/tableControl.js";

const {
  addProductModal,
  addProductForm,
  modalIdProduct,
  cartTableBody,
  addProductButton,
  cartTotalPrice,
} = getElements();

const init = () => {
  closeModal(addProductModal, addProductForm);
  clearTable(cartTableBody);
  renderGoods(goods, cartTableBody);
  pageTotalPrice(cartTotalPrice);

  modalControl(addProductModal, modalIdProduct, addProductButton, addProductForm);

  tableControl(cartTableBody, cartTotalPrice);

  formControl(addProductForm, modalIdProduct, cartTableBody, addProductModal, cartTotalPrice);
}

init();
