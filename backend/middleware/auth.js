const authMiddleware = (req, res, next) => {
  const adminSecret = req.headers['x-admin-secret'];
  
  if (!adminSecret || adminSecret !== process.env.ADMIN_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  next();
};

module.exports = authMiddleware;
