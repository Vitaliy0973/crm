import { goods } from '../goods.js'

export const createProductData = (data, id) => {
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

export const addProductData = (data) => {
  goods.push(data);
}

export const dataDelProduct = (target) => {
  const id = target.closest('tr').querySelector('.table__cell_name').dataset.id;
  const index = goods.findIndex(item => item.id === +id);

  if (index !== -1) {
    goods.splice(index, 1);
  }
};
