export const getElements = () => {
  const addProductModal = document.querySelector('.overlay');
  const addProductForm = addProductModal.querySelector('.modal__form');
  const modalIdProduct = addProductModal.querySelector('.vendor-code__id');
  const cartTableBody = document.querySelector('.table__body');
  const addProductButton = document.querySelector('.panel__add-goods');
  const cartTotalPrice = document.querySelector('.cms__total-price');

  return {
    addProductModal,
    addProductForm,
    modalIdProduct,
    cartTableBody,
    addProductButton,
    cartTotalPrice,
  }
}
