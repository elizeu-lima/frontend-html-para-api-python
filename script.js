// script.js

const apiUrl = 'http://localhost:5000/api/pessoas'; // URL da API

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('personForm');
    const peopleList = document.getElementById('peopleList');

    // Função para listar as pessoas
    async function fetchPeople() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayPeople(data);
        } catch (error) {
            console.error('Erro ao buscar pessoas:', error);
        }
    }

    // Função para exibir a lista de pessoas
    function displayPeople(people) {
        peopleList.innerHTML = '';
        people.forEach(person => {
            const personElement = document.createElement('div');
            personElement.className = 'person';
            personElement.innerHTML = `
                <span>${person.nome} - ${person.idade} anos - ${person.telefone}</span>
                <div class="button-group">
                    <button class="edit-button" onclick="editPerson('${person.nome}')">Editar</button>
                    <button class="delete-button" onclick="deletePerson('${person.nome}')">Excluir</button>
                </div>
            `;
            peopleList.appendChild(personElement);
        });
    }
    

    // Função para adicionar uma pessoa
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

    
    // Função para excluir uma pessoa
window.deletePerson = async function(nome) {
    try {
        await fetch(`${apiUrl}/${nome}`, {
            method: 'DELETE'
        });
        fetchPeople();
    } catch (error) {
        console.error('Erro ao excluir pessoa:', error);
    }
};

// Função para editar uma pessoa
window.editPerson = async function(nome) {
    const newAge = prompt('Digite a nova idade:');
    const newPhone = prompt('Digite o novo telefone:');
    
    if (newAge && newPhone) {
        try {
            await fetch(`${apiUrl}/${nome}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idade: parseInt(newAge), telefone: newPhone })
            });
            fetchPeople();
        } catch (error) {
            console.error('Erro ao atualizar pessoa:', error);
        }
    }
};


    // Função para editar uma pessoa
    async function editPerson(nome) {
        const newAge = prompt('Digite a nova idade:');
        const newPhone = prompt('Digite o novo telefone:');
        
        if (newAge && newPhone) {
            try {
                await fetch(`${apiUrl}/${nome}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idade: parseInt(newAge), telefone: newPhone })
                });
                fetchPeople();
            } catch (error) {
                console.error('Erro ao atualizar pessoa:', error);
            }
        }
    }

    // Carregar a lista de pessoas ao iniciar
    fetchPeople();
});
