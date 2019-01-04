const PLACA_VELHA_REGEX = () => /[a-z]{3}[ -]*?([0-9]{4})/gi;
const PLACA_NOVA_REGEX = () => /([a-z]{2})? *?[a-z]{3} *?(([0-9][a-z][0-9]{2})|([0-9]{2}[a-z][0-9]))/gi;
const QUEBRAR_PLACA_VELHA_REGEX = () => /([a-z]{3})[ -]*?([0-9]{4})/gi;
const DEFAULT_OPTIONS = {
  suffix: "BR",
  spaceChar: " ",
  throwsInvalid: false
};

exports.validate = function validate(placa, incluirFormatoAntigo = false) {
  if (!placa || typeof placa !== "string") {
    return false;
  }

  const valido = PLACA_NOVA_REGEX().test(placa);

  if (!valido && incluirFormatoAntigo) {
    return PLACA_VELHA_REGEX().test(placa);
  }

  return valido;
};

exports.convert = function convert(placa, options = DEFAULT_OPTIONS, tipo = "carro") {
  if (typeof placa !== "string") {
    return null;
  }

  const _options = Object.assign({}, DEFAULT_OPTIONS, { letterIndex: tipo == "carro" ? 1 : 2 }, options);

  const { suffix, spaceChar, letterIndex, throwsInvalid } = _options;
  const matched = QUEBRAR_PLACA_VELHA_REGEX().exec(placa);

  if (!matched) {
    if (throwsInvalid) {
      throw new Error("Placa inválida");
    }
    return placa;
  }

  const [, letters, numeric] = matched;

  const numericWithLetter = replaceChar(numeric, letterIndex);

  const partes = `${suffix}${spaceChar}${letters}${spaceChar}${numericWithLetter}`;

  return partes;
};

function replaceChar(numeric, index) {
  const chars = numeric.split("");
  const number = chars[index];

  const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  chars[index] = letters[number] || number;
  return chars.join("");
}
