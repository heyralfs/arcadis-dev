# Desafio Técnico - Arcadis

Plataforma de cadastro de pontos de coleta e parâmetros, desenvolvida para auxiliar a equipe de Soluções para Áreas Contaminadas no gerenciamento dos dados coletados.

Desenvolvida como requisito técnico do processo seletivo para Analista de Inovação Digital Pleno da [Arcadis](https://www.arcadis.com/pt-br).

## Requisitos

A plataforma deve permitir:

-   [x] cadastro de **pontos de coleta** informando o nome e as coordenadas (x, y);

-   [x] cadastro de **parametros coletados** informando nome e valor do parâmetro, data da coleta e ponto de coleta relacionado;

-   [x] pesquisar pontos de coleta;

-   [x] pesquisar parâmetros

-   [x] listar todos os pontos de coleta e seus respectivos parâmetros vinculados;

-   [x] listar apenas os pontos de coleta com infração à legislação.

A tabela a seguir serve como referência dos limites permitidos para cada parâmetro:

| Parâmetro           |  Unidade  | Limite |
| ------------------- | :-------: | -----: |
| Alumínio dissolvido |   mg/l    |    0.1 |
| Arsênio total       |   mg/l    |   0.01 |
| Chumbo total        |   mg/l    |   0.01 |
| Cobre dissolvido    |   mg/l    |  0.009 |
| Escherichia coli    | NMP/100ml |   1000 |
| Cromo total         |   mg/l    |    005 |
| Cádmio total        |   mg/l    |  0.001 |
| DBO                 |  mg O2/l  |      5 |

## Feito com

Tecnologias envolvidas no desenvolvimento desta aplicação:

### Back-end

-   [NodeJS](https://nodejs.org/en/);
-   [NestJS](https://nestjs.com/);
-   [TypeORM](https://typeorm.io/);
-   [SQLite](https://www.sqlite.org/index.html);
-   [Jest](https://jestjs.io/);
-   [TypeScript](https://www.typescriptlang.org/).

### Front-end

-   [ReactJS](https://reactjs.org/);
-   [Vite](https://vitejs.dev/);
-   [Chakra UI](https://chakra-ui.com/);
-   [Formik](https://formik.org/);
-   [TypeScript](https://www.typescriptlang.org/).

## Como instalar

> 🤚 Antes de continuar... Caso você queira apenas percorrer o código em uma interface mais amigável, tente acessá-lo através [deste link](https://github1s.com/heyralfs/arcadis-dev).

> ❗Para rodar esta aplicação, você deve ter instalado [NodeJS](https://nodejs.org/en/).

Seguindo os passos abaixo, você será capaz de rodar a aplicação localmente:

1. Clone este repositório:

```bash
$ git clone https://github.com/heyralfs/arcadis-dev.git
```

2. Acesse o diretório do projeto:

```bash
$ cd arcadis-dev
```

3. Instale as dependências de `back-end` e `front-end` executando um dos comandos abaixo, a depender do gerenciador de pacotes de sua preferência:

```bash
$ yarn yarn-install-all
# ou
$ npm run npm-install-all
```

4. Navegue até a pasta do back-end do projeto e inicie o back-end da aplicação:

```bash
$ cd ./backend && yarn start:dev
# ou
$ cd ./backend && npm run start:dev
```

5. Abra um novo terminal na pasta do projeto e execute um dos comandos abaixo para iniciar o front-end da aplicação:

```bash
$ cd ./web && yarn start:dev
# ou
$ cd ./web && npm run start:dev
```

A aplicação iniciará na [porta 3000](http://localhost:3000/).

## Como utilizar

Uma vez com a aplicação rodando na [porta 3000](http://localhost:3000/), você poderá seguir os passos abaixo para utilizá-la:

1. Adicionando um **Ponto de Coleta**:

    a. clique sobre o botão no canto inferior direito contento o sinal de adição `+` para exibir as opções de formulário `Ponto de Coleta` e `Parâmetro` e, em seguida, selecione `Ponto de Coleta`;

    b. no formulário exibido, preencha o nome do ponto de coleta que deseja cadastrar, seguido das suas coordenadas X e Y. Clique em `Salvar`;

    c. uma vez cadastrado o Ponto de Coleta, a lista de Pontos será atualizada e o ponto cadastrado será exibido.

    **Obs.:** um único ponto de coleta pode ser cadastrado com o mesmo nome ou coordenadas.

2. Editando um **Ponto de Coleta**:

    a. após cadastrar um ponto de coleta, clicando sobre seu nome na tela principal, serão exibidas abaixo as coordenadas seguidas dos parâmetros cadastrados para este ponto, quando houver;

    b. à frente das coordenadas, um botão de edição é exibido. Clicando sobre ele, o formulário de edição de ponto de coleta é aberto. Basta atualizar as informações e clicar em `Salvar`;

    c. uma vez atualizado o Ponto de Coleta, a lista de Pontos será atualizada e o ponto será exibido com as informações atualizadas.

    **Obs.:** não é permitido atualizar um ponto de coleta utilizando nome e/ou coordenadas que já estão em uso por outro ponto.

3. Adicionando um **Parâmetro**:

    a. clique sobre o botão no canto inferior direito contento o sinal de adição `+` para exibir as opções de formulário `Ponto de Coleta` e `Parâmetro` e, em seguida, selecione `Parâmetro`;

    b. no formulário exibido, informe o ponto de coleta ao qual será vinculado o parâmetro, nome do parâmetro, valor e data da coleta. Clique em `Salvar`;

    c. uma vez cadastrado o Parâmetro, a lista de Pontos de Coleta será atualizada e o parâmetro cadastrado poderá ser exibido. Para isso, basta clicar sobre o nome do Ponto de Coleta vinculado ao parâmetro cadastrado.

    **Obs.:** não é permitido cadastrar um mesmo parâmetro duas vezes com mesmo ponto de coleta vinculado e mesma data de coleta. Ao menos uma destas informações deve ser diferente.

4. Excluindo um **Parâmetro**:

    a. clicando sobre o nome de um ponto de coleta, os parâmetros vinculados a ele, quando houver, serão exibidos. Ao lado do valor de cada parâmetro, um botão para exclusão do parâmetro será exibido.

    b. ao excluir um parâmetro, a lista de pontos de coleta será atualizada, omitindo o parâmetro excluído.

5. Filtrando informações:

    a. **pesquisando por ponto de coleta**: você pode utilizar a barra de pesquisa para filtrar os pontos de coleta cujo nome contenha o termo desejado. Clicando sobre o ícone de filtro, no cant superior direito, um **menu com opções de filtro de informações** será aberto. Neste menu, você pode optar por exibir apenas os pontos de coleta que possuem alguma irregularidade.

    b. **filtrando por parâmetro**: no mesmo **menu com opções de filtro de informações**, você poderá selecionar os parâmetros que deverão estar vinculados a um ponto de coleta para que ele seja exibido. Selecionando, por exemplo, `Parâmetro A` e `Parâmetro B`, apenas os pontos de coleta que possuem coleta de **ambos os parâmetros** serão exibidos.

    **Obs.:** para aplicar os filtros, uma vez selecionados, deve-se clicar no botão `Aplicar`. Para limpar os filtros, basta clicar no botão `Limpar`. O campo de busca por ponto de coleta deve ser apagado manualmente.

## Estrutura de pastas

### Back-end

O back-end está divido em dois módulos: `collect-point` e `parameter`. Na pasta de cada módulo, na raiz, poderão ser encontrados seus respectivos arquivos `module`, `service` e `controller`, conforme sugere documentação do [NestJS](https://nestjs.com).

```
- src/
--- collect-point/
----- __test__/
----- dto/
----- entities/
--- parameter/
----- __test__/
----- dto/
----- entities/
```

Ainda, dentro de cada módulo, há mais três pastas:

-   `__test__/`: contendo os etstes unitários do `controller` e do `service`;

-   `dto/`: contendo as interfaces de transferência de dados (_Data Transfer Object_) entre o cliente (front-end) e o servidor;

-   `entities/`: contém os arquivos das "entidades" (ou "esquemas"), que representam as tabelas do banco de dados.

### Front-end

A estrutura de pastas utilizada no front-end foi baseada [neste guia](https://www.robinwieruch.de/react-folder-structure/).

```
- src/
--- components/
----- feature/
----- shared/
--- constants/
--- contexts/
--- services/
--- theme/
--- types/
```

A pasta `components` concentra os componentes React desenvolvidos para esta aplicação, divididos em duas categorias:

-   `featue/`: componentes não reutilizáveis, separados por "assunto" (como `FormsMenu` ou `CollectionPointList`);

-   `shared/`: componentes reutilizáveis, como compenentes de UI.

As demais pastas se organizam da seguinte maneira:

-   `constants/`: arquivos contendo valores estáticos compartilhados entre vários componentes;

-   `contexts/`: arquivos definindo os `providers` dos [contextos](https://reactjs.org/docs/context.html) da aplicação e `hooks` específicos destes contextos;

-   `services/`: instâncias de serviços de terceiros, como da biblioteca `Axios`, e funções auxiliares;

-   `theme/`: arquivos de estilização global, como tipografia, cores e estilizações de componentes do Chakra UI;

-   `types/`: tipagens reutilizadas por vários componentes.

## Testes

Com as dependências do back-end devidamente instaladas e estando no diretório do back-end, você pode executar os testes unitários dos `controllers` e `services` de cada módulo através de um dos comandos abaixo:

```bash
$ yarn test
# ou
$ npm run test
```

## Autoria

<a href="https://github.com/heyralfs/">
 <img style="border-radius: 50%;" src="https://avatars.githubusercontent.com/u/63465800?v=4" width="100px;" alt=""/>
 <br />
 <sub><b>Ralf Oliveira</b></sub></a>
