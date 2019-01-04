import test from "ava";
import { validate } from ".."; // "placa-mercosul";

test("Validação deve ser verdadeira para placa do mercosul", t => {
  const isValid = validate("NPF0D45");

  t.is(isValid, true);
});

test("Validação deve ser verdadeira para placa do mercosul, com espaços", t => {
  const isValid = validate("NPF 0D45");

  t.is(isValid, true);
});

test("Validação deve ser verdadeira para placa do mercosul, com prefixo do país", t => {
  const isValid = validate("BRNPF0D45");

  t.is(isValid, true);
});

test("Validação deve ser verdadeira para placa do mercosul, com prefixo do país e espaços", t => {
  const isValid = validate("BR NPF 0D45");

  t.is(isValid, true);
});

test("Validação deve ser falso para placa antiga", t => {
  const isValid = validate("NPF 0345");

  t.is(isValid, false);
});

test("Validação deve ser verdadeira para placa antiga quando informado via parametro", t => {
  const isValid = validate("NPF 0345", true);

  t.is(isValid, true);
});

test("Validação deve ser falsa pra undefined", t => {
  const isValid = validate();

  t.is(isValid, false);
});

test("Validação deve ser falsa pra null", t => {
  const isValid = validate(null);

  t.is(isValid, false);
});

test("Validação deve ser falsa pra vazio", t => {
  const isValid = validate("");

  t.is(isValid, false);
});
