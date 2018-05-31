const signupButton = document.getElementById('signupButton');

const form = document.forms;
const formValue = form[0];

const popupMessage = (passwordCheck) => {
  const popup = document.getElementById('myPopup');

  return passwordCheck ? popup.classList.add('show') : popup.classList.remove('show');
};

const createAccount = (event) => {
  event.preventDefault();

  const username = formValue[0].value;
  const email = formValue[1].value;
  const password1 = formValue[2].value;
  const password2 = formValue[3].value;

  if (password1 !== password2) {
    return popupMessage(true);
  }

  popupMessage(false);


  /**
   * create json with data
   */
  const url = 'http://localhost:3000/api/v1/auth/signup';

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
    .then((res) => res.json())
    .then((result) => {
    // Handle response we get from the API
    // set the token in local storage
      window.localStorage.setItem('token', result.message.token);
      window.location.href = 'http://localhost:3000/api/v1/userpage.html';
    })
    .catch(err => console.log(err));
};

signupButton.addEventListener('click', createAccount);
