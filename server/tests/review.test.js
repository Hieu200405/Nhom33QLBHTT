const mongoose = require('mongoose');
const Review = require('../src/models/Review');
const User = require('../src/models/User');

describe('Review Model', () => {
  let userId;
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
    const user = await User.findOne({ username: 'user1' });
    userId = user ? user._id : undefined;
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let reviewId;

  it('should create a new review', async () => {
    const review = await Review.create({
      userId: userId,
      customerName: 'Nguyễn Văn An',
      rating: 5,
      content: 'Sản phẩm rất tốt'
    });
    reviewId = review._id;
    expect(review.rating).toBe(5);
    expect(review.content).toBe('Sản phẩm rất tốt');
    expect(review.customerName).toBe('Nguyễn Văn An');
  });

  it('should get all reviews', async () => {
    const reviews = await Review.find();
    expect(Array.isArray(reviews)).toBe(true);
  });

  it('should delete a review', async () => {
    const deleted = await Review.findByIdAndDelete(reviewId);
    expect(deleted._id.toString()).toBe(reviewId.toString());
  });
}); 