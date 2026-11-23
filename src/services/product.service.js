import Product from '../models/product.model.js';
import HttpError from '../utils/HttpError.js';

function ensureFound(product, id) {
  if (!product) throw new HttpError(404, `Product ${id} not found`);
  return product;
}

export const createProduct = (data) => Product.create(data);

export const getProducts = () => Product.find().sort({ createdAt: -1 });

export const getProductById = async (id) => ensureFound(await Product.findById(id), id);

export const updateProduct = async (id, data) =>
  ensureFound(
    await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }),
    id,
  );

export const deleteProduct = async (id) => ensureFound(await Product.findByIdAndDelete(id), id);
