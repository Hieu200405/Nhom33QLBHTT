const mongoose = require('mongoose');
const SalesEvent = require('../src/models/SalesEvent');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo sự kiện mới
  const newEvent = await SalesEvent.create({ name: 'Test Event', discount: 10 });
  console.log('Created sales event:', newEvent);

  // Test: Lấy danh sách sự kiện
  const events = await SalesEvent.find();
  console.log('All sales events:', events);

  // Test: Xóa sự kiện
  await SalesEvent.findByIdAndDelete(newEvent._id);
  console.log('Deleted sales event:', newEvent._id);

  await mongoose.disconnect();
}

run().catch(console.error); 