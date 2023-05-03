import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collectionName = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
    default: [],
  },
});

cartSchema.pre("findOne", function () {
  this.populate("products.product");
});

cartSchema.plugin(mongoosePaginate);

const cartsSchema = mongoose.model(collectionName, cartSchema);
export default cartsSchema;
