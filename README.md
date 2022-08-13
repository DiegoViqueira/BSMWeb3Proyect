# BSMWeb3Proyect
Web3 Proyect Postgrado BSM 

El proyecto esta basado en el objetivo de Certificacion de Documentos en la Blochchain de Ethereum.
Ver apartado de docuementacion para mas informacion.

## Documentacion 

[Analisis Funcional](https://github.com/DiegoViqueira/BSMWeb3Proyect/blob/main/doc/Analisis%20funcional.docx)

## Pre Requisitos 

- Node  v16.15.0 LTS ( https://nodejs.org/en/ ) 
- Ganache ( https://trufflesuite.com/ganache/ ), descargado y en ejecucion.

##  Pasos para contruir en Windows [Development Environment] 

- Instalar dependencias
```bash
  npm install 
```

- Desplegar los SC
```bash
  truffle deploy --network development
```


- Reeplazar el SC Adress en las variables de entorno
```typescript
  export const environment = {
  contractAddress: '0x30966600F09685F2dE53EA49F909B0e5D3752227',
  };
```

- Construir y ejecutar 
```bash
  ionic serve
```

## RUN TEST (Smarts Contracts - with Mocha)

```bash
  npm test
```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Control de Cambios

[CHANGELOG](https://github.com/DiegoViqueira/BSMWeb3Proyect/blob/main/CHANGELOG.md)

## License
[MIT](https://choosealicense.com/licenses/mit/)
