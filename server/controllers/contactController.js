import { dbStore } from '../services/dbStore.js';

export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, category, subject, message } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, error: 'Name is required' });
    }
    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, error: 'A valid email is required' });
    }
    if (!subject || !subject.trim()) {
      return res.status(400).json({ success: false, error: 'Subject is required' });
    }
    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, error: 'Message content is required' });
    }

    const newContact = await dbStore.createContactMessage({
      name,
      email,
      category: category || 'General Inquiry',
      subject,
      message,
    });

    return res.status(201).json({
      success: true,
      message: 'Your message has been submitted successfully! Our support team will get back to you soon.',
      contact: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const getAdminContactMessages = async (req, res, next) => {
  try {
    const messages = await dbStore.getAllContactMessages();
    return res.status(200).json(messages);
  } catch (err) {
    next(err);
  }
};

export const updateContactMessageStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, responseNotes } = req.body;

    if (!['Unread', 'Read', 'In Review', 'Resolved'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updated = await dbStore.updateContactMessageStatus(id, status, responseNotes);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Contact message not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Status updated successfully',
      contact: updated,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContactMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await dbStore.deleteContactMessage(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Contact message not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Message deleted successfully',
    });
  } catch (err) {
    next(err);
  }
};
