const boxes = document.querySelectorAll(".box");
const messageBox = document.getElementById("message-box");
const resetButton = document.getElementById("reset-game");
const msgContainer = document.getElementById("msg-container");

boxes.forEach(box => {
    box.classList.add("bg-yellow-200")
})
let gameRunning = true;
let playerXTurn = true;
const winningPatterns = [[0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]]

const disableButtons = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableButtons = () => {
    for (let box of boxes) {
        box.disabled = false;
    }
}

const isAllDisabled = () => {
    for (let box of boxes) {
        if (!box.disabled) {
            return false;
        }
    }
    return true;
}

const winnerFound = (firstPos, secondPos, thirdPos) => {

    messageBox.innerText = `Winner is : ${boxes[firstPos].innerText}`;
    
    msgContainer.classList.replace("bg-indigo-800", "bg-green-700");

    [firstPos, secondPos, thirdPos].forEach(pos => {
        boxes[pos].classList.replace("bg-yellow-200", "bg-orange-400")
    });
    gameRunning = false;
    disableButtons();
}

const checkWinner = () => {
    for (let pattern of winningPatterns) {
        const [firstPos, secondPos, thirdPos] = pattern
        if (boxes[firstPos].innerText !== "" && boxes[firstPos].innerText === boxes[secondPos].innerText && boxes[firstPos].innerText === boxes[thirdPos].innerText) {
            winnerFound(firstPos, secondPos, thirdPos);
            return
        }
    }
    if (isAllDisabled()) {
        messageBox.innerText = "Game Draw"
        msgContainer.classList.replace("bg-indigo-800", "bg-green-700");
    }

}

const resetGame = () => {
    enableButtons()
    messageBox.textContent = "Turn : Player X";
    msgContainer.classList.replace("bg-green-700", "bg-indigo-800")
    boxes.forEach(box => {
        box.innerText = ""
        box.classList.replace("bg-orange-400", "bg-yellow-200")
    })
    playerXTurn = true;
    gameRunning = true;
}

boxes.forEach(box => {
    box.addEventListener("click", () => {

        if (gameRunning && box.innerText == "") {
            messageBox.textContent = `Turn : Player ${playerXTurn ? "O" : "X"}`
            box.innerText = playerXTurn ? "X" : "O";
            box.disabled = true;
            playerXTurn = !playerXTurn
            checkWinner();
        }
    })
})

resetButton.addEventListener("click",resetGame)