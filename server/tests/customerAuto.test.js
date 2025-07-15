const mongoose = require('mongoose');
const customerAutoService = require('../src/services/customerAutoService');

describe('Customer Auto Service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should auto add customer from order', async () => {
    const orderData = {
      orderNumber: 'ORD-TEST-002',
      shippingAddress: '123 Test St'
    };
    const result = await customerAutoService.autoAddCustomerFromOrder(orderData, 'user@example.com');
    expect(result).toBeDefined();
  }, 20000);
}); 