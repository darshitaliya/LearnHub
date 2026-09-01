import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    id: { type: String, unique: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    category: {
      type: String,
      enum: ['General Inquiry', 'Technical Support', 'Instructor Partnership', 'Certificate Verification', 'Billing & Orders'],
      default: 'General Inquiry',
    },
    subject: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Unread', 'Read', 'In Review', 'Resolved'],
      default: 'Unread',
    },
    responseNotes: { type: String, default: '' },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  }
);

contactMessageSchema.pre('save', function (next) {
  if (!this.id && this._id) {
    this.id = this._id.toString();
  }
  next();
});

const ContactMessage = mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);

export default ContactMessage;
