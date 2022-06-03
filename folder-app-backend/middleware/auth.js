require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.SECRET_JWT_CODE;
const TOKEN_EXPIRATION_TIME = '1hr';

const extractTokenFromHeader = (req) => {
  let token;
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    token = bearerToken;
  }
  return token;
}

const verifyToken = (req, res, next) => {
  const token = req.body.token ||  extractTokenFromHeader(req);

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};

const getToken = (userId) => 
  jwt.sign({ userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION_TIME });


module.exports = { getToken, verifyToken };