const mongoose = require('mongoose');
const User = require('../src/models/User');
const Employee = require('../src/models/Employee');
const Customer = require('../src/models/Customer');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo user mới
  const newUser = await User.create({ username: 'testuser', password: '123456', role: 'customer' });
  console.log('Created user:', newUser);

  // Test: Lấy danh sách user
  const users = await User.find();
  console.log('All users:', users);

  // Test: Cập nhật user
  const updatedUser = await User.findByIdAndUpdate(newUser._id, { password: '654321' }, { new: true });
  console.log('Updated user:', updatedUser);

  // Test: Xóa user
  await User.findByIdAndDelete(newUser._id);
  console.log('Deleted user:', newUser._id);

  // Tương tự cho Employee
  const newEmp = await Employee.create({ name: 'Test Employee', email: 'emp@test.com' });
  console.log('Created employee:', newEmp);
  await Employee.findByIdAndDelete(newEmp._id);

  // Tương tự cho Customer
  const newCus = await Customer.create({ name: 'Test Customer', email: 'cus@test.com' });
  console.log('Created customer:', newCus);
  await Customer.findByIdAndDelete(newCus._id);

  await mongoose.disconnect();
}

run().catch(console.error); 