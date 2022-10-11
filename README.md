# AluguelDeCarros
Uma aplicação de exemplo da trilha de nodeJs do ignite

# Configuração ESLint
Configuração do ESLint está no arquivo _ConfiguracaoEsLint.md_ na raiz do projeto, modelo do AIRBNB

# Iniciando o servidor
Adicionar o script abaixo no no _package.json_
*ts-node-dev* : Ela vai auxiliar a rodar o serviço em desenvolvimento (só para desenvolvimento)
*--transpile-only* : Para subir a aplicação mais rápido e não vai dá erro de sitaxe, deixar para fazer isso em produção
*--ignore-watch node_modules* : Não ficar verificando as mudanças na pasta de módulo do node
*--respawn* : Vai ficar dando reload na aplicação tida vez que atualizarmos o código

```json 
  scripts": {
    "dev" : "ts-node-dev --transpile-only --ignore-watch node_modules --respawn src/server.ts"
  }
```
# Configuração no TypeScript
Desabilitando (comentando a linha _"strict": true_) o strict do Typescript para gerenciar a checagem de erros, dexair o strict desabilitado parea o typescript gerenciar esses erros

Se for executar aaplicação  no WSL2 adicionar a configuração ** no script de execução.
Como por exemplo:

```
"scripts": {
    "start": "CHOKIDAR_USEPOLLING=true react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

# Matando processos

```shelscript 
  fuser -k 3333/tcp
```

# Docker
Subir a aplicação com docker compose
```
  docker-compose up
```

PARAR a aplicação com docker compose
```
  docker-compose stop
```

RESTARTAR a aplicação com docker compose
```
  docker-compose start
```

PARAR DELETANDO os container
```
  docker-compose down
```

Verificar os logs em um containre
```
  docker logs <NOME DO CONTAINER> -f
```

# ORM

Usando o ORM *TypeORM* (https://typeorm.io/)
Criar a migration
```
  yarn typeorm migration:create <NOME DA MIGRATION>
```

Depois de configurada, vamos executar todas as migrations pendentes
```
  yarn typeorm migration:run
```

Desfazer as alterações
```
  yarn typeorm migration:revert
```