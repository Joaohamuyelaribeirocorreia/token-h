/*!
 * token-h - Biblioteca JWT Simplificada
 *
 * Copyright (c) 2025 "Hamuyela.".
 * Todos os direitos reservados.
 *
 * Licenciado sob a Licença MIT
 * https://opensource.org/licenses/MIT
 */
const crypto = require('crypto');
const ms = require('.modules/ms');

/**
 * Codifica uma string para base64URL.
 */
function base64urlEncode(str) {
  return Buffer.from(str)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

/**
 * Decodifica uma string de base64URL.
 */
function base64urlDecode(str) {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  const padLength = 4 - (base64.length % 4);
  if (padLength !== 4) {
    for (let i = 0; i < padLength; i++) {
      base64 += '=';
    }
  }
  return Buffer.from(base64, 'base64').toString();
}

/**
  * Assina o cabeçalho e o payload usando o algoritmo especificado.
  */
function sign(headerCodificado, payloadCodificado, secret, algorithm = 'HS256') {
    const data = headerCodificado + '.' + payloadCodificado;
    switch (algorithm) {
      case 'HS256':
        const hmac = crypto.createHmac('SHA256', secret);
        hmac.update(data);
        return base64urlEncode(hmac.digest('hex'));
      case 'RS256':
        const privateKey = secret;
        return base64urlEncode(crypto.sign('RSA-SHA256', Buffer.from(data), privateKey).toString('base64'));
      default:
        throw new Error(`Algoritmo "${algorithm}" não suportado.`);
    }
  }
  
  /**
   * Verifica a assinatura de um token H.
   */
  function verifySignature(
    headerCodificado,
    payloadCodificado,
    assinatura,
    secret,
    algorithm = 'HS256'
  ) {
    const data = headerCodificado + '.' + payloadCodificado;
    try {
      switch (algorithm) {
        case 'HS256':
          const hmac = crypto.createHmac('SHA256', secret);
          hmac.update(data);
          const expectedSignature = base64urlEncode(hmac.digest('hex'));
          return assinatura === expectedSignature;
        case 'RS256':
          const publicKey = secret;
          return crypto.verify('RSA-SHA256', Buffer.from(data), publicKey, base64urlDecode(assinatura));
        default:
          throw new Error(`Algoritmo "${algorithm}" não suportado.`);
      }
    } catch (error) {
      return false;
    }
  }

/**
 * Codifica um payload em um token H.
 */
function encode(payload, secret, options = {}) {
  const { algorithm = 'HS256', issuer, subject, audience, expiresIn, notBefore } =
    options;

  const header = {
    alg: algorithm,
    typ: 'JWT',
  };

  if (issuer) payload.iss = issuer;
  if (subject) payload.sub = subject;
  if (audience) payload.aud = audience;
  if (expiresIn) payload.exp = Math.floor(Date.now() / 1000) + ms(expiresIn) / 1000; // Use ms
  if (notBefore) payload.nbf = Math.floor(Date.now() / 1000) + ms(notBefore) / 1000; // Use ms

  const headerCodificado = base64urlEncode(JSON.stringify(header));
  const payloadCodificado = base64urlEncode(JSON.stringify(payload));
  const assinatura = sign(headerCodificado, payloadCodificado, secret, algorithm);

  return `${headerCodificado}.${payloadCodificado}.${assinatura}`;
}

/**
 * Decodifica um token H e verifica a assinatura e a expiração.
 */
function decode(token, secret, options = {}) {
  const {
    algorithms = ['HS256'],
    ignoreExpiration = false,
    issuer,
    subject,
    audience,
  } = options;

  const partes = token.split('.');
  if (partes.length !== 3) {
    return null;
  }

  const [headerCodificado, payloadCodificado, assinatura] = partes;

  try {
    const header = JSON.parse(base64urlDecode(headerCodificado));
    if (!algorithms.includes(header.alg)) {
      return null;
    }
  } catch (error) {
    return null;
  }

  if (!verifySignature(headerCodificado, payloadCodificado, assinatura, secret, header.alg)) {
    return null;
  }

  try {
    const payload = JSON.parse(base64urlDecode(payloadCodificado));

    if (issuer && payload.iss !== issuer) {
      return null;
    }
    if (subject && payload.sub !== subject) {
      return null;
    }
    if (audience) {
      const audiences = Array.isArray(audience) ? audience : [audience];
      if (!audiences.includes(payload.aud)) {
        return null;
      }
    }

    if (!ignoreExpiration && payload.exp && Date.now() / 1000 >= payload.exp) {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
}

module.exports = {
  encode,
  decode,
};