/**
 * Inspiration from https://www.w3schools.com/howto/howto_css_modals.asp
 */

 
const requestModal = document.getElementById('request-modal');

// Get the button to open request modal
const requestButton = document.getElementById('makeRequest');

// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0];

requestButton.onclick = () => requestModal.style.display = 'block';


// When the user clicks on <span> (x), close the modal
span.onclick = () => requestModal.style.display = 'none';

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
  if (event.target === requestModal) {
    requestModal.style.display = 'none';
  }
});
