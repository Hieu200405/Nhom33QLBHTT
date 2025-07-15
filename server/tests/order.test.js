const mongoose = require('mongoose');
const Order = require('../src/models/Order');

describe('Order Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let orderId;

  it('should create a new order', async () => {
    const order = await Order.create({
      orderNumber: 'ORD-TEST-001',
      customer: 'nguyenvanan@gmail.com',
      products: [],
      status: 'Đang xử lý',
      shippingAddress: '123 Test St',
      paymentMethod: 'COD',
      totalAmount: 1000000
    });
    orderId = order._id;
    expect(order.status).toBe('Đang xử lý');
  });

  it('should get all orders', async () => {
    const orders = await Order.find();
    expect(Array.isArray(orders)).toBe(true);
  });

  it('should update an order', async () => {
    const updated = await Order.findByIdAndUpdate(orderId, { status: 'Đã hoàn thành' }, { new: true });
    expect(updated.status).toBe('Đã hoàn thành');
  });

  it('should delete an order', async () => {
    const deleted = await Order.findByIdAndDelete(orderId);
    expect(deleted._id.toString()).toBe(orderId.toString());
  });
}); 