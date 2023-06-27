import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { Order } from "@/models/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
const stripe = require('stripe')(process.env.STRIPE_SK);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name, email, city,
    postalCode, streetAddress, phone,
    cartProducts,
  } = req.body;
  await mongooseConnect();
  const productsIds = cartProducts.map(item => item.productId);
  const uniqueIds = [...new Set(productsIds)];
  const productsInfos = await Product.find({ _id: uniqueIds });

  let line_items = [];

  for (const cartProduct of cartProducts) {
    const { productId, price, count } = cartProduct;
    const productInfo = productsInfos.find(p => p._id.toString() === productId);
    if (productInfo) {
      const unitAmount = price * 100;
      line_items.push({
        quantity: count,
        price_data: {
          currency: 'THB',
          product_data: {
            name: `${productInfo.title} - ${price} THB`, // Include price information in the name or description field
          },
          unit_amount: unitAmount,
        },
      });
    }
  }

  const session = await getServerSession(req, res, authOptions);

  const orderDoc = await Order.create({
    line_items, name, email, city, postalCode,
    streetAddress, phone, paid: false,
    userEmail: session?.user?.email,
  });

  const shippingFeeSetting = await Setting.findOne({ name: 'shippingFee' });
  const shippingFeeCents = parseInt(shippingFeeSetting.value || '0') * 100;

  // Before creating the Stripe session
  if (line_items.length === 0) {
    res.status(400).json({ error: 'No items in the cart' });
    return;
  }

  // Create the Stripe session
  const stripeSession = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url: process.env.PUBLIC_URL + '/cart?success=1',
    cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
    metadata: { orderId: orderDoc._id.toString() },
    allow_promotion_codes: true,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: 'shipping fee',
          type: 'fixed_amount',
          fixed_amount: { amount: shippingFeeCents, currency: 'THB' },
        },
      },
    ],
  });

  res.json({
    url: stripeSession.url,
  });
}

