// import mongoose, {model, Schema, models} from "mongoose";

// Product = mongoose.model('Product');

// const CartSchema = new Schema({
//   productId: { type: mongoose.Types.ObjectId, ref: 'Product' },
//   count: { type: Number, default: 1 },
// });


// // Usage
// function addProductToCart(productId) {
//   // Find the product by its ID
//   Product.findById(productId)
//     .then((product) => {
//       // Create a new cart item
//       const cartItem = new Cart({ productId: product._id });
//       return cartItem.save();
//     })
//     .then((cartItem) => {
//       // Cart item successfully added to the cart
//       console.log('Added to cart:', cartItem);
//     })
//     .catch((error) => {
//       console.error('Error adding to cart:', error);
//     });
// }

// // Remove product from cart
// function removeProductFromCart(cartItemId) {
//   // Remove the cart item by its ID
//   Cart.findByIdAndRemove(cartItemId)
//     .then(() => {
//       console.log('Removed from cart');
//     })
//     .catch((error) => {
//       console.error('Error removing from cart:', error);
//     });
// }

// export const Cart = models?.Cart || model('Address', AddressSchema);
