const token = window.localStorage.getItem('token');
const body = document.querySelector('body');

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

const updateRequestButton = document.getElementById('updateRequest');
const form = document.forms[0];
/** get all the fields in the form */
let department = form[1];
let title = form[0];
let content = form[2];

/** get the current request from storage */
let currentRequest = window.localStorage.getItem('currentRequest');
currentRequest = JSON.parse(currentRequest);

/** populate the form fields */
department.value = currentRequest.department;
title.value = currentRequest.request_title;
content.value = currentRequest.request_content;

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


const updateRequest = () => {
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
    .then(res => res.json())
    .then((result) => {
      window.location.href = 'userpage.html';
    })
    .catch(err => err);

};

updateRequestButton.addEventListener('click', updateRequest);
