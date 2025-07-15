const mongoose = require('mongoose');
const Order = require('../src/models/Order');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo đơn hàng mới
  const newOrder = await Order.create({ customer: 'testCustomerId', products: [], status: 'pending' });
  console.log('Created order:', newOrder);

  // Test: Lấy danh sách đơn hàng
  const orders = await Order.find();
  console.log('All orders:', orders);

  // Test: Cập nhật đơn hàng
  const updated = await Order.findByIdAndUpdate(newOrder._id, { status: 'completed' }, { new: true });
  console.log('Updated order:', updated);

  // Test: Xóa đơn hàng
  await Order.findByIdAndDelete(newOrder._id);
  console.log('Deleted order:', newOrder._id);

  await mongoose.disconnect();
}

run().catch(console.error); 