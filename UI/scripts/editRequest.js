const token = window.localStorage.getItem('token');
const body = document.querySelector('body');
const form = document.querySelector('form');


if (!token) {
  /**
   * if there's no token available
   * redirect to home page
   */
  window.location.replace('editrequest.html');
  body.style.display = 'none';
  window.location.href = 'index.html';
  alert('Not recognised user, please register or login');
}

const forms = document.forms[0];

const userNameHolder = document.getElementById('username');
const currentuser = window.localStorage.getItem('currentUser');

/** display username in header */
userNameHolder.innerText = currentuser;

const popupMessage = (hasError, text = '') => {
  const popup = document.getElementById('errorMessage');
  popup.innerText = text;

  if (hasError) popup.style.display = 'block';
  else popup.style.display = 'none';
};

/** clear pop message on input field change */
const clearPopWhenInputChanges = () => {
  popupMessage(false);
};

/** length - 1 is used to exclude the signup button
* since it is also a form input
 */

for (let index = 0; index < forms.length - 1; index += 1) {
  const element = forms[index];
  element.addEventListener('change', clearPopWhenInputChanges);
}

/**
 *
 * @param {string} token
 * @function source https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript/38552302#38552302
 */
const parseJwt = (storedToken) => {
  const base64Url = storedToken.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
};

/** get all the fields in the form */
let department = forms[1];
let title = forms[0];
let content = forms[2];

/** get the current request from storage */
let currentRequest = window.localStorage.getItem('currentRequest');
currentRequest = JSON.parse(currentRequest);

/** populate the form fields */
department.value = currentRequest.department;
title.value = currentRequest.request_title;
content.value = currentRequest.request_content;

const updateRequest = () => {
  /** cleanup the data of whitespace */
  const titleValue = title.value.trim();
  const contentValue = content.value.trim();

  /** check if the fields are empty */
  if (!titleValue || !contentValue) {
    return popupMessage(true, 'Ooops! seems some fields are empty, please ensure the request title and description are not empty');
  }

  

  /** get the user details */
  const user = parseJwt(token);

  /** extract the id of request to modify */
  const requestId = currentRequest.request_id;
  department = department.value;
  title = title.value;
  content = content.value;

  const url = `/api/v1/users/requests/${requestId}`;

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  const data = {
    title, content, user, department,
  };

  /** Create our request constructor with all the parameters we need */
  const request = new Request(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });

  /** send our request to server to query database */
  fetch(request)
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Error occured, request could not be created');
      }

      return response;
    })
    .then(res => res.json())
    .then((result) => {
      window.location.href = 'userpage.html';
    })
    .catch(err => popupMessage(true, err.message ? 'Oops!...seems we have lost connection to server' : err));

};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  updateRequest();
});

