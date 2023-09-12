
<h1 align="center">
     Backend - Studio Yoga Mangala
</h1>

##  Sobre

O espaço Yoga Mangala é um studio de Yoga. Dessa forma, a aplicação permite aos alunos verem as informações de seus contratos como aulas disponíveis e data de encerramento, permitindo também fazer checkin nos horários de aula disponíveis, controlando quantidade de aulas restantes e faltas. Para os administradores, é possível, criar usuários, visualizar e editar os contratos de todos os alunos, visualizar os planos disponíveis, criar e editar horários de aulas disponíveis e criar e editar novos contratos.

---
##  Status do Projeto

📥 Em teste 

---

## Concepção do Projeto


A aplicação se organizar em 4 camadas: Controller, Business, Domain e Database. Sendo o Domain a camada principal, abrigando as regras de négocio e as entidades. O projeto se divide em 6 módulos/entidades:
 - Auth/User
 - Plans/Plan
 - Calendar/YogaClass
 - Contracts/Contract
 - Booking/Checkin
 - Firm/Firm


O banco de dados utlizado é o banco não relacional FireStore. 

---

## Documentação


---
## Rodando o Projeto


Para Rodar o projeto, siga as seguintes etapas :

- Baixe os arquivos
- Dentro da pasta, no terminal rode: npm i
- Após finalizar rode: npm run dev

---
