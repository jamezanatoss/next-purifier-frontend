
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default async function handle(req, res) {
  await mongooseConnect();
  const cartProducts = req.body.ids;

  const productIds = cartProducts?.map((item) => item.productId);

  try {
    const products = await Product.find({ _id: { $in: productIds } });

    const updatedProducts = products.map((product) => {
      const cartProduct = cartProducts.find((item) => item.productId === product._id.toString());
      if (cartProduct) {
        const updatedProduct = { ...product.toObject(), count: cartProduct.count };
        return updatedProduct;
      }
      return product.toObject();
    });

    res.json(updatedProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}


// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import { Cart } from "@/models/Cart";

// export default async function handle(req, res) {
//   await mongooseConnect();

//   if (req.method === 'POST') {
//     const { productId } = req.body;

//     try {
//       const product = await Product.findById(productId);

//       if (!product) {
//         return res.status(404).json({ error: 'Product not found' });
//       }

//       const cartItem = new Cart({ productId: product._id });
//       await cartItem.save();

//       return res.status(200).json({ message: 'Product added to cart', cartItem });
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   if (req.method === 'GET') {
//     const cartProducts = req.body.ids;
//     const productIds = cartProducts?.map((item) => item.productId);

//     try {
//       const products = await Product.find({ _id: { $in: productIds } });

//       const updatedProducts = products.map((product) => {
//         const cartProduct = cartProducts.find((item) => item.productId === product._id.toString());
//         if (cartProduct) {
//           const updatedProduct = { ...product.toObject(), count: cartProduct.count };
//           return updatedProduct;
//         }
//         return product.toObject();
//       });

//       return res.json(updatedProducts);
//     } catch (error) {
//       return res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }

//   return res.status(405).json({ error: 'Method not allowed' });
// }

