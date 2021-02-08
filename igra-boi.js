let check = 'hard', checkColor, colors;

let colorDisplay = document.querySelector("#colorDisplay"),
    messageAlert = document.querySelector("#message"),
    resetBtn = document.querySelector("#reset"),
    easyBtn = document.querySelector("#easy"),
    hardBtn = document.querySelector("#hard"),
    allSquare = document.querySelectorAll(".square"),
    h1 = document.querySelector('h1');

function rgbColor(random) {
    let colorArr = [];
    for (let i = 0; i < random; i++) {
        let randomColor1 = Math.floor(Math.random() * 255) + 1;
        let randomColor2 = Math.floor(Math.random() * 255) + 1;
        let randomColor3 = Math.floor(Math.random() * 255) + 1;

        colorArr[i] = "rgb(" + randomColor1 + ", " + randomColor2 + ", " + randomColor3 + ")";
    }
    return colorArr;
}

allSquare.forEach(function (el, i) {
    el.addEventListener("click", function () {
        if (el.style.backgroundColor != colors[checkColor - 1]) {
            messageAlert.innerHTML = "TRY AGAIN";
            el.style.display = 'none';
        } else {
            messageAlert.innerHTML = 'YOU WON';
            resetBtn.innerHTML = 'PLAY AGAIN';
            h1.style.backgroundColor = el.style.backgroundColor;
            for (i = 0; i < allSquare.length; i++) {
                allSquare[i].style.backgroundColor = el.style.backgroundColor;
            }
        }
    });
});

function startGame() {
    if (check == "easy") {
        colors = rgbColor(2);
    } else {
        colors = rgbColor(6);
    }
    checkColor = 0;

    if (check == "easy") {
        checkColor = Math.floor(Math.random() * 2) + 1;
    } else {
        checkColor = Math.floor(Math.random() * 6) + 1;
    }

    colorDisplay.innerText = colors[checkColor - 1];
    allSquare.forEach(function (el) {
        el.style.display = "none";
    });
    for (i = 0; i < colors.length; i++) {
        allSquare[i].style.backgroundColor = colors[i];
        allSquare[i].style.display = "block";
    }
}
startGame();

function reset() {
    if (resetBtn.innerHTML = 'PLAY AGAIN') {
        resetBtn.innerHTML = 'NEW COLORS';
        messageAlert.innerHTML = '';
        h1.style.backgroundColor = '';
        startGame();
    }
}

resetBtn.addEventListener('click', reset);


easyBtn.addEventListener("click", function () {
    hardBtn.classList.remove("selected");
    easyBtn.classList.add("selected");
    if (check == "hard") {
        check = "easy";
        startGame();
    }
    reset();
});

hardBtn.addEventListener("click", function () {
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");
    if (check == "easy") {
        check = "hard";
        startGame();
    }
    reset();
});

