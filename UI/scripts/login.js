const loginButton = document.getElementById('loginButton');
const form = document.querySelector('form');

const formField = document.forms;
const formValue = formField[0];

const popupMessage = (hasError, text = '') => {
  const popup = document.getElementById('myPopup');

  popup.innerText = text;

  return hasError ? popup.classList.add('show') : popup.classList.remove('show');
};

/** clear pop message on input field change */
const clearPopWhenInputChanges = () => {
  popupMessage(false);
};

/** length - 1 is used to exclude the signup button
* since it is also a form input
 */

for (let index = 0; index < formValue.length - 1; index += 1) {
  const element = formValue[index];
  element.addEventListener('change', clearPopWhenInputChanges);
}


const userLogin = (formInputs) => {
  const username = formInputs[0].value;
  const password = formInputs[1].value;

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
      if (result.userId) {
        // set the token and userin local storage
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('currentUser', result.username);

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
    .catch(err => popupMessage(true, 'Oops!...seems we have lost connection to server'));
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  userLogin(formValue);
});
