import * as productService from '../services/product.service.js';

export async function create(req, res) {
  res.status(201).json(await productService.createProduct(req.body));
}

export async function list(req, res) {
  res.json(await productService.getProducts());
}

export async function getOne(req, res) {
  res.json(await productService.getProductById(req.params.id));
}

export async function update(req, res) {
  res.json(await productService.updateProduct(req.params.id, req.body));
}

export async function remove(req, res) {
  await productService.deleteProduct(req.params.id);
  res.status(204).end();
}
