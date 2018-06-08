const modalDisplay = () => {
  /**
 * Inspiration from https://www.w3schools.com/howto/howto_css_modals.asp
 */

  const requestModal = document.getElementById('request-modal');

  // Get the link to open request modal
  const requestContent = document.getElementsByClassName('request-title');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  console.log(requestContent);
  for (let i = 0; i < requestContent.length; i += 1) {
    requestContent[i].addEventListener('click', () => {
      console.log('i WAS CLICKED')
      requestModal.style.display = 'block';
    });

  }


  // When the user clicks on <span> (x), close the modal
  span.onclick = () => requestModal.style.display = 'none';

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (event) => {
    if (event.target === requestModal) {
      requestModal.style.display = 'none';
    }
  });
};

modalDisplay();
