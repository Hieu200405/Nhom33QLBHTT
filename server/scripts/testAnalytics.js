const mongoose = require('mongoose');
const axios = require('axios');

async function run() {
  // Giả sử backend đang chạy ở http://localhost:5000
  const baseUrl = 'http://localhost:5000/api/analytics';

  // Test: Lấy doanh thu
  const revenue = await axios.get(`${baseUrl}/revenue`);
  console.log('Revenue:', revenue.data);

  // Test: Lấy sản phẩm bán chạy
  const topProducts = await axios.get(`${baseUrl}/top-products`);
  console.log('Top selling products:', topProducts.data);

  // Test: Lấy thống kê khách hàng
  const customerStats = await axios.get(`${baseUrl}/customer-stats`);
  console.log('Customer stats:', customerStats.data);
}

run().catch(console.error); 