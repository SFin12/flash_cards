


// generates random index to get random question from data array.
// questionAndAnswers is an array in data.js with all Q&A.
let ranQindex = Math.floor(Math.random() * questionAndAnswers.length)

// object triggered when card(s) are clicked to get random question and answer.
let library = {
    question: question,
    answer: answer
};

// gets new random index and updates library with a new Q&A.
// called after card is clicked.
function refresh(){
    ranQindex = Math.floor(Math.random() * questionAndAnswers.length)
    library = {
    question: questionAndAnswers[ranQindex][0],
    answer: questionAndAnswers[ranQindex][1]
}
}

const card = document.getElementById('card1');
let qAndA = document.getElementById('qa');//question and answer inserted here


card.addEventListener("click", function () {
    if (!qAndA.innerHTML) {
        qAndA.innerHTML = library.question;
        console.log(qAndA.innerHTML + '1');
        card.style.background = 'linear-gradient(rgb(10,10,200), rgb(50,50,200))';
        card.style.color = 'yellow';
    }
    else if (qAndA.innerHTML == library.question) {
        qAndA.innerHTML = library.answer;
        card.style.background = 'linear-gradient(rgb(255, 242, 67), rgb(255, 244, 144))';
				card.style.color = 'darkblue';
        
    }
    else if (qAndA.innerHTML == library.answer) {
        refresh();
        qAndA.innerHTML = library.question;
        card.style.background = 'linear-gradient(rgb(10,10,200), rgb(50,50,200))';
        card.style.color = 'yellow';
    }
    
});


