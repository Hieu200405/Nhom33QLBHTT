const mongoose = require('mongoose');
const Message = require('../src/models/Message');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Gửi tin nhắn mới
  const newMsg = await Message.create({ sender: 'testUserId', receiver: 'testUserId2', content: 'Hello!' });
  console.log('Created message:', newMsg);

  // Test: Lấy tin nhắn
  const messages = await Message.find();
  console.log('All messages:', messages);

  // Test: Xóa tin nhắn
  await Message.findByIdAndDelete(newMsg._id);
  console.log('Deleted message:', newMsg._id);

  await mongoose.disconnect();
}

run().catch(console.error); 