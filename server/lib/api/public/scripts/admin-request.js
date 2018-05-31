'use strict';

/**
 * Inspiration from https://www.w3schools.com/howto/howto_css_modals.asp
 */

var requestModal = document.getElementById('request-modal');

// Get the link to open request modal
var requestContent = document.getElementById('request-content');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

requestContent.onclick = function () {
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