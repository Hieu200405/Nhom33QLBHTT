const mongoose = require('mongoose');
const User = require('../src/models/User');
const Employee = require('../src/models/Employee');
const Customer = require('../src/models/Customer');

describe('User/Employee/Customer Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should create, update, and delete a User', async () => {
    const user = await User.create({ username: 'testuser', password: '123456', role: 'user', fullName: 'Test User', email: 'testuser@example.com', phone: '0123456789', isActive: true });
    expect(user.username).toBe('testuser');
    const updated = await User.findByIdAndUpdate(user._id, { password: '654321' }, { new: true });
    expect(updated.password).toBe('654321');
    const deleted = await User.findByIdAndDelete(user._id);
    expect(deleted._id.toString()).toBe(user._id.toString());
  });

  it('should create and delete an Employee', async () => {
    const emp = await Employee.create({ name: 'Test Employee', email: 'emp@test.com', phone: '0123456788', department: 'Kinh doanh', position: 'Nhân viên bán hàng' });
    expect(emp.name).toBe('Test Employee');
    const deleted = await Employee.findByIdAndDelete(emp._id);
    expect(deleted._id.toString()).toBe(emp._id.toString());
  });

  it('should create and delete a Customer', async () => {
    const cus = await Customer.create({ name: 'Test Customer', email: 'cus@test.com', phone: '0123456787', address: '123 Test St' });
    expect(cus.name).toBe('Test Customer');
    const deleted = await Customer.findByIdAndDelete(cus._id);
    expect(deleted._id.toString()).toBe(cus._id.toString());
  });
}); 