/** Returns regex to validate on "placa velha" format */
const PLACA_VELHA_REGEX = () => /[a-z]{3}[ -]*?([0-9]{4})/gi;

/** Returns regex to validate on "placa nova" format */
const PLACA_NOVA_REGEX = () => /([a-z]{2})? *?[a-z]{3} *?(([0-9][a-z][0-9]{2})|([0-9]{2}[a-z][0-9]))/gi;

/** Returns regex to extract parts of placa */
const EXTRACT_PLACA_REGEX = () => /([a-z]{3})[ -]*?([0-9]{4})/gi;

const DEFAULT_OPTIONS = {
  suffix: "BR",
  spaceChar: " ",
  throwsInvalid: false
};

/**
 *  Valida o formato de uma placa
 *
 *  @example
 *      const isValid = validate("BR ABC 1C34");
 *
 *  @param placa {string} Placa a ser validada
 *  @param incluirFormatoAntigo {bool} Se true ira confirmar válido formato antigo (ex. ABC1234), senão, se falso somente o formato mercosul.
 *  @returns {bool}
 */
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

/**
 *  Converte uma placa (no formato velho) para o formato mercosul
 *
 *  @example
 *      const placa = convert("ABC 1234", { suffix: "PR" }, "carro");
 *
 *  @param placa {string} Placa a ser convertida, caso inválida, sera retornada intacta.
 *  @param options {object} Opções de conversão
 *  @param tipo {"carro"|"moto"} Indica o tipo do veiculo
 *  @returns {string}
 *
 */
exports.convert = function convert(placa, options = DEFAULT_OPTIONS, tipo = "carro") {
  if (typeof placa !== "string") {
    return null;
  }

  const _options = Object.assign({}, DEFAULT_OPTIONS, { letterIndex: tipo == "carro" ? 1 : 2 }, options);

  const { suffix, spaceChar, letterIndex, throwsInvalid } = _options;
  const matched = EXTRACT_PLACA_REGEX().exec(placa);

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
