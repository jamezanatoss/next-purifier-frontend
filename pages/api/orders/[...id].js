import { Order } from "@/models/Order";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const order = await Order.findById(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json(order);
    } catch (error) {
      console.error("Failed to retrieve order:", error);
      return res.status(500).json({ error: "Failed to retrieve order" });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedOrder = await Order.findByIdAndDelete(id);
      if (!deletedOrder) {
        return res.status(404).json({ error: "Order not found" });
      }

      return res.json({ message: "Order removed successfully" });
    } catch (error) {
      console.error("Failed to remove order:", error);
      return res.status(500).json({ error: "Failed to remove order" });
    }
  }

  return res.status(405).json({ error: "Method Not Allowed" });
}
