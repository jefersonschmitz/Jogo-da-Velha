const boardRegions = document.querySelectorAll('#gameBoard span') //Pegar todos os spans da section
let vBoard = [] //Onde vai ficar os valores selecionados
let turnPlayer = '' //vez de cada jogador
let scoreX = 0
let scoreO = 0

function updateTitle() {
  const playerInput = document.getElementById(turnPlayer)
  document.getElementById('turnPlayer').innerText = playerInput.value
}

function initializeGame() {
  vBoard = [['', '', ''], ['', '', ''], ['', '', '']] //para mostrar no console como esta o tabuleiro
  turnPlayer = 'player1' //Jogo começa com o player1
  document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>' //Para após reiniciar o jogo ele voltar para o texto inicial
  updateTitle()
  boardRegions.forEach(function (element) { //Tira qualquer evento de vitoria ao reininciar o jogo
    element.classList.remove('win')

    element.innerText = '' //Tira qualquer valor do jogo da velha
    element.classList.add('cursor-pointer')
    element.addEventListener('click', handleBoardClick)
    document.getElementById('nameX').innerText = document.getElementById('player1').value || 'Jogador X'
    document.getElementById('nameO').innerText = document.getElementById('player2').value || 'Jogador O'
  })
}

function getWinRegions() { // formatos de vitória em linhas, colunas ou inclinadas
  const winRegions = []
  if (vBoard[0][0] /* Esse primeiro valor é para ver se ele "EXISTE", se foi marcado*/ && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
    winRegions.push("0.0", "0.1", "0.2")
  if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
    winRegions.push("1.0", "1.1", "1.2")
  if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
    winRegions.push("2.0", "2.1", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
    winRegions.push("0.0", "1.0", "2.0")
  if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
    winRegions.push("0.1", "1.1", "2.1")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
    winRegions.push("0.2", "1.2", "2.2")
  if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
    winRegions.push("0.0", "1.1", "2.2")
  if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
    winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

function disableRegion(element) {
  element.classList.remove('cursor-pointer')
  element.removeEventListener('click', handleBoardClick)
}
function disableAllRegions() {
  boardRegions.forEach(function (element) {
    element.classList.remove('cursor-pointer')
    element.removeEventListener('click', handleBoardClick)
    
  })
}


function handleWin(regions) {
  regions.forEach(function (region) {
    document.querySelector('[data-region="' + region + '"]').classList.add('win') //para pegar a área que ganhou e pintar ela de verde pelo css
  })
  const playerName = document.getElementById(turnPlayer).value
  document.querySelector('h2').innerHTML = playerName + ' venceu!'

  if (turnPlayer === 'player1') {
    scoreX++
    document.getElementById('scoreX').innerText = scoreX
  } else {
    scoreO++
    document.getElementById('scoreO').innerText = scoreO
  }
  disableAllRegions()
}


function handleBoardClick(ev) {
  const span = ev.currentTarget
  const region = span.dataset.region //Para pegar cada data criada no HTML 0.0 e 0.1 por exemplo
  const rowColumPair = region.split('.') // Transforma o numero do data de 0.0 que esta como string para Array
  //Antes era 0.0 0.1 e agora fica ["0" "0"]... assim podendo pegar os dois numeros antes e depois do ponto
  const row = rowColumPair[0] //Linha fica na posição 0 do valor do DATA 0.0 por exemplo
  const column = rowColumPair[1]// Coluna fica na posição 1 do valor do DATA 0.0 por exemplo
  if (turnPlayer === "player1") {
    span.innerText = "X"
    vBoard[row][column] = 'X'
  } else {
    span.innerText = "O"
    vBoard[row][column] = "O"
  }
  console.clear() //Limpa o console
  console.table(vBoard) // Mostra no console exatamente a área da jogada selecionada 
  disableRegion(span)

  const winRegions = getWinRegions()
  if (winRegions.length > 0) /*se tem alguma coisa dentro da winRegions*/ {
    handleWin(winRegions)
  } else if (vBoard.flat().includes('')) {// FLAT=Todos os arrays vazios do vBoard irão virar um array só.
    // Includes verifica se tem algum espaço vazio no jogo
  /*IF INLINE= player1 nao ganha, passa para o player 2, se não volta para o player1*/  turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1' //Faz a ordem dos jogadores que irão jogar
    updateTitle()
  }
  else {
    document.querySelector('h2').innerHTML = "Empate!"
  }

}
document.getElementById('start').addEventListener('click', initializeGame)