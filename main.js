// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {                          
    const heartButtons = document.querySelectorAll('span.like-glyph')      // retrieving and storing all heart buttons
    // console.log(heartButtons)
    heartButtons.forEach(heart => {
      heart.addEventListener('click', e => {       // querySelectorAll provides an array-like node list so we call a forEach loop to iterate over every heart and add a click event listener to each 
        mimicServerCall()                           // We call the server, if it is a successful call we proceed
        .then( () => {
          if(e.target.innerText === EMPTY_HEART) {   // if the inner text of the heart button we click is empty we change the inner text to a full one and add a class selector to fill the heart red
          e.target.innerText = FULL_HEART
          e.target.classList = "activated-heart"
        }
        else if(e.target.innerText === FULL_HEART) {     // if the inner text of the heart button is full we want to do the opposite
          e.target.innerText = EMPTY_HEART
          e.target.classList = "like-glyph"
        }
      })
      .catch(error => {                                                     // If the call to the server fails, we will remove the hidden class selector from the error body(div) and we want to add the error message we recieve to the paragraph within the div
        const errorBody = document.querySelector('div#modal')
        const errorMessageBody = document.querySelector("p#modal-message")
        errorBody.classList.remove('hidden')
        errorMessageBody.innerText = `Error Message: ${error}`
        setTimeout(() => {
          errorBody.classList= "hidden"    // After 3 seconds we want the error message to disappear so we revert the div class back to hidden 
        }, 3000)
      })
    })
    })
} )




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
