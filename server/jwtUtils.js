const jwt = require('jsonwebtoken-promisified');
 
const jwtSecret = 'asilasil';


const generateToken = (user) => {
  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email },
    process.env.jwtSecret,
    { expiresIn: '1h' }
  );

  return token;
};

module.exports = {
  generateToken,
};