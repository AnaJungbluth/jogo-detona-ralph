const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector(".time-left"),
        score: document.querySelector("#score")
    },
    values:{
        hitPosition: 0,
        result: 0,
        curretTime: 60,
    },
    actions:{
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
}

function resetGame() {
    state.values.curretTime = 60;
    state.values.result = 0;
    state.values.hitPosition = 0;

    state.view.timeLeft.textContent = state.values.curretTime;
    state.view.score.textContent = state.values.result;

    state.actions.timerId = setInterval(randomSquare, 1000);
    state.actions.countDownTimerId = setInterval(countDown, 1000);
}

function countDown(){
    state.values.curretTime--
    state.view.timeLeft.textContent = state.values.curretTime

    if(state.values.curretTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        if(state.values.result < 30){
            alert("Game Over! O seu resultado foi: " + state.values.result)
        }else{
            alert("Vitória! O seu resultado foi: " + state.values.result)
        }
        resetGame()
    }
}

function playSound(audioName){
    let audio = new Audio(`src/sons/${audioName}.m4a`)
    audio.volume = 0.2
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square)=> {
        square.classList.remove("enemy")
    })

    let randomNum = Math.floor(Math.random() * 9)
    let randomSquare = state.view.squares[randomNum]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
            }
        })
    })
}

function main(){
    addListenerHitBox()
}

main()