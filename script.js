var jogadorAtual = "X";
var pontuacaoX = 0;
var pontuacaoO = 0;
// Criar tabela 3x3
const tabela = document.getElementById('tabelaJogo');
for (let i = 0; i < 3; i++) {
    const tr = document.createElement('tr');
    for (let j = 0; j < 3; j++) {
        const td = document.createElement('td');
        td.addEventListener('click', function() {
            clicar(this);
        });
        tr.appendChild(td);
    }
    tabela.appendChild(tr);
}

function clicar(td) {
    verificaVazio(td)
    setTimeout(() => {
        if(verificarVencedor(jogadorAtual)){ //verifica se a um vencendor a cada jogada
            atualizarPlacar()
            if(pontuacaoX == 3 || pontuacaoO == 3){
                alert("O jogador " + jogadorAtual + " venceu o jogo!")
                setTimeout(reiniciarJogo, 500);
            }else{
                alert("O jogador " + jogadorAtual + " venceu o round!")
                setTimeout(reiniciarRound, 500);
            }
        }
        else if(verificaEmpate()){// Verifica se houve empate
            alert("Empate!")
            setTimeout(reiniciarRound, 500);
        }
        else{
            trocaJogador(); // troca para o próximo jogador
        } 
    }, 200); // intervalo de 200 ms para verificar vencedor e empate
}

function verificaVazio(td){
    const backgroundImage = window.getComputedStyle(td).backgroundImage; //retorna se a td possui uma imagem de background
    if(backgroundImage !== "none"){
        alert("Essa posição está preenchida, escolha outra!")
    }
    else{
        console.log("O jogador " + jogadorAtual + " fez uma jogada.");
        marcaJogada(td)
    }
}

function marcaJogada(td){
    td.classList.add("Adicionar" + jogadorAtual) // adiciona a classe correspondente ao jogador atual
}

function trocaJogador(){
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'; // Alterna entre X e O
}

function verificarVencedor(jogador){
    const celulas = tabela.getElementsByTagName('td');

    //Condições de vitória (linhas, colunas, diagonais)
    const condicoes = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], //linhas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //colunas
        [0, 4, 8], [2, 4, 6] //Diagonais
    ];

    //verifica todas as condições
    for(let condicao of condicoes){
        const [a, b, c] = condicao;
        if(celulas[a].classList.contains('Adicionar' + jogador) &&
           celulas[b].classList.contains('Adicionar' + jogador) &&
           celulas[c].classList.contains('Adicionar' + jogador)){
            if(jogador == "X"){
                pontuacaoX++;
            }else{
                pontuacaoO++;
            }
            return true; // se alguma condição de vitória for verdadeira, retorna verdadeiro
        }
    }
    return false; // Se nenhuma condição de vitória for atendida, retorna falso
}

// Verifica se houve empate
function verificaEmpate() {
    const celulas = tabela.getElementsByTagName('td');
    for(let celula of celulas){
        if(!celula.classList.contains("AdicionarX") && !celula.classList.contains("AdicionarO")){
            return false; // Se houver pelo menos uma célula vazia, não é empate
        }
    }
    return true;
}

function reiniciarJogo() {
    celulas = tabela.getElementsByTagName('td');
    for(let cell of celulas){
        cell.classList.remove("AdicionarX", "AdicionarO"); // Remove todas as classe de marcação dos jogadores
    }
    jogadorAtual = 'X'; // Renicia com o jogador X
    pontuacaoO = 0;
    pontuacaoX = 0;
    atualizarPlacar()
    alert("Jogo Reiniciado");
}

function reiniciarRound() {
    celulas = tabela.getElementsByTagName('td');
    for(let cell of celulas){
        cell.classList.remove("AdicionarX", "AdicionarO"); // Remove todas as classe de marcação dos jogadores
    }
    jogadorAtual = 'X'; // Renicia com o jogador X
    atualizarPlacar()
    console.log("Round Reiniciado");
}

function atualizarPlacar(){
    var pontosX = document.querySelector("div.item.pontuacaoX")
    var pontosO = document.querySelector("div.item.pontuacaoO")
    pontosX.innerHTML = pontuacaoX;
    pontosO.innerHTML = pontuacaoO;
}