import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  count: { type: Number, default: 1 },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }, // Add user identifier field
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
