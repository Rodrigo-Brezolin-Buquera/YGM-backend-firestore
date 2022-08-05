
<h1 align="center">
     Backend - Studio Yoga Mangala
</h1>

##  Sobre

O espaço Yoga Mangala é um studio de Yoga. Dessa forma, a aplicação permite aos alunos verem as informações de seus contratos como aulas disponíveis e data de encerranto, permitindo também fazer checkin nos horários de aula disponíveis, controlando quantidade de aulas restantes e faltas. Para os administradores, é possível, visualizar e editar os contratos de todos os alunos, os planos disponíveis, criar e editar horários de aulas disponíveis e criar e editar novos contratos.

---
##  Status do Projeto

📥 Testando 

---

## 💡Concepção do Projeto


A aplicação se organizar em 4 camadas: Presentation, Application, Domain e Infrastructure. Sendo o Domain a camada principal, abrigando as regras de négocio e as entidades. O projeto se divide em 5 módulos/entidades:
 - Auth/User
 - Plans/Plan
 - Calendar/YogaClass
 - Contracts/Contract
 - Booking/Checkin

As relações entre os módulos pode ser vista na imagem:
![image](https://user-images.githubusercontent.com/81428197/183217701-1660e165-1691-430e-9448-1e867ec1eb1b.png)

O banco de dados utlizado é o banco não relacional FireStore. 

---

## Documentação


---

## Usuários


---
## Rodando o Projeto


Para Rodar o projeto, siga as seguintes etapas :

- Baixe os arquivos
- Dentro da pasta, no terminal rode: npm i
- Após finalizar rode: npm run dev

---
