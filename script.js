var draggedOption;

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  draggedOption = event.target;
}



//so here it is drop event 
function drop(event) {
  event.preventDefault();
  var input = event.target;
  input.appendChild(draggedOption);
  

  //it is done so thatw=if the numbers dragged are not in ascending order then it will show red colour otherwise green colour
  var inputs = Array.from(document.getElementsByClassName('input'));
  var values = inputs.map(function(input) {
    return parseInt(input.innerText);
  });
  
  var sortedValues = values.slice().sort(function(a, b) {
    return a - b;
  });
  
  if (JSON.stringify(values) === JSON.stringify(sortedValues)) {
    input.classList.add('drop-valid');
    input.classList.remove('drop-invalid');
  } else {
    input.classList.add('drop-invalid');
    input.classList.remove('drop-valid');
  }
}

function checkAnswer() {   //to check the answer
    var inputs = document.getElementsByClassName('input');
    var answer = [];
    var isAnyValueMissing = false;  //to check if any value s missing
    for (var i = 0; i < inputs.length; i++) {
        var option = inputs[i].getElementsByTagName('div')[0];
        if (option) {
            answer.push(parseInt(option.innerText));
        } 
        else {
            answer.push(null);
            isAnyValueMissing = true; // Set the flag to true if value is missing
        }
    }

    var sortedAnswer = answer.slice().sort(function(a, b) {
        return a - b;
    });

    var isCorrect = JSON.stringify(answer) === JSON.stringify(sortedAnswer);

    if (isAnyValueMissing) {   //if no value is dragged and person clicks on check button
        alert('Please fill in all the values before checking.');
        resetGameAgain();
    } 
    else if (isCorrect) {
        showSuccessScreen(); //if answer is correct
    } 
    else {
        showTryAgainScreen(); //if answer is incorrect
    }  
}

function showSuccessScreen() {   //if answer is correct
    var quizContainer = document.getElementById('quiz_container');
    quizContainer.innerHTML = `
    <div className="trythisagain">
        <div class="success-screen">
            <h2>Hurrah🎉</h2>
            <p>Congratulations! Your answer is correct!</p>
            <button onclick="resetGameAgain()">Play Again</button>
        </div>
    </div>
    `;
}

function showTryAgainScreen() {   //if answer is incorrect
    var quizContainer = document.getElementById('quiz_container');
    quizContainer.innerHTML = `
    <div className="trythisagain">
        <div class="try-again-screen">
        <h2>Try Again!</h2>
        <p>Sorry, your answer is incorrect. Please try again.</p>
        <button onclick="resetGameAgain()">Play Again</button>
        </div>
    </div>
    `;
  }

  function resetGameAgain() {   //when the button is clicked we get back to the main quiz again
    window.location.href = 'file.html';
  }
  

function resetGame() {
    var optionsContainer = document.getElementById('options-container');
    var inputsContainer = document.getElementById('inputs-container');
  
    // Generate random numbers
    var numbers = generateRandomNumbers(5);
  
    // Clear options
    optionsContainer.innerHTML = '<h2>Options</h2>';
    for (var i = 0; i < numbers.length; i++) {
      var option = document.createElement('div');
      option.className = 'option';
      option.draggable = true;
      option.ondragstart = drag;
      option.innerText = numbers[i];
      optionsContainer.appendChild(option);
    }
  
    // Clear inputs
    inputsContainer.innerHTML = `
      <h2>Sort the Numbers</h2>
      <div class="input" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      <div class="input" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      <div class="input" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      <div class="input" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
      <div class="input" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
    `;
  }
  
  function generateRandomNumbers(count) {
    var numbers = [];
    while (numbers.length < count) {
      var randomNumber = Math.floor(Math.random() * 100) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
  
  
  

  window.onload = function() {
    resetGame();
  };
