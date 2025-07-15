const mongoose = require('mongoose');
const Address = require('../src/models/Address');

describe('Address Model', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/sales_management');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  let addressId;

  it('should create a new address', async () => {
    const address = await Address.create({
      code: '12345',
      name: 'Phường 1',
      full_name: 'Phường 1, Quận 1, TP.HCM',
      level: 3
    });
    addressId = address._id;
    expect(address.name).toBe('Phường 1');
    expect(address.full_name).toBe('Phường 1, Quận 1, TP.HCM');
  });

  it('should get all addresses', async () => {
    const addresses = await Address.find();
    expect(Array.isArray(addresses)).toBe(true);
  });

  it('should delete an address', async () => {
    const deleted = await Address.findByIdAndDelete(addressId);
    expect(deleted._id.toString()).toBe(addressId.toString());
  });
}); 