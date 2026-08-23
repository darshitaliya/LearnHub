import { dbStore } from '../services/dbStore.js';

export const checkout = async (req, res, next) => {
  try {
    const { items, paymentMethod } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    const user = await dbStore.findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const totalAmount = items.reduce((sum, item) => sum + (item.price || 0), 0);
    const orderId = `ord_${Date.now()}`;
    const userId = user._id ? user._id.toString() : user.id;

    const order = await dbStore.createOrder({
      id: orderId,
      userId,
      userName: user.name,
      items: items.map((i) => ({
        courseId: i.courseId || i.id,
        title: i.title,
        price: i.price || 0,
      })),
      totalAmount: parseFloat(totalAmount.toFixed(2)),
      paymentStatus: 'completed',
      paymentMethod: paymentMethod || 'Credit Card (Simulated)',
    });

    // Automatically enroll user in purchased courses
    const enrolledCourses = [...(user.enrolledCourses || [])];
    let updated = false;

    items.forEach((item) => {
      const cId = item.courseId || item.id;
      if (cId && !enrolledCourses.includes(cId)) {
        enrolledCourses.push(cId);
        updated = true;
      }
    });

    if (updated) {
      await dbStore.updateUser(userId, { enrolledCourses });
    }

    return res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await dbStore.getUserOrders(req.user.id);
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
