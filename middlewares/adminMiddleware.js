const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  try {
    // Obter o token do cabeçalho de autorização
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      console.log("Token not provided");
      return res.status(401).json({
        message: "Auth failed - Token not provided",
        success: false,
      });
    }

    // Verificar o token usando a chave secreta
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Invalid token");
        return res.status(401).json({
          message: "Auth failed - Invalid token",
          success: false,
        });
      } else {
        // Verificar se o usuário tem permissões de administrador
        if (decoded.role !== "admin") {
          console.log("Access denied - Admin permissions required");
          return res.status(403).json({
            message: "Access denied - Admin permissions required",
            success: false,
          });
        }

        // Adicionar o ID do usuário decodificado ao corpo da requisição
        req.body.userId = decoded.id;

        // Permitir acesso à rota
        next();
      }
    });
  } catch (error) {
    console.log("Internal Server Error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = adminMiddleware;
