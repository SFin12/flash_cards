

function clearInput(){
    let q = document.getElementById('question').value = '';
    let a = document.getElementById('answer').value = '';

    var submitButton = document.getElementById('submit');
    submitButton.value = "Added";
    var originalBackground = submitButton.style.backgroundColor;
    submitButton.style.backgroundColor = 'greenyellow';
    setTimeout(function(){ submitButton.value = "Submit"; submitButton.style.backgroundColor = originalBackground}, 2000);
}

function addQnA() {
    let category = document.getElementById("category").value;
	let newQuestion = document.getElementById('question').value;
	let newAnswer = document.getElementById('answer').value;
    const qAnda = {
        table: category,
        question: newQuestion,
        answer: newAnswer
    }

    console.log(JSON.stringify(qAnda))
    // POST
    fetch(`${window.origin}/api/add`, {

        // Declare what type of data we're sending
        headers: new Headers({
        'Content-Type': 'application/json'
        }),

        // Specify the method
        method: 'POST',

        // A JSON payload
        body: JSON.stringify(qAnda)
    }).then(function (response) { // At this point, Flask has printed our JSON
        if(response.status !== 200) {
            console.log(`Response status was not 200: ${response.status}`);
        }

            clearInput();
    })
}

