'use strict';

var signupButton = document.getElementById('signupButton');

var form = document.forms;
var formValue = form[0];

var popupMessage = function popupMessage(passwordCheck) {
  var popup = document.getElementById('myPopup');

  return passwordCheck ? popup.classList.add('show') : popup.classList.remove('show');
};

var createAccount = function createAccount(event) {
  event.preventDefault();

  var username = formValue[0].value;
  var email = formValue[1].value;
  var password1 = formValue[2].value;
  var password2 = formValue[3].value;

  if (password1 !== password2) {
    return popupMessage(true);
  }

  popupMessage(false);

  /**
   * create json with data
   */
  var url = 'http://localhost:3000/api/v1/auth/signup';

  var data = {
    username: username, email: email, password1: password1, password2: password2
  };

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');

  // Create our request constructor with all the parameters we need
  var request = new Request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });

  fetch(request).then(function (res) {
    return res.json();
  }).then(function (result) {
    // Handle response we get from the API
    // set the token in local storage
    window.localStorage.setItem('token', result.message.token);
    console.log(result);
    window.location.href = 'http://localhost:3000/api/v1/userpage.html';
  }).catch(function (err) {
    return console.log(err);
  });
};

signupButton.addEventListener('click', createAccount);