const productUpdateService = require('../src/services/productUpdateService');

async function run() {
  // Test: Tự động cập nhật tồn kho
  const result = await productUpdateService.autoUpdateInventory();
  console.log('Auto update inventory result:', result);
}

run().catch(console.error); 