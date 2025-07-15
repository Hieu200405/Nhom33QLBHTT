const mongoose = require('mongoose');
const Review = require('../src/models/Review');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/your_db_name');

  // Test: Tạo đánh giá mới
  const newReview = await Review.create({ product: 'testProductId', customer: 'testCustomerId', rating: 5, comment: 'Great!' });
  console.log('Created review:', newReview);

  // Test: Lấy danh sách đánh giá
  const reviews = await Review.find();
  console.log('All reviews:', reviews);

  // Test: Xóa đánh giá
  await Review.findByIdAndDelete(newReview._id);
  console.log('Deleted review:', newReview._id);

  await mongoose.disconnect();
}

run().catch(console.error); 