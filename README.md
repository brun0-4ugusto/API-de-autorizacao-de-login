# API-de-autorização-de-login

API complementar da API de Filmes <https://github.com/brun0-4ugusto/API-de-Filmes>, implementa a estratégia de login para a api de filmes. A partir do e-mail e senha é devolvido um token JWT para utilização na API de Filmes.

## Como testar:

-   Requisítos:
    -   NodeJS (utilizei a versão 16.15.1)
    -   Mysql 8.0.29
    -   NPM 8.13.0
    -   NodeCache
-   Passo a Passo:
    -   Clone o repositório
    -   Baixe todas as dependências
    -   Dê um **npm start** (essa api está configurada para a porta 4000)
    
_Essa API depende do banco de dados gerado na API de Filmes_

## Endpoints da API:

### Login

## Request

`POST /usuario/login`

```
curl --location --request POST 'http://localhost:4000/usuario/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "admin@admin.com",
    "senha": "41512531"
}'
```

### Response

```
authorization: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY1NjYzODkwNSwiZXhwIjoxNjU2NjQwNzA1fQ.DTaNE6sSJmlngyvacsUg6QiEUa0vm33YvoNj22eOTo4
 connection: keep-alive
 date: Fri,01 Jul 2022 00:04:04 GMT
 keep-alive: timeout=5
 x-powered-by: Express
```

** Os tokens do header authorization são enviados para a API filmes, eles expiram a cada 30 minutos**

## Cache tentativa de Login

Após 3 tentativas de login fracassadas, o e-mail que está sendo acessado fica impossibilitado de receber requests de login por 30 segundos.
