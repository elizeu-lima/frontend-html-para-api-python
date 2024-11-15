# Sistema de Cadastro de Pessoas

Este projeto é um sistema simples de cadastro de pessoas, com funcionalidades de **criação**, **edição** e **exclusão** de registros. A interface é feita com **HTML** e **CSS**, e a lógica do sistema é gerida pelo **JavaScript**. A comunicação com o backend é feita via **API RESTful** utilizando o método `fetch`.

## Tecnologias Usadas

- **Frontend:**
  - HTML5
  - CSS3
  - JavaScript ES6+
  
- **Backend:**
  - API RESTful em **Flask** (não inclusa, mas assumida como backend para conexão via API)
  - **MongoDB** como banco de dados

## Funcionalidades

- **Cadastro de Pessoas:** Adiciona novas pessoas ao sistema.
- **Edição de Pessoas:** Atualiza os dados de uma pessoa cadastrada.
- **Exclusão de Pessoas:** Remove uma pessoa do cadastro.
- **Exibição de Lista:** Lista todas as pessoas cadastradas no sistema.

## Estrutura de Arquivos

- `index.html`: Contém a estrutura do HTML para exibir o formulário e a lista de pessoas.
- `style.css`: Responsável pelo estilo visual da página.
- `script.js`: Contém toda a lógica JavaScript para interagir com a API, gerenciar o DOM e controlar os eventos.

## Como Usar

### 1. Clonando o Repositório

Para começar, clone o repositório:

```bash
git clone https://seu-repositorio.git
cd seu-repositorio


### Iniciando a API

A API está assumida como uma aplicação em Flask rodando localmente na porta 5000. Certifique-se de que o servidor backend esteja funcionando para que a aplicação frontend consiga se conectar à API.

Inicie o servidor backend com o comando (assumindo que você já tenha o Python e Flask instalados):

python app.py


#### Abrindo o Sistema

Abra o arquivo index.html no seu navegador para começar a utilizar o sistema. Você pode abrir o arquivo diretamente no navegador ou rodar um servidor local para servir o conteúdo, por exemplo, utilizando o Live Server no Visual Studio Code.

4. Funcionalidades

 * Cadastro de Pessoas
 * Preencha os campos de Nome, Idade e Telefone.
 * Ao submeter o formulário, a pessoa será cadastrada no backend via a API.
 * A lista de pessoas será atualizada automaticamente.
 * Edição de Pessoas
 * Cada pessoa na lista tem um botão Editar.
 * Ao clicar no botão, o sistema preenche os campos de edição com os dados da pessoa.
 * Após editar, os dados são enviados para o backend e atualizados na lista.
 * Exclusão de Pessoas
 * Cada pessoa na lista tem um botão Excluir.
 * Ao clicar no botão, o registro da pessoa é excluído do sistema.
 * 5. Conexão com a API
 * A comunicação com o backend é feita via API RESTful usando os seguintes endpoints:

 * GET /api/pessoas — Obtém todas as pessoas cadastradas.
 * POST /api/pessoas — Cria uma nova pessoa.
 * PUT /api/pessoas/:id — Atualiza os dados de uma pessoa.
 * DELETE /api/pessoas/:id — Exclui uma pessoa.
 * 6. Endpoints da API
 * GET /api/pessoas
 * Retorna todos os registros de pessoas no banco de dados.

 ### Exemplo de resposta:

 [
  {
    "_id": "1",
    "nome": "João Silva",
    "idade": 30,
    "telefone": "123456789"
  },
  {
    "_id": "2",
    "nome": "Maria Oliveira",
    "idade": 25,
    "telefone": "987654321"
  }
]


### Cria uma nova pessoa no banco de dados.

### Exemplo de corpo da requisição:

{
  "nome": "Carlos Pereira",
  "idade": 40,
  "telefone": "1122334455"
}


### Atualiza os dados de uma pessoa existente.

### Exemplo de corpo da requisição:

{
  "idade": 41,
  "telefone": "1198765432"
}


## Detalhes Técnicos
### Estrutura do Código

HTML (index.html)
O HTML define a estrutura básica da página, incluindo um formulário para adicionar pessoas e uma lista dinâmica que exibe as pessoas cadastradas.

<form id="personForm">
    <input type="text" id="nome" placeholder="Nome" required>
    <input type="number" id="idade" placeholder="Idade" required>
    <input type="text" id="telefone" placeholder="Telefone" required>
    <button type="submit">Adicionar Pessoa</button>
</form>

<div id="peopleList"></div>

### CSS (style.css)

O CSS define o estilo visual da página, com regras de layout e responsividade para garantir que o sistema seja amigável em dispositivos móveis.

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f4f4;
}

#peopleList {
    margin-top: 20px;
}

.person {
    background-color: #fff;
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
}

.button-group {
    display: flex;
    gap: 10px;
}


##3 JavaScript (script.js)

O JavaScript gerencia toda a lógica de interação com a API, manipulação do DOM e controle de eventos, como a adição, edição e exclusão de pessoas.

const apiUrl = 'http://localhost:5000/api/pessoas';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personForm');
    const peopleList = document.getElementById('peopleList');

    async function fetchPeople() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayPeople(data);
        } catch (error) {
            console.error('Erro ao buscar pessoas:', error);
        }
    }

    function displayPeople(people) {
        peopleList.innerHTML = '';
        people.forEach(person => {
            const personElement = document.createElement('div');
            personElement.className = 'person';
    
            const personInfo = document.createElement('span');
            personInfo.textContent = `${person.nome} - ${person.idade} anos - ${person.telefone}`;
    
            const buttonGroup = document.createElement('div');
            buttonGroup.className = 'button-group';
    
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editPerson(person._id));
    
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Excluir';
            deleteButton.addEventListener('click', () => deletePerson(person._id));
    
            buttonGroup.appendChild(editButton);
            buttonGroup.appendChild(deleteButton);
    
            personElement.appendChild(personInfo);
            personElement.appendChild(buttonGroup);
            peopleList.appendChild(personElement);
        });
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nome = document.getElementById('nome').value;
        const idade = parseInt(document.getElementById('idade').value);
        const telefone = document.getElementById('telefone').value;

        try {
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, idade, telefone })
            });
            form.reset();
            fetchPeople();
        } catch (error) {
            console.error('Erro ao adicionar pessoa:', error);
        }
    });

    fetchPeople();
});


# Contribuindo
 1- Faça o fork deste repositório.
 2- Crie uma nova branch (git checkout -b feature/nova-feature).
 3- Faça as alterações e commits (git commit -am 'Adiciona nova feature').
 4- Envie para o repositório remoto (git push origin feature/nova-feature).
 5- Abra um Pull Request.

# Licença

Este projeto é licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.


Esse `README.md` fornece uma visão geral completa de como o projeto funciona, como utilizá-lo e os detalhes técnicos sobre a conexão com a API, estrutura do código e funcionalidades. Ele também pode ser adaptado de acordo com mudanças no projeto ou adições de novas funcionalidades.
