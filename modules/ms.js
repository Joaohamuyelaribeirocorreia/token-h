/**
 * From "Hamuyela.".
 * Converte uma string de tempo em milissegundos.
 * @param {string|number} valor A string de tempo (por exemplo, '1h', '30m', '5s') ou um número representando milissegundos.
 * @returns {number} O valor em milissegundos.
 * @throws {Error} Se a string de tempo for inválida.
 */
function ms(valor) {
  if (typeof valor === 'number') {
    return valor;
  } else if (typeof valor === 'string') {
    const match = valor.toLowerCase().match(/^(\d+)([smhdwa])$/);
    if (!match) {
      throw new Error(`String de tempo inválida: ${valor}`);
    }
    const amount = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case 's':
        return amount * 1000;
      case 'm':
        return amount * 60 * 1000;
      case 'h':
        return amount * 60 * 60 * 1000;
      case 'd':
        return amount * 24 * 60 * 60 * 1000;
      case 'w':
        return amount * 7 * 24 * 60 * 60 * 1000;
      case 'a':
        return amount * 365 * 24 * 60 * 60 * 1000;
      default:
        throw new Error(`Unidade de tempo desconhecida: ${unit}`);
    }
  } else {
    throw new Error('Valor inválido: o valor deve ser uma string ou um número.');
  }
}

module.exports = ms;