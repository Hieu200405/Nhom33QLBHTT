const mongoose = require('mongoose');
const SalesEvent = require('../src/models/SalesEvent');
const User = require('../src/models/User');

describe('SalesEvent Model', () => {
  let adminId;
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
    const admin = await User.findOne({ username: 'admin' });
    adminId = admin ? admin._id : undefined;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let eventId;

  it('should create a new sales event', async () => {
    const event = await SalesEvent.create({
      title: 'Sự Kiện Test',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-16'),
      type: 'event',
      status: 'active',
      createdBy: adminId
    });
    eventId = event._id;
    expect(event.title).toBe('Sự Kiện Test');
    expect(event.status).toBe('active');
    expect(event.createdBy.toString()).toBe(adminId.toString());
  });

  it('should get all sales events', async () => {
    const events = await SalesEvent.find();
    expect(Array.isArray(events)).toBe(true);
  });

  it('should delete a sales event', async () => {
    const deleted = await SalesEvent.findByIdAndDelete(eventId);
    expect(deleted._id.toString()).toBe(eventId.toString());
  });
}); 