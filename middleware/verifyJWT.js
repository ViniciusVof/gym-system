const jwt = require("jsonwebtoken");

module.exports = {
    verifyJWT(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) return res.status(401).json({message: "Token não fornecido"});

        jwt.verify(token, process.env.SECRET, function (err, decoded) {
          if (err) return res.status(500).json({message: "Token expirado ou inválido"});
          req.userId = decoded.id;
          next(); 
        })
    }

}