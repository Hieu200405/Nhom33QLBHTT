const customerAutoService = require('../src/services/customerAutoService');

async function run() {
  // Test: Phân loại khách hàng tự động
  const result = await customerAutoService.autoClassifyCustomers();
  console.log('Auto classify customers result:', result);
}

run().catch(console.error); 