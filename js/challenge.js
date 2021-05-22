//starts countup timer using startCount function
let idInterval = setInterval(plusCount, 1000);

//declares variables for counter number
let counter = document.querySelector('#counter');

//declares variables for buttons
let minusButton = document.querySelector('#minus');
let plusButton = document.querySelector('#plus');
let heartButton = document.querySelector('#heart');
let pauseButton = document.querySelector('#pause');

//declares variable for like Ul element
let likeUl = document.querySelector('.likes');

//making buttons able to feed through a single click event listener
document.body.onLoad = addButtonsToDiv();


/*BUTTON SECTION*/

function addButtonsToDiv(){
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add('buttons');
    document.body.insertBefore(buttonDiv, minusButton);
    buttonDiv.appendChild(minusButton);
    buttonDiv.appendChild(plusButton);
    buttonDiv.appendChild(heartButton);
    buttonDiv.appendChild(pauseButton);
}

//button click event listener
document.querySelector('.buttons').addEventListener('click', handleButtons);

//passes button clicks to correct functions
function handleButtons(e){
    if(e.target.getAttribute('id') === 'minus'){
        minusCount();
    }else if(e.target.getAttribute('id') === 'plus'){
        plusCount();
    }else if(e.target.getAttribute('id') === 'heart'){
        likeCount(e)
    }else if(e.target.getAttribute('id') === 'pause'){
        pauseCount(e)
    }else{
        console.log('god dammit');
    }
}

//adds a number to the counter when the plus button is clicked
function plusCount(){
    counter.innerText = parseInt(counter.innerText) + 1;
}

//removes a number from the counter when the minus button is clicked
function minusCount(){
    counter.innerText = parseInt(counter.innerText) - 1;
}

//lets the like button adds count of likes to ul.like
function likeCount(e){
    let currentNum = counter.innerText;
    let likeLi = document.getElementById(currentNum);

    if(likeLi){
        let text = likeLi.innerText;
        let txtArray= text.split(' ');
        let num = Number(txtArray.slice(-2, -1));
        likeLi.innerHTML = `The number <strong>${currentNum}</strong> has ${num + 1} likes.`;
    } else {
        let likeLi = document.createElement('li');
        likeLi.setAttribute("id", currentNum);
        likeUl.appendChild(likeLi);
        likeLi.innerHTML = `The number <strong>${currentNum}</strong> has 1 like.`
    }
}

//pause/resumes counter and changes button text to reflect it's function. also disables all other buttons
function pauseCount(e){ 
    if(e.target.innerText === 'pause'){
        clearInterval(idInterval);
        e.target.innerText = 'resume';
        document.getElementById('heart').disabled = true;
        document.getElementById('plus').disabled = true;
        document.getElementById('minus').disabled = true;
    }else if(e.target.innerText === 'resume'){
        setInterval(plusCount, 1000);
        e.target.innerText = 'pause';
        document.getElementById('heart').disabled = false;
        document.getElementById('plus').disabled = false;
        document.getElementById('minus').disabled = false;
        idInterval++;
    }
}

/*COMMENT SECTION*/
//comment submit button event listener
document.querySelector("#comment-form").addEventListener('submit', formSubmitHandler);

//comment submit event handler
function formSubmitHandler(evt) {
    evt.preventDefault();
    let input = document.querySelector('#comment-input');
    if (input.value != ''){
      addComment(input.value);
      input.value = '';
    }else{
      alert("Please enter a comment!")
    }
  };

//adds comment from user
function addComment(comment){
    let commentsDiv = document.querySelector('#list');
    let newCommentDiv = document.createElement('div');
    let newCommentText = document.createTextNode(`→${comment}`);
    newCommentDiv.appendChild(newCommentText);
    commentsDiv.appendChild(newCommentDiv);
}
