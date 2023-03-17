const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    let token = req.headers.authorization;
    // let token = req.headers['authorization'];
    // console.log(token)

  if(!token){
    return res.status(403).send({
        auth: false,
        token: null,
        message: 'Missing Token'
    })
  }
  jwt.verify(token, process.env.JWt_SECRET, function(err, jwtDecrypted) {
    if(err){
        return res.status(403).send({
            auth: false,
            token: null,
            message: 'Unauthorized',
        })
    }
    // console.log(jwtDecrypted)
    req.userId = jwtDecrypted.id;
  
  next();
  })
}
  module.exports = verifyToken

