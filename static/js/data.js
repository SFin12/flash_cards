let questionAndAnswers = [
    ['2 + 2 = ?', 4],
    ['First president', 'George Washington']
]

function clearInput(){
    let q = document.getElementById('question').value = '';
    let a = document.getElementById('answer').value = '';
    //console.log(`question = ${q} \n answer = ${a}`);

    var myWindow = window.open("", "", "width=300, height=200");
    myWindow.document.write("<h3>Question and Answer added successfully!</h3>");
    setTimeout(function(){ myWindow.close() }, 3000);
}

function addQnA() {
	let newQuestion = document.getElementById('question').value;
	let newAnswer = document.getElementById('answer').value;
    const qAnda = {
        question: newQuestion,
        answer: newAnswer
    }


    // POST
    fetch(`${window.origin}/customize/`, {

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

        response.json().then(function (data) {
            for(arr of data){
                questionAndAnswers.push(arr);
            }
            clearInput();
            
        })

    })/*.then(function (text) {

        console.log('POST response: ');

        // Should be 'OK' if everything was successful
        console.log(text);
    });*/
    

}

