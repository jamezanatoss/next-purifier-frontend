import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";

export default async function handle(req,res) {
  await mongooseConnect();
  const ids = req.body.ids;
  res.json(await Product.find({_id:ids}));
}

// import { mongooseConnect } from "@/lib/mongoose";
// import { Product } from "@/models/Product";
// import mongoose from "mongoose";

// export default async function handle(req, res) {
//   await mongooseConnect();
//   const ids = req.body.ids;

//   if (!ids || !Array.isArray(ids)) {
//     res.status(400).json({ error: "Invalid or missing 'ids' in request body" });
//     return;
//   }

//   try {
//     const objectIdIds = ids.map((id) => mongoose.Types.ObjectId(id));
//     const products = await Product.find({ _id: { $in: objectIdIds } });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// }
