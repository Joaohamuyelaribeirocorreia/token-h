# token-h @1.0.0
 
 ### **token-h**:
Uma biblioteca JavaScript simples para *JSON Web Tokens (jwts)*.
IntroduçãoJSON Web Token *(tkn-H)* é um padrão da indústria para representar reivindicações de forma segura entre duas partes.

Este projeto fornece uma implementação leve do **token-H (jwt)** em **JavaScript**, adequada para fins de aprendizagem e uso em projetos onde uma biblioteca token-H completa pode ser excessiva.

Funcionalidades de Codificação de payload para *JwtDecodificação* de **token-H** e verificação de *assinaturaSuporte* para o algoritmo de assinatura HS256. Opções para emissor, assunto, audiência e tempo de expiração, Tratamento de erros. 
Instalação Para usar esta biblioteca, simplesmente inclua o arquivo **token-H** .js no seu projeto desta forma:

```bash
npm install token-h
```

### COMO USAR:

```js
const { encode, decode } = require('token-h');

const payload = {
  userId: 123,
  nome: 'João da Silva',
  email: 'joao.silva@example.com',
  // Outros dados do utilizador
};

const secret = 'seuSegredoSecreto'; // Mantenha isto em segredo!

const options = {
  algorithm: 'HS256', // Opcional, padrão é HS256
  issuer: 'meuServidor.com', // Opcional
  expiresIn: '1h', // Opcional, pode ser '1h', '30m', '5s', '1d', '3w', '1a' .
};
/**
 * h: equivale a hora
 * m: equivale a minuto
 * s: equivale a segundos
 * d: equivale a dia
 * w: equivale a semana (em inglês)
 * a: equivale a ano
*/

const token = encode(payload, secret, options);
console.log('Token H:', token);

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywibm9tZSI6Ikp...'; // Um token H real
const secret = 'seuSegredoSecreto'; // Deve corresponder ao segredo usado para codificar

const options = {
  algorithms: ['HS256'], // Opcional, padrão é ['HS256']
  ignoreExpiration: false, // Opcional, padrão é false
  issuer: 'meuServidor.com', // Opcional
};

const decodificar_payload = decode(token, secret, options);

if (decodificar_payload) {
  console.log('Payload Decodificado:', decodificar_payload);
  // Verifique se o utilizador existe na sua base de dados, etc.
} else {
  console.error('Token inválido!');
}
```

### API

## encode(payload, secret, options)

Codifica um payload em um token H.
* payload {object} Payload a ser codificado.
* secret {string} Chave secreta para a assinatura. 
* options {object} Opções para a codificação.
* algorithm {string} Algoritmo de assinatura a usar. 

 ## Padrão: 

 * **'HS256'**.issuer {string} Emissor do token.
 * **subject** {string} Assunto do token.
 * **audience** {string | string[]} Audiência do token.
 * **expiresIn** {string | number} Tempo de expiração do token em segundos (por exemplo, '1h', 60 * 60).
 * **notBefore** {string | number} Tempo em que o token se torna válido (por exemplo, '10s', 10).
 * **Retorna**: {string} O token H.


 ## decode(token, secret, options)

 Decodifica um token H e verifica a assinatura e a expiração.
 * **token** {string} O token H a ser decodificado.
 * **secret** {string} A chave secreta para a verificação.
 * **options** {object} Opções para a decodificação.
 * **algorithms** {string[]} Algoritmos de assinatura esperados.
  Padrão: ['HS256'].
  **ignoreExpiration** {boolean} Se a expiração do token deve ser ignorada. Padrão: false.
  **issuer** {string} Emissor esperado do token.
  **subject** {string} Assunto esperado do token.
  **audience** {string | string[]} Audiência esperada do token.
  * Retorna: {object | null} O payload decodificado se o token for válido, caso contrário, null.

  ### Segurança

  A chave secreta é crucial para a segurança. 
  Mantenha-a segura e nunca a exponha.
  Inclua sempre um tempo de expiração (exp) no payload para limitar o tempo que o token é válido.
  Esta biblioteca suporta o algoritmo HMAC SHA256 (HS256).

  # Contribuir

  Contribuições são bem-vindas! 
  Sinta-se à vontade para enviar pull requests ou abrir problemas para relatar bugs ou sugerir novos recursos.

  # METADADOS
  *Este trabalho foi criado em 10/04/2025 as 11🕓46, em Luanda, Angola.*
  Criado por:
  #### **João Hamuyela Ribeiro Correia**

  __From Hamuyela.__

   * token-h - Biblioteca JWT Simplificada
 *
 * Copyright (c) 2025 "Hamuyela.".
 * Todos os direitos reservados.
 *
 * Licenciado sob a Licença MIT
 * https://opensource.org/licenses/MIT

  # LicençaMIT
