const mongoose = require('mongoose');
const Message = require('../src/models/Message');
const User = require('../src/models/User');

describe('Message Model', () => {
  let fromId, toId;
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
    const fromUser = await User.findOne({ username: 'user1' });
    const toUser = await User.findOne({ username: 'admin' });
    fromId = fromUser ? fromUser._id : undefined;
    toId = toUser ? toUser._id : undefined;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let messageId;

  it('should create a new message', async () => {
    const msg = await Message.create({ from: fromId, to: toId, content: 'Hello!' });
    messageId = msg._id;
    expect(msg.content).toBe('Hello!');
  });

  it('should get all messages', async () => {
    const messages = await Message.find();
    expect(Array.isArray(messages)).toBe(true);
  });

  it('should delete a message', async () => {
    const deleted = await Message.findByIdAndDelete(messageId);
    expect(deleted._id.toString()).toBe(messageId.toString());
  });
}); 