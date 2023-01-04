# Regras para criar Controllers:

Somente em caso das rotas de autenticação que tem os métodos register() e login(),
um controller deve ser obrigatoriamente uma classe com os métodos index, show,
store, update e delete. Respectivamente, estes métodos significam:


index: Listar todos os registros do banco
show: Listar UM registro do banco
store: Criar um novo registro no banco
update: Atualizar um registro no banco
delete: Apagar um registro no banco

Além disso, um controller deve conter SOMENTE a regra de negócios da aplicação, enquanto o repository deve ser a camada cujo receberá os dados do controller e própriamente fará o armazenamento dos dados.

# Como funciona essa arquitetura

A arquitetura deste projeto é baseada em classes, ou seja, POO e um design pattern chamado Singleton, onde a classe deve ser instanciada somente uma vez. Nesse projeto, os controllers cuidam de toda a parte de regra de negócios (tratamentos de dados, regras em gerais) enquanto o repository faz propriamente a inserção dos dados no banco de dados, lembrando que um repository NUNCA deve ter algum tratamento de erro nem nada, ele é SOMENTE para fazer manipulações no banco de dados.

# Como rodar o projeto

1 - Instalar as dependências com o comando yarn
2 - Instalar o "chocolatey" no seu PC, caso for Windows
3 - Atráves, do "chocolatey", instalar uma dependência chamada "make"
4 - Rodar o comando "make up" para automaticamente inicializar o ambiente docker
5 - Após o desenvolvimento, você pode rodar "make down" para desligar o container do docker

Happy coding :)
