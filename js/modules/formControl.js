import { createProductData, addProductData } from './dataControl.js';
import { closeModal } from './modalControl.js';
import { addProductPage, pageTotalPrice } from './renderTable.js';

const calculateTotalPrice = (form) => {
  let totalPrice = form.price.value * form.count.value;

  if (form.discount.checked && form.discount_count.value) {
    return totalPrice - (totalPrice * form.discount_count.value / 100);
  }
  return totalPrice;
};

export const formControl = (
  addProductForm, modalIdProduct, cartTableBody, addProductModal, cartTotalPrice
) => {

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
      addProductForm.total.value = `$ ${calculateTotalPrice(addProductForm)}`;
    };
  });

  addProductForm.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newProduct = Object.fromEntries(formData);
    const productData = createProductData(newProduct, +modalIdProduct.textContent);

    addProductData(productData);
    addProductPage(productData, cartTableBody);
    pageTotalPrice(cartTotalPrice);

    closeModal(addProductModal, addProductForm);
    e.target.reset();
  });
}
