const loginButton = document.getElementById('loginButton');

const form = document.forms;
const formValue = form[0];

const popupMessage = (informationExists) => {
  const popup = document.getElementById('myPopup');

  return informationExists ? popup.classList.add('show') : popup.classList.remove('show');
};

const userLogin = (event) => {
  event.preventDefault();

  const username = formValue[0].value;
  const password = formValue[1].value;

  // popupMessage(false);

  /**
   * create json with data
   */
  const url = 'http://localhost:3000/api/v1/auth/login';

  const data = {
    username, password,
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      console.log(result);
      if (result.message === 'Login Successful') {
        popupMessage(false);
        window.location.href = 'http://localhost:3000/api/v1/userpage.html';
      } else {
        popupMessage(true);
      }
      // Handle response we get from the API
      
    })
    .catch((err) => {
      popupMessage(true);
      console.log(err);
    });
};

loginButton.addEventListener('click', userLogin);
