'use strict';

var token = window.localStorage.getItem('token');

if (!token) {
  /**
   * if there's no token available
   * redirect to home page
   */
  window.location.href = 'http://localhost:3000/api/v1/index.html';
}

var sendRequestButton = document.getElementById('sendRequest');

var requestContainer = document.getElementById('myRequests');

console.log(requestContainer);

/**
 *
 * @param {string} token
 * @function source https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript/38552302#38552302
 */
function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

var user = parseJwt(token);

var createRequest = function createRequest() {
  var form = document.forms[0];
  var department = form[1].value;
  var title = form[0].value;
  var content = form[2].value;

  var url = 'http://localhost:3000/api/v1/users/requests/';

  var data = {
    title: title, department: department, content: content, user: user
  };

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  // Create our request constructor with all the parameters we need
  var request = new Request(url, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  });

  fetch(request).then(function (res) {
    return res.json();
  }).then(function (result) {
    var button = document.createElement('BUTTON');
    button.className = 'accordion';
    var buttonContent = document.createTextNode('' + result.message.request_title);

    button.appendChild(buttonContent);

    // create panel element
    var panel = document.createElement('DIV');
    panel.className = 'panel';
    var panelContent = document.createElement('p');
    panelContent.innerHTML = '<p>' + result.message.request_content + '</p> <p>' + result.message.department + '</p>\n        <p>' + result.message.status + '</p>';

    panel.appendChild(panelContent);

    // add event
    // console.log(button);
    // button.addEventListener('click', function displayContent() {

    //   this.classList.toggle('active');
    //   panel = this.nextElementSibling;
    //   console.log(panel);
    //   if (panel.style.display === 'block') {
    //     panel.style.display = 'none';
    //   } else {
    //     panel.style.display = 'block';
    //   }
    // });

    requestContainer.append(button);
    button.after(panel);

    console.log(result);
    window.location.href = 'http://localhost:3000/api/v1/userpage.html';
  }).catch(function (err) {
    return console.log(err);
  });
};

var displayAllRequest = function displayAllRequest() {
  var url = 'http://localhost:3000/api/v1/users/requests/';

  var headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  // Create our request constructor with all the parameters we need
  var request = new Request(url, {
    method: 'GET',
    headers: headers
  });

  fetch(request).then(function (res) {
    return res.json();
  }).then(function (result) {
    result.message.forEach(function (el) {
      var button = document.createElement('BUTTON');
      button.className = 'accordion';
      var buttonContent = document.createTextNode('' + el.request_title);

      button.appendChild(buttonContent);

      // create panel element
      var panel = document.createElement('DIV');
      panel.className = 'panel';
      var panelContent = document.createElement('p');
      panelContent.innerHTML = '<p>' + el.request_content + '</p> <p>' + el.department + '</p>\n        <p>' + el.status + '</p>';

      panel.appendChild(panelContent);

      // add event
      // console.log(button);
      // button.addEventListener('click', function displayContent() {

      //   this.classList.toggle('active');
      //   panel = this.nextElementSibling;
      //   console.log(panel);
      //   if (panel.style.display === 'block') {
      //     panel.style.display = 'none';
      //   } else {
      //     panel.style.display = 'block';
      //   }
      // });

      requestContainer.append(button);
      button.after(panel);
    });
    console.log(result.message);
  }).then(function () {
    var acc = document.getElementsByClassName('accordion');

    /**
     * Inspiration from https://www.w3schools.com/howto/howto_js_accordion.asp
     */

    for (var i = 0; i < acc.length; i++) {
      acc[i].addEventListener('click', function () {
        this.classList.toggle('active');
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
          panel.style.maxHeight = null;
        } else {
          panel.style.maxHeight = panel.scrollHeight + 'px';
        }
      });
    }
  }).catch(function (err) {
    return err;
  });
};

window.addEventListener('load', displayAllRequest);

sendRequestButton.addEventListener('click', createRequest);