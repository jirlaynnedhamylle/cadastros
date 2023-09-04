// Pega os elementos do DOM/HTML
const nomeInput = document.getElementById('nome');
const telefoneInput = document.getElementById('telefone');
const emailInput = document.getElementById('email');
const adicionarContatoButton = document.getElementById('adicionarContato');
const pesquisarInput = document.getElementById('pesquisar');
const listaContatos = document.getElementById('listaContatos');
const formularioAdicionar = document.getElementById('formulario-adicionar');
const notification = document.getElementById('notification'); // Elemento de notificação


// Lista de contatos fictícios
const contatosFicticios = [
  {
    nome: 'João',
    telefone: '123456789',
    email: 'joao@example.com',
  },
  {
    nome: 'Maria',
    telefone: '987654321',
    email: 'maria@example.com',
  },
  {
    nome: 'Carlos',
    telefone: '555555555',
    email: 'carlos@example.com',
  },
  {
    nome: 'Ana',
    telefone: '444444444',
    email: 'ana@example.com',
  },
  {
    nome: 'Pedro',
    telefone: '777777777',
    email: 'pedro@example.com',
  },
  {
    nome: 'Lucia',
    telefone: '999999999',
    email: 'lucia@example.com',
  },
];

// Inicializa a lista de contatos com os contatos fictícios aparecendo na tela
const contatos = [...contatosFicticios];

// Função para mostrar a notificação
function showNotification() {
  const section = document.getElementById("section");
  notification.style.display = 'block';
  section.classList.add('active'); // Adicionar a classe 'active' à seção

  setTimeout(() => {
      notification.style.display = 'none';
      section.classList.remove('active'); // Remover a classe 'active' da seção após a notificação desaparecer
  }, 2000); // A notificação desaparecerá após 2 segundos (2000 milissegundos)
}


// Evento de clique no botão "Adicionar Contato"
adicionarContatoButton.addEventListener('click', () => {
  const nome = nomeInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const email = emailInput.value.trim();

  // Verifica se todos os campos estão preenchidos
  if (!nome || !telefone || !email) {
    alert('Preencha todos os campos.');
    return;
  }

  const contato = { nome, telefone, email };

  if (indiceContatoEditando !== -1) {
    contatos[indiceContatoEditando] = contato;
    limparCampos();
    atualizarBotaoAdicionar('Adicionar Contato');
    indiceContatoEditando = -1;
  } else {
    contatos.push(contato);
    showNotification(); // Mostrar notificação quando um novo contato é adicionado
  }

  atualizarListaContatos();
  limparCampos();
});

// Criar um novo contato 
function criarElementoContato(contato) {
  const li = document.createElement('li');
  li.innerHTML = `
    <div>
      <span>Nome: ${contato.nome}</span>
      <span>Telefone: ${contato.telefone}</span>
      <span>E-mail: ${contato.email}</span>
    </div>
    <span>
    <button class="edit-button" data-nome="${contato.nome}">Editar</button>
    <button class="delete-button" data-nome="${contato.nome}">Excluir</button>
    </span>
  `;

  li.querySelector('.delete-button').addEventListener('click', () => excluirContato(contato.nome));
  li.querySelector('.edit-button').addEventListener('click', () => editarContato(contato.nome));

  return li;
}


// Atualiza a lista de contato 
function atualizarListaContatos() {
  listaContatos.innerHTML = '';
  const termoPesquisa = pesquisarInput.value.toLowerCase();

  for (const contato of contatos) {
    if (contato.nome.toLowerCase().includes(termoPesquisa)) {
      listaContatos.appendChild(criarElementoContato(contato));
    }
  }
}

//Limpa os campos preenchidos no formularios  
function limparCampos() {
  nomeInput.value = '';
  telefoneInput.value = '';
  emailInput.value = '';
}

// Permite editar o contato já cadastrado 
function editarContato(nome) {
  const indice = contatos.findIndex(c => c.nome === nome);
  if (indice !== -1) {
    const contato = contatos[indice];
    nomeInput.value = contato.nome;
    telefoneInput.value = contato.telefone;
    emailInput.value = contato.email;
    atualizarBotaoAdicionar('Salvar Edições');
    indiceContatoEditando = indice;
    formularioAdicionar.classList.add('active');
    adicionarNovoContato.textContent = 'Não desejo editar o contato';
    adicionarNovoContato.classList.add('red');
    adicionarNovoContato.addEventListener('click', limparCamposInputs);
  }
}

//Limpa os campos do formulario ao tentar editar um contato 
function limparCamposInputs() {
  nomeInput.value = '';
  telefoneInput.value = '';
  emailInput.value = '';
}

// Exclui contato 
function excluirContato(nome) {
  const indice = contatos.findIndex(c => c.nome === nome);
  if (indice !== -1) {
    contatos.splice(indice, 1);
    atualizarListaContatos();
  }
}

// Função para abrir o formulario de adicionar contato 
function atualizarBotaoAdicionar(texto) {
  adicionarContatoButton.textContent = texto;
}

let indiceContatoEditando = -1;

pesquisarInput.addEventListener('input', atualizarListaContatos);

atualizarListaContatos();

document.addEventListener("DOMContentLoaded", function() {
  const adicionarNovoContatoButton = document.getElementById("adicionarNovoContato");

  adicionarNovoContatoButton.addEventListener("click", function() {
    formularioAdicionar.classList.toggle("active");

    if (formularioAdicionar.classList.contains("active")) {
      adicionarNovoContatoButton.textContent = "Não desejo adicionar um novo contato";
      adicionarNovoContatoButton.classList.add("red");
    } else {
      adicionarNovoContatoButton.textContent = "Adicionar novo contato";
      adicionarNovoContatoButton.classList.remove("red");
    }
  });
});



