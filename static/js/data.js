function clearInput(){
    let q = document.getElementById('question').value = '';
    let a = document.getElementById('answer').value = '';
};

function btnMessage(message, color, alertMessage="") {
    var submitButton = document.getElementById('submit');
    submitButton.value = message;

    var originalBackground = submitButton.style.backgroundColor;
    submitButton.style.backgroundColor = color;
    
    if(color === "red"){setTimeout(function(){ submitButton.value = "Submit"; submitButton.style.backgroundColor = originalBackground;
    alert(alertMessage)
    }, 500)
    } 
    else {
    setTimeout(function(){ submitButton.value = "Submit"; submitButton.style.backgroundColor = originalBackground;
    }, 2000);
    }
    
}


//submit button triggers POST to database
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
    if(qAnda.table && newQuestion && newAnswer){

    console.log("starting post")
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
            btnMessage("Added", "greenyellow")
    })
    } else if(!qAnda.table) {
        
        btnMessage("Failed", "red", "Choose a category.")
 
    } else {
        btnMessage("Failed", "red", "Missing question or answer.")
    }
    clearInput()
}

