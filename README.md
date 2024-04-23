
# HtmlComponentsDevType
O HTMLComponentsDevType é uma biblioteca leve que oferece componentes reutilizáveis para aprimorar sua interface de usuário

## Instalaçao

Instale via npm

```bash
  npm install htmlcomponentsdevtype
```

## Adicionar no código html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="./node_modules/htmlcomponentsdevtype/css/style.css">
  </head>
  <body>
    <input type="search" class="mask cpf">
    <script type="module" type="text/javascript" src="./node_modules/htmlcomponentsdevtype/js/mask.js"></script>
  </body>
</html>
```




## Mascaras disponiveis
+ cpf
    - 999.999.999-99
+ cell
    - (99)9 9999-9999
+ date
    - 99/99/9999
+ cep
    - 99999-999
+ cnpj
    - 99.999.999/9999-99
+ datetime
    - 99/99/9999 99:99
+ time
    - 99:99
+ card
    - 9999 9999 9999 9999
+ expiration
    - 99/99
+ agency
    - 9999
+ account
    - 99999 9
+ custom
    - <input type="search" class="mask custom-[99-99-9999]">
## Exemplo de uso

```html
<input type="search" class="mask <tipo de mascara>">
```


