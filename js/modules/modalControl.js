const getRandomId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const closeModal = (addProductModal, addProductForm) => {
  addProductModal.classList.remove('active');

  if (addProductForm.discount.checked) {
    addProductForm.discount_count.setAttribute('disabled', '');
  };

  addProductForm.reset();
}

export const modalControl = (addProduct, productId, addProductButton, addProductForm) => {
  const openModal = () => {
    productId.textContent = getRandomId(1, 99999999999999);
    addProduct.classList.add('active');
  }

  addProductButton.addEventListener('click', openModal);

  addProduct.addEventListener('click', e => {
    if (e.target === addProduct || e.target.closest('.modal__close')) {
      closeModal(addProduct, addProductForm);
    }
  });
}
