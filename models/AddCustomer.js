import mongoose from "mongoose";

const AddCustomerSchema = new mongoose.Schema(
  {
    trackingNumber: {
      type: String,
      required: [true, "Please provide Tracking Number"],
      minlength: 5,
      maxlength: 50,
      trim: true,
      unique: true,
      uppercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "Please provide first Name"],
      trim: true,
    },
    
    product: {
      type: String,
      required: [true, "Please provide Product"],
    },
    serialNumber: {
      type: String,
      required: [true, "Please provide Serial Number"],
    },
    brand: {
      type: String,
      required: [true, "Please provide Brand"],
    },
    replacedParts: {
      type: String,
    },
    fixingparts: {
      type: String,
      required: [true, "Please provide Fixing Parts"],
    },
    description: {
      type: String,
    },
    estimate: {
      type: String,
      required: [true, "Please provide Estimate"],
    },
    status: {
      type: String,
      enum: ["pending", "ongoing", "completed"],
      default: "pending",
    },
    
    address: {
      type: String,
      required: [true, "Please provide Address"],
    },
    price: {
      type: Number,
      required: [true, "Please provide Price"],
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid"],
      default: "unpaid",
    },
    warrantyStartAt: {
      type: String,
    },
    warrantyEndAt: {
      type: String,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "Admin",
      required: [true, "Please provide Admin"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Customer", AddCustomerSchema);
