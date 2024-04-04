let participantes = [
  {
    nome: "Débora Serradilha",
    email: "debora@gmail.com",
    dataInscricao: new Date(2023, 8, 3, 19, 20),
    dataCheckIn: new Date(2023, 8, 5, 20, 20),
  },
  {
    nome: "Rodrigo Fantibon",
    email: "rodrigo@gmail.com",
    dataInscricao: new Date(2023, 9, 20, 16, 20),
    dataCheckIn: new Date(2023, 9, 20 ,19, 00),
  },
  {
    nome: "Ana Silva",
    email: "ana@gmail.com",
    dataInscricao: new Date(2023, 6, 3, 10, 30),
    dataCheckIn: new Date(2023, 6, 4, 0),
  },
  {
    nome: "Carlos Souza",
    email: "carlos@gmail.com",
    dataInscricao: new Date(2024, 0, 10, 8, 45),
    dataCheckIn: new Date(2024, 0, 20, 0),
  },
  {
    nome: "Juliana Mendes",
    email: "juliana@gmail.com",
    dataInscricao: new Date(2023, 5, 1, 14, 10),
    dataCheckIn: new Date(2023, 5, 3, 0),
  },
  {
    nome: "Marcos Oliveira",
    email: "marcos@gmail.com",
    dataInscricao: new Date(2024, 2, 3, 11, 0),
    dataCheckIn: null
  },
  {
    nome: "Fernanda Santos",
    email: "fernanda@gmail.com",
    dataInscricao: new Date(2024, 2, 18, 13, 45),
    dataCheckIn: new Date(2024, 2, 1, 0),
  },
  {
    nome: "Paulo Lima",
    email: "paulo@gmail.com",
    dataInscricao: new Date(2024, 1, 2, 17, 30),
    dataCheckIn: new Date(2024, 1, 2, 0),
  },
  {
    nome: "Amanda Costa",
    email: "amanda@gmail.com",
    dataInscricao: new Date(2023, 10, 7, 9, 20),
    dataCheckIn: new Date(2023, 11, 1, 0),
  },
  {
    nome: "Lucas Almeida",
    email: "lucas@gmail.com",
    dataInscricao: new Date(2023, 8, 30, 20, 15),
    dataCheckIn: null
  }
];


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

//condicional
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
    <button
      data-email="${participante.email}"
      onclick="fazerCheckIn(event)"
    >
      Confirmar check-in
      </button>
    `  
  }

  
  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
        <small>
          ${participante.email}
        </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarlista = (participante) => {
 let output = ""
 //estrutura de repetição - loop
 for(let participante of participantes){
   output = output + criarNovoParticipante(participante)
 }

 //substituir informação do HTML
 document
 .querySelector('tbody')
 .innerHTML = output //selector(selecionar a tag que quer)
}

atualizarlista(participantes)

const adicionarParticipante = (event) => { 
  event.preventDefault() //não faça o padrão (nao envie o formulario)

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null //nao existe
  }

  // verificar se o participante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if (participanteExiste){
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes] 
  atualizarlista(participantes)

  //limpar o formulario
  event.target.querySelector('[name="nome"]').value = " "
  event.target.querySelector('[name="email"]').value = " "
}

const fazerCheckIn = (event) => {
  //confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

  if(confirm(mensagemConfirmacao) == false) {
    return
  }
  

    //encontrar o participante dentro da lista
    const participante = participantes.find(
      (p) => p.email == event.target.dataset.email
    )

  //atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  //atualizar a lista de participantes
  atualizarlista(participantes)
}