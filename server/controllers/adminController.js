import { dbStore } from '../services/dbStore.js';

export const getAdminStats = async (req, res, next) => {
  try {
    const users = await dbStore.getAllUsers();
    const courses = await dbStore.getCourses({});
    const orders = await dbStore.getAllOrders();

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return res.status(200).json({
      totalUsers: users.length,
      totalCourses: courses.length,
      totalOrders: orders.length,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await dbStore.getAllUsers();
    const formatted = users.map((u) => {
      const { password, ...safe } = u._doc ? u._doc : u;
      safe.id = u._id ? u._id.toString() : u.id;
      return safe;
    });
    return res.status(200).json(formatted);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }
    const existing = await dbStore.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, error: 'User with this email already exists' });
    }
    const newUser = await dbStore.createUser({
      name,
      email,
      password,
      phone: phone || '+91 98765 43210',
      role: role || 'student',
    });
    const { password: pw, ...safe } = newUser._doc ? newUser._doc : newUser;
    safe.id = newUser._id ? newUser._id.toString() : newUser.id;
    return res.status(201).json(safe);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email, phone, role } = req.body;
    const user = await dbStore.findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    const updatedUser = await dbStore.updateUser(user._id ? user._id.toString() : user.id, {
      ...(name && { name: name.trim() }),
      ...(email && { email: email.trim().toLowerCase() }),
      ...(phone && { phone: phone.trim() }),
      ...(role && { role }),
    });
    const { password, ...safe } = updatedUser._doc ? updatedUser._doc : updatedUser;
    safe.id = updatedUser._id ? updatedUser._id.toString() : updatedUser.id;
    return res.status(200).json({ success: true, message: 'User updated successfully', user: safe });
  } catch (err) {
    next(err);
  }
};

export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, error: 'Invalid role specified' });
    }

    const user = await dbStore.findUserById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const updatedUser = await dbStore.updateUser(user._id ? user._id.toString() : user.id, { role });
    const { password, ...safe } = updatedUser._doc ? updatedUser._doc : updatedUser;
    safe.id = updatedUser._id ? updatedUser._id.toString() : updatedUser.id;

    return res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user: safe,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await dbStore.deleteUser(req.params.userId);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User account deleted successfully' });
  } catch (err) {
    next(err);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await dbStore.getAllOrders();
    return res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};

export const getEnrollments = async (req, res, next) => {
  try {
    const enrollments = await dbStore.getAllEnrollments();
    return res.status(200).json(enrollments);
  } catch (err) {
    next(err);
  }
};

export const deleteEnrollment = async (req, res, next) => {
  try {
    const deleted = await dbStore.deleteEnrollment(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Enrollment record not found' });
    }
    return res.status(200).json({ success: true, message: 'Enrollment record deleted successfully' });
  } catch (err) {
    next(err);
  }
};
