const mongoose = require('mongoose');
const Address = require('../src/models/Address');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo địa chỉ mới
  const newAddress = await Address.create({ customer: 'testCustomerId', address: '123 Test St', city: 'Test City' });
  console.log('Created address:', newAddress);

  // Test: Lấy danh sách địa chỉ
  const addresses = await Address.find();
  console.log('All addresses:', addresses);

  // Test: Xóa địa chỉ
  await Address.findByIdAndDelete(newAddress._id);
  console.log('Deleted address:', newAddress._id);

  await mongoose.disconnect();
}

run().catch(console.error); 