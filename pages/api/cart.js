
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


