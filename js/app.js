const resp = document.getElementById("tarefas") 

const localStoragekey = "list" // nome da chave no localStorage


// Evento quando clica no botão "+"
inAdicionar.addEventListener("click", (e) => {
e.preventDefault()

  const dados = inTarefa.value // obtém os dados do campo input de digitar tarefa
  
  // Verifica se o campo foi preenchido, se está incluido tarefa repetida 
  if(!dados){
    alert("Favor adicionar uma Tarefa")
    inTarefa.focus()
    return
  }else if(validateNewTask()){
    alert("Já existe uma tarefa com essa descrição")
  }
  else{
    //Salvando dados no localStorage
    let values = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    values.push({
      name: inTarefa.value
    })
    localStorage.setItem(localStoragekey,JSON.stringify(values))
    showValues()
  }

  inTarefa.value = ""
  
})
// Função para verificar se a tarefa já foi adicionada anteriormente
function validateNewTask() {
  let values  = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
  let informacoes  = inTarefa.value
  let exists  =  values.find(x  => x.name == informacoes)
  return !exists ? false : true
}

//Função para mostrar na tela a tarefa que o usúario adicionou
function showValues() {
  let values     = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
  let list       = document.getElementById('to-do-list')
  list.innerHTML = ''
  for(let i = 0 ; i < values.length; i++){
    list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
  </svg></button></li>`
  }
}

//função para remover a tarefa quando o usuário clicar no botão ao lado da tarefa
function removeItem(data) {
  let values  = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
  let index   = values.findIndex(x => x.name == data) // obtém a posição da tarefa informada no localStorage
  values.splice(index,1) // remove a tarefa
  localStorage.setItem(localStoragekey,JSON.stringify(values))
  showValues()
}

showValues()

