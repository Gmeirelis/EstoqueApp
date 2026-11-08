
const jwt = require("jsonwebtoken");

// Resolve o caminho para o arquivo .env

const autenticar = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Verifica se o cabeçalho foi enviado
  if (!authHeader) {
    return res.status(401).json({
      mensagem: "Token não informado",
    });
  }

  // 2. Verifica se o formato é estritamente "Bearer <token>"
  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res.status(401).json({
      mensagem: "Token mal formatado",
    });
  }

  const token = parts[1];

  try {
    // 3. Validação para garantir que o secret existe
    if (!process.env.JWT_SECRET) {
      console.error("ERRO CRÍTICO: JWT_SECRET não definido nas variáveis de ambiente.");
      return res.status(500).json({ mensagem: "Erro interno do servidor" });
    }

    // 4. Verifica e decodifica o token
    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    // Salva os dados do usuário na requisição
   
    req.usuario = usuario;

    // Passa para o próximo middleware ou rota
    return next();
  } catch (error) {
    if (error.name !== "TokenExpiredError" && error.name !== "JsonWebTokenError") {
      console.error("Erro na autenticação:", error);
    }

    return res.status(401).json({
      mensagem: "Token inválido ou expirado",
    });
  }
};

module.exports = autenticar;