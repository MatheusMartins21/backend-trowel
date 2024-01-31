# App

Trowel

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário;
- [ ] Deve ser possível o usuário cadastrar uma meta;
- [ ] Deve ser possível o usuário excluir uma meta;
- [ ] Deve ser possível o usuário obter suas metas;
- [ ] Deve ser possível o usuário cadastrar objetivos de suas metas;
- [ ] Deve ser possível o usuário excluir objetivos de suas metas;
- [ ] Deve ser possível o usuário obter os objetivos de suas metas;
- [ ] Deve ser possível o usuário concluir um objetivo;
- [ ] Deve ser possível o usuário visualizar seu percentual de conclusão da meta;
- [ ] Deve ser possível o usuário visualizar o extrato da meta;

## RNs (Regras de negócios)

- [ ] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [ ] O usuário não pode concluir 2 vezes um objetivo;
- [ ] O usuário não pode finalizar 2 vezes sua meta;
- [ ] O usuário pode adicionar apenas um orçamento por meta;
- [ ] O usuário pode adicionar apenas um gasto por objetivo;
- [ ] O usuário pode adicionar apenas uma imagem por meta;
- [ ] O usuário pode adicionar apenas uma imagem por objetivo;
- [ ] O usuário pode adicionar apenas um link de referência por objetivo;

## RNFs (Requisitos não-funcionais)

- [ ] A senha do usuário precisa estar criptografada;
- [ ] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [ ] A lista de metas precisam ser paginadas em 4;
- [ ] A lista de objetivos precisam ser paginadas em 10;
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token);
