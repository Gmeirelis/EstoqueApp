function ObterIniciais(nomeCompleto) {
  if (!nomeCompleto) return "";
  
  // 1. Remove espaços extras nas pontas e divide a string pelos espaços internos
  const partes = nomeCompleto.trim().split(/\s+/);
  
  // 2. Se houver apenas um nome, retorna apenas a inicial dele
  if (partes.length === 1) {
    return partes[0][0].toUpperCase();
  }

  // 3. Pega a 1ª letra do primeiro e do último nome
  const primeiraInicial = partes[0][0];
  const ultimaInicial = partes[partes.length - 1][0];

  return `${primeiraInicial}${ultimaInicial}`.toUpperCase();
}

export default ObterIniciais;
