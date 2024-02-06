# App

Trowel

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário;
- [x] Deve ser possível o usuário cadastrar sua meta;
- [x] Deve ser possível o usuário atualizar sua meta;
- [x] Deve ser possível o usuário excluir sua meta;
- [x] Deve ser possível o usuário cadastrar objetivos de suas metas;
- [x] Deve ser possível o usuário atualizar objetivos de suas metas;
- [x] Deve ser possível o usuário excluir objetivos de suas metas;
- [x] Deve ser possível o usuário obter suas metas e objetivos conjuntos;
- [x] Deve ser possível o usuário concluir seu objetivo;
- [x] Deve ser possível o usuário concluir sua meta;

## RNs (Regras de negócios)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode alterar a finalização uma vez feita;
- [x] O usuário não pode alterar a conclusão uma vez feita;
- [x] O usuário pode adicionar apenas um orçamento por meta;
- [x] O usuário pode adicionar apenas um gasto por objetivo;
- [x] O usuário pode adicionar apenas uma imagem por meta;
- [x] O usuário pode adicionar apenas uma imagem por objetivo;
- [x] O usuário pode adicionar apenas um link de referência por objetivo;

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);
