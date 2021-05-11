const card = document.getElementById("card1");
const qAndA = document.getElementById("qa"); //question and answer inserted here

card.addEventListener("click", function () {
    if (!qAndA.innerHTML || card.style.color == "darkblue") {
        console.log('in fetch');
        fetch(`${window.origin}/card`)
            .then((response) => response.json())
            .then((data) => {
                //newQnA = toString(data);
                displayQnA(data[0], data[1]);
            });
    } else {
        displayQnA();
    }
});

let currentQnA = [];
function displayQnA(question = null, answer = null) {
    currentQnA.push(answer);
    console.log(currentQnA[0])
    if (card.style.color === "darkblue" || !qAndA.innerHTML) {
        qAndA.innerHTML = question;
        console.log(question)
        card.style.background = "linear-gradient(rgb(10,10,200), rgb(50,50,200))";
        card.style.color = "yellow";
    } else {
        qAndA.innerHTML = currentQnA[0];
        currentQnA = [];
        card.style.background =
            "linear-gradient(rgb(255, 242, 67), rgb(255, 244, 144))";
        card.style.color = "darkblue";
    }
}
