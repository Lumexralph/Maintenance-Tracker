const cancelRequestButton = document.getElementById('cancelRequest');

const cancelRequestUpdate = () => {
 window.location.href = 'userpage.html';
};

cancelRequestButton.addEventListener('click', cancelRequestUpdate);