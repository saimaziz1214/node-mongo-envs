import { Schema, model } from 'mongoose';

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false },
);

export default model('Product', productSchema);
