const signupButton = document.getElementById('signupButton');

const form = document.forms;
const formValue = form[0];


const popupMessage = (passwordCheck, text = '') => {
  const popup = document.getElementById('myPopup');
  popup.innerText = text;

  return passwordCheck ? popup.classList.add('show') : popup.classList.remove('show');
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

const createAccount = (event) => {
  event.preventDefault();

  const username = formValue[0].value;
  const email = formValue[1].value;
  const password1 = formValue[2].value;
  const password2 = formValue[3].value;

  if (!username || !email || !password1 || !password2) {
    return popupMessage(true, 'hmmm... it is like one of the input field is empty.');
  }

  if (password1 !== password2) {
    return popupMessage(true, 'Passwords do not match, please check');
  }

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

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      // Handle response we get from the API
      if (!result.userId) {
        return popupMessage(true, result.message);
      }

      /**
       * Remove popup if any
       */

      popupMessage(false);
      /**
       * set the token in local storage
       */

      window.localStorage.setItem('token', result.token);

      /** direct the user to userpage */
      window.location.href = 'userpage.html';

    })
    .catch(err => err);
};

signupButton.addEventListener('click', createAccount);
