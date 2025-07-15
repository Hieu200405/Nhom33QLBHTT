const mongoose = require('mongoose');
const productUpdateService = require('../src/services/productUpdateService');

describe('Product Update Service', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });
  afterAll(async () => {
    await mongoose.disconnect();
  });
  it('should auto update inventory', async () => {
    const result = await productUpdateService.updateAllProductStatus();
    expect(result).toBeUndefined(); // Hàm không trả về gì, chỉ cần không lỗi
  }, 20000);
}); 