const loginButton = document.getElementById('loginButton');

const form = document.forms;
const formValue = form[0];

const popupMessage = (validCredentials, text = '') => {
  const popup = document.getElementById('myPopup');

  popup.innerText = text;

  return validCredentials ? popup.classList.add('show') : popup.classList.remove('show');
};

const userLogin = (event) => {
  event.preventDefault();

  const username = formValue[0].value;
  const password = formValue[1].value;

  /**
   * create json with data
   */
  const url = '/api/v1/auth/login';

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
      if (result.message === 'Login successful') {
        popupMessage(false);
        // set the token in local storage
        window.localStorage.setItem('token', result.token);

        /** Check if the user is an admin or regular user */
        if (result.adminRole) {
          window.location.href = 'admin.html';
          return undefined;
        }
        window.location.href = 'userpage.html';
      } else {
        popupMessage(true, result.message);
      }
      return undefined;
    })
    .catch(err => popupMessage(true, err));
};

loginButton.addEventListener('click', userLogin);
