import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    imageUrl: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true, // Menambahkan createdAt dan updatedAt
  }
);

const Item = mongoose.model("Item", itemSchema);

export default Item;
