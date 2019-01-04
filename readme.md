### node-placa-mercosul

Pacote para validar e converter as placas para o novo formato

## Getting Started

```js
import { validate, convert } from "placa-mercosul";
// ou const placaMercosul = require("placa-mercosul")

const isValid = validate("BR ABC 1C34"); //true

const isValid = validate("BRABC1C34"); //true

const isValid = validate("ABC 1C34"); //true

const isValid = validate("ABC 1234"); //false

const isValid = validate("ABC 1234", true); //true

// NO SAFE convert
// P.S.: essa regra ainda pode mudar para outros tipos de veiculo
// para moto: o 3 numero vira letra
// para carro: o 2 numero vira letra

const placa = convert("ABC 1234"); //BR ABC 1C34

const placa = convert("ABC 1234", {}, "moto"); //BR ABC 12D4

const placa = convert("ABC 1234", { suffix: "PR" }); //PR ABC 1C34

const placa = convert("ABC 1234", { spaceChar: "" }); //PRABC1C34

const placa = convert("ABC 1234", { spaceChar: "_" }); //PR_ABC_1C34

const placa = convert("ABC 1234", { letterIndex: 0 }); //PR_ABC_B234
const placa = convert("ABC 1234", { letterIndex: 1 }); //PR_ABC_1C34
const placa = convert("ABC 1234", { letterIndex: 2 }); //PR_ABC_12D4
const placa = convert("ABC 1234", { letterIndex: 3 }); //PR_ABC_123E

const placa = convert("INVALID!"); // INVALID!

const placa = convert("INVALID!", { throwsInvalid: true }); // will throw Error!!
```

## function **validate**

`validate(placa: string, incluirFormatoAntigo: bool = false)`

- `placa: string`: Placa a ser validada
- `incluirFormatoAntigo: bool`: Se `true` ira confirmar válido formato antigo (ex. ABC1234), senão, se `falso` somente o formato mercosul.

## function **convert**

`convert(placa: string, options: ConvertOptions , tipo: "carro"|"moto" = "carro")`

- `placa: string`: Placa a ser convertida, caso inválida, sera retornada intacta.
- `options: ConvertOptions:`

  - `suffix: string (default: "BR")`: sufixo da placa, geralmente indica o país;
  - `spaceChar: string (default: " ")`: indica o separador dos blocos da placa;
  - `throwsInvalid: bool (default: false)`: se `true` caso não seja possivel converter ele lança um erro, caso contrario somente retorna a entrada sem impacto.

- `tipo: "carro"|"moto" (default: "carro")`: Indica através do tipo do veículo, se

## Problemas ?

Duvidas ou dificuldades, abra uma ISSUE ou contribua com um PR!
