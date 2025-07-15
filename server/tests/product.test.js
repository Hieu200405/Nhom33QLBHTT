const mongoose = require('mongoose');
const Product = require('../src/models/Product');

describe('Product Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let productId;

  it('should create a new product', async () => {
    const product = await Product.create({
      name: 'Test Product',
      price: 1000000,
      sku: 'TESTSKU001',
      warranty: '12 tháng',
      specifications: 'Công suất: 100W',
      image: '/assets/products/test.jpg',
      brand: 'TestBrand',
      category: 'TestCategory',
      description: 'Sản phẩm test',
      stock: 10
    });
    productId = product._id;
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(1000000);
  });

  it('should get all products', async () => {
    const products = await Product.find();
    expect(Array.isArray(products)).toBe(true);
  });

  it('should update a product', async () => {
    const updated = await Product.findByIdAndUpdate(productId, { price: 200 }, { new: true });
    expect(updated.price).toBe(200);
  });

  it('should delete a product', async () => {
    const deleted = await Product.findByIdAndDelete(productId);
    expect(deleted._id.toString()).toBe(productId.toString());
  });
}); 