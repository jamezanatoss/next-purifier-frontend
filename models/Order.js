import { model, models, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    email: String,
    city: String,
    postalCode: String,
    streetAddress: String,
    phone: String,
    paid: Boolean,
    status: {
      type: String,
      enum: ['waiting', 'delivery', 'shipped','installed'],
      default: 'waiting'
    },
  },
  {
    timestamps: true,
  }
);

export const Order = models?.Order || model("Order", OrderSchema);