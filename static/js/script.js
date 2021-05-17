const card = document.getElementById("card1");//main flash card
const qAndA = document.getElementById("qa"); //random question and answer inserted here
const restart = document.getElementById("submit");
const categoryChoice = document.getElementById("choice");
const title = document.getElementById("topic");


if(categoryChoice) {
categoryChoice.addEventListener("change", function () {
    if(title){
        title.innerHTML=categoryChoice.value
    }
    fetch(`${window.origin}/api/choice`, {
        // Declare what type of data we're sending
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        // Specify the method
        method: 'POST',
        // A JSON payload
        body: JSON.stringify(categoryChoice.value)
    }).then(function (response) { // At this point, Flask has printed our JSON
        if(response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
        } else {
            window.location = '../';
        }
})
});
}  

// clicking on card changes questions or shows answer to previous question
card.addEventListener("click", function () {
    if (qAndA.innerHTML == 'Flash Cards' || qAndA.style.color == "darkblue") {
        fetch(`${window.origin}/api/card`)
            .then((response) => response.json())
            .then((data) => {
                //newQnA = toString(data);
                displayQnA(data[0], data[1]);
            });
    } else {
        displayQnA();
    }
});

let currentQnA = []; //temp storage for answer while displaying question
function displayQnA(question = null, answer = null) {
    currentQnA.push(answer);

    if (qAndA.style.color === "darkblue" || qAndA.innerHTML == 'Flash Cards') {
        qAndA.innerHTML = question;
        card.style.background = "linear-gradient(rgb(10,10,200), rgb(50,50,200))";
        qAndA.style.color = "yellow";
    } else {
        qAndA.innerHTML = currentQnA[0];
        currentQnA = [];
        card.style.background =
            "linear-gradient(rgb(255, 242, 67), rgb(255, 244, 144))";
        qAndA.style.color = "darkblue";
    }
};

restart.addEventListener("click", function() {
    fetch(`${window.origin}/api/restart`);
    qAndA.innerHTML = "Flash Cards";
    currentQnA = [];
    qAndA.style.color = 'yellow';
    card.style.background = "linear-gradient(rgb(10,10,200), rgb(50,50,200))";
})
