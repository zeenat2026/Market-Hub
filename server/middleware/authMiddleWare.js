import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Header mein token check karo
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // "Bearer xyz123..." mein se sirf "xyz123..." nikalo
      token = req.headers.authorization.split(' ')[1];

      // 2. Token verify karo
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Token se mile ID se user dhoondo, request mein attach karo
      req.user = await User.findById(decoded.id).select('-password');

      // 4. Sab sahi — aage jaane do
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role ==='admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
        
    }
}