const mongoose = require('mongoose');
const Product = require('../src/models/Product');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo sản phẩm mới
  const newProduct = await Product.create({ name: 'Test Product', price: 100 });
  console.log('Created product:', newProduct);

  // Test: Lấy danh sách sản phẩm
  const products = await Product.find();
  console.log('All products:', products);

  // Test: Cập nhật sản phẩm
  const updated = await Product.findByIdAndUpdate(newProduct._id, { price: 200 }, { new: true });
  console.log('Updated product:', updated);

  // Test: Xóa sản phẩm
  await Product.findByIdAndDelete(newProduct._id);
  console.log('Deleted product:', newProduct._id);

  await mongoose.disconnect();
}

run().catch(console.error); 