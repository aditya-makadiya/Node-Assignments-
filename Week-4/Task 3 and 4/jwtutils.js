const jwt = require('jsonwebtoken');
const SECRET_KEY = 'itissecretkey';

const generateToken = (payload) => {
  const options = {
    expiresIn: '7h',
  };
  const token = jwt.sign(payload, SECRET_KEY, options);
  
  return token;
};

const authToken = (req,res,next) => {
  const token = req.headers.authorization?.split(' ')[1];
    console.log('Received Token:', token);
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user; // Store decoded user data in req
    next();
  });
}

module.exports = {
  generateToken,
  authToken,
};