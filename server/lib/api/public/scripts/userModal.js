'use strict';

/**
 * Inspiration from https://www.w3schools.com/howto/howto_css_modals.asp
 */

var requestModal = document.getElementById('request-modal');

// Get the button to open request modal
var requestButton = document.getElementById('makeRequest');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

requestButton.onclick = function () {
  return requestModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  return requestModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function (event) {
  if (event.target === requestModal) {
    requestModal.style.display = 'none';
  }
});