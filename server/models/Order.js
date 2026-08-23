import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => `ord_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    },
    id: { type: String, required: true, index: true },
    userId: { type: String, required: true, index: true },
    userName: { type: String, required: true },
    items: [
      {
        courseId: { type: String, required: true },
        title: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['completed', 'pending', 'failed'], default: 'completed' },
    paymentMethod: { type: String, default: 'Credit Card (Simulated)' },
    isDeleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
