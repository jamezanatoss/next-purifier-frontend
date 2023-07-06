import mongoose from 'mongoose';

const { Schema } = mongoose;

const cartSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product' },
  count: { type: Number, default: 1 },
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
