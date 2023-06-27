import { mongooseConnect } from "@/lib/mongoose";
import { getSession } from "next-auth/react";
import { Order } from "@/models/Order";

// Establish database connection
mongooseConnect();

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (req.method === "DELETE") {
      const { orderId } = req.query;

      try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
          console.log("Order not found:", orderId);
          return res.status(404).json({ error: "Order not found" });
        }

        console.log("Deleted order:", deletedOrder);
        return res.json({ message: "Order removed successfully" });
      } catch (error) {
        console.error("Failed to remove order:", error);
        return res.status(500).json({ error: "Failed to remove order" });
      }
    }

    if (req.method === "POST") {
      // Handle the POST request here
      console.log("Received POST request:", req.body);
      return res.json({ message: "POST request received" });
    }

    if (req.method === "GET") {
      // Fetch all orders
      const orders = await Order.find({ email: session.user.email })
      .sort({ createdAt: -1 })
      .exec();
      res.json(orders);
    
    } else {
      res.status(400).json({ error: "Invalid request method" });
    }
  } catch (error) {
    console.error("Error fetching or removing orders:", error);
    res.status(500).json({ error: "An error occurred while handling the request" });
  }
}
