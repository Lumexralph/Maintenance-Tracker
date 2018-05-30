const requestModal = document.getElementById('request-modal');

// Get the link to open request modal
const requestContent = document.getElementById("request-content");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

requestContent.onclick = () => requestModal.style.display = "block";


// When the user clicks on <span> (x), close the modal
span.onclick = () => requestModal.style.display = "none";

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', (event) => {
    if (event.target === requestModal) {
        requestModal.style.display = "none";
    }
})