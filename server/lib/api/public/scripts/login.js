'use strict';

var loginButton = document.getElementById('loginButton');

var form = document.forms;
var formValue = form[0];

var popupMessage = function popupMessage(informationExists) {
  var popup = document.getElementById('myPopup');

  return informationExists ? popup.classList.add('show') : popup.classList.remove('show');
};

var userLogin = function userLogin(event) {
  event.preventDefault();

  var username = formValue[0].value;
  var password = formValue[1].value;

  // popupMessage(false);

  /**
   * create json with data
   */
  var url = 'http://localhost:3000/api/v1/auth/login';

  var data = {
    username: username, password: password
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
    console.log(result);
    if (result.message === 'Login Successful') {
      popupMessage(false);
      // set the token in local storage
      window.localStorage.setItem('token', result.token);
      window.location.href = 'http://localhost:3000/api/v1/userpage.html';
    } else {
      popupMessage(true);
    }
    // Handle response we get from the API
  }).catch(function (err) {
    popupMessage(true);
    console.log(err);
  });
};

loginButton.addEventListener('click', userLogin);