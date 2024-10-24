const state ={
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values:{
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
    },
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

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square)=> {
        square.addEventListener("mousedown", ()=> {
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
            }
        })
    })
}

function main(){
    moveEnemy()
    addListenerHitBox()
}

main()