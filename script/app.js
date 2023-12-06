//calls for buttons to switch between fahrenheit(buttonF) and celsius(buttonC)
let buttonF = document.getElementById("buttonF");
let buttonC = document.getElementById("buttonC");

//latitude
let lat = 0;
//longitude
let lon = 0;

function ApiCall(){
    fetch('https://random-word-api.herokuapp.com/word')
        .then((response) => {
            return response.json();
        })

        .then((data) =>{
            console.log(data[0]);
            startGame(data[0]);
        })
}