# Regras para criar Controllers:

Somente em caso das rotas de autenticação, um controller deve ser obrigatoriamente uma classe com os métodos index, show, store, update e delete. Respectivamente, estes métodos significam:

index: Listar todos os registros do banco
show: Listar UM registro do banco
store: Criar um novo registro no banco
update: Atualizar um registro no banco
delete: Apagar um registro no banco

Além disso, um controller deve conter SOMENTE a regra de negócios da aplicação, enquanto o repository deve ser a camada cujo receberá os dados do controller e própriamente fará o armazenamento dos dados.
