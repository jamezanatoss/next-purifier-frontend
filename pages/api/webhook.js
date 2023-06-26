import {mongooseConnect} from "@/lib/mongoose";
const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import { transporter } from "../../config/nodemailer";

const endpointSecret = "whsec_1a25ab059c336f2ffa464fad4e7e33a604183b61f28888956fd76d5e16cc88c0";

export default async function handler(req,res) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];
  // const nodemailer = require('nodemailer');
  // const transporter = nodemailer.createTransport({
  //   service: 'gmail',
  //   auth: {
  //     user: 'jamezandjuy@gmail.com',
  //     pass: 'jamezandjuy01',
  //   },
  // });

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log("event",event)

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
          status: 'delivery',
        });
        
        const customerEmail = data.customer_email;

        console.log("customerEmail",customerEmail)

        const mailOptions = {
          from: 'jamezandjuy@gmail.com',
          to: customerEmail,
          subject: 'ชำระเงินสำเร็จ',
          text: 'เลขออเดอร์ ' + orderId + 'ขอบคุณสำหรับออเดอร์ !',
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

// goood-humane-exalt-valor
// acct_1NL1DtKdh0z6pp4P