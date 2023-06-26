// import {mongooseConnect} from "@/lib/mongoose";
// import {getServerSession} from "next-auth";
// import {authOptions} from "@/pages/api/auth/[...nextauth]";
// import {Order} from "@/models/Order";

// export default async function handle(req, res) {
//   await mongooseConnect();
//   const {user} = await getServerSession(req, res, authOptions);
//   res.json(
//     await Order.find({userEmail:user.email})
//   );
// }

// import { mongooseConnect } from "@/lib/mongoose";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import { Order } from "@/models/Order";

// export default async function handle(req, res) {
//   await mongooseConnect();
//   const { user } = await getServerSession(req, res, authOptions);

//   try {
//     const orders = await Order.find({ userEmail: user.email });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "An error occurred while fetching the orders" });
//   }
// }

import { mongooseConnect } from "@/lib/mongoose";
import { getSession } from "next-auth/react";
import { Order } from "@/models/Order";

export default async function handler(req, res) {
  await mongooseConnect();

  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const orders = await Order.find({ email: session.user.email });
    //console.log("userEmail",userEmail)
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching the orders" });
  }
}





