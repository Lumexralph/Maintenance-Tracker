const signupButton = document.getElementById('signupButton');
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


const createAccount = (formInputs) => {
  const username = formInputs[0].value;
  const email = formInputs[1].value;
  const password1 = formInputs[2].value;
  const password2 = formInputs[3].value;

  /**
   * create json with data
   */
  const url = '/api/v1/auth/signup';

  const data = {
    username, email, password1, password2,
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  return fetch(request)
    .then(res => res.json())
    .then((result) => {
      // Handle response if we get a message other than created user from the API
      if (!result.userId) {
        return popupMessage(true, result.message);
      }
     
      /**
       * set the token in local storage
       */
      window.localStorage.setItem('token', result.token);

      /** direct the user to userpage */
      window.location.href = 'userpage.html';
      
    })
    .catch(err => popupMessage(true, err));
};

const validateUserInput = (formInputs) => {
  /** extract the input values */
  let username = formInputs[0].value;
  let email = formInputs[1].value;
  let password1 = formInputs[2].value;
  let password2 = formInputs[3].value;

  /** clean the inputs of whitespaces
   * remember to make it a reusable function
   */
  username = username.trim();
  email = email.trim();
  password1 = password1.trim();
  password2 = password2.trim();

  if (password1 !== password2) {
    return popupMessage(true, 'Passwords do not match, please check');
  }

  /** If all the above runs without issue
   * create an account for user
   */
  createAccount(formInputs);

};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  validateUserInput(formValue);
});
