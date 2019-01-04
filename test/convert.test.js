import test from "ava";
import { convert } from ".."; // "placa-mercosul";

test("Deve converter placa no formato antigo para novo", t => {
  const novaPlaca = convert("NPF0345");

  t.is(novaPlaca, "BR NPF 0D45");
});

test("Deve converter placa no usando configuração de spaceChars", t => {
  const novaPlaca = convert("NPF0345", { spaceChar: "" });

  t.is(novaPlaca, "BRNPF0D45");
});

test("Deve converter placa no usando configuração de suffix", t => {
  const novaPlaca = convert("NPF0345", { suffix: "AR" });

  t.is(novaPlaca, "AR NPF 0D45");
});

test("Deve converter placa no usando configuração de letterIndex", t => {
  const novaPlaca = convert("NPF0345", { letterIndex: 0 });

  t.is(novaPlaca, "BR NPF A345");
});

test("Deve converter placa no usando parametro de moto", t => {
  const novaPlaca = convert("NPF0345", {}, "moto");

  t.is(novaPlaca, "BR NPF 03E5");
});

test("Deve manter placa informada, case não bata com valor", t => {
  const novaPlaca = convert("PLACA INVALIDA");

  t.is(novaPlaca, "PLACA INVALIDA");
});

test("Deve retornar null caso não seja uma string", t => {
  const novaPlaca = convert(55);

  t.is(novaPlaca, null);
});
