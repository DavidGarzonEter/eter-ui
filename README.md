# EterUi

- para instalar EterUi se debe integrar en el proyecto un tema de angular material para que funcione correctamente 

- por la actualizacion de angular 9 se debe incluir en el tsconfig.json 

```js
 "angularCompilerOptions": {
    "enableIvy": false,
    "fullTemplateTypeCheck": true,
    "strictInjectionParameters": true,
    "sctrictMetadataEmit":true
  }
```