const form = document.querySelector('form');
const token = window.localStorage.getItem('token');
const forms = document.forms[0];
const body = document.querySelector('body');
const noRequestText = document.getElementById('noRequestText');

if (!token) {
  /**
   * if there's no token available
   * redirect to home page
   */
  window.location.replace('userpage.html');
  body.style.display = 'none';
  window.location.href = 'index.html';
  alert('Not recognised user, please register or login');
}

const userNameHolder = document.getElementById('username');
const currentuser = window.localStorage.getItem('currentUser');

/** display the current user */
userNameHolder.innerText = currentuser;


const requestContainer = document.getElementById('myRequests');

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


/**
 * Inspiration from https://www.w3schools.com/howto/howto_js_accordion.asp
 */

const accordion = (el) => {
  el.addEventListener('click', function createAccordion() {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  });
};

const popupMessage = (hasError, text = '') => {
  const popup = document.getElementById('formPopup');
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

/** To make the text editable */
const editRequest = (index) => {
  let requests = window.localStorage.getItem('userRequests');
  requests = JSON.parse(requests);
  window.localStorage.setItem('currentRequest', JSON.stringify(requests[index]));

  /** move to the edit rquest page */
  window.location.href = 'editrequest.html';
};

const user = parseJwt(token);

const createRequest = () => {
  const modal = document.getElementById('request-modal');
  const department = forms[1].value;
  let title = forms[0].value;
  let content = forms[2].value;

  const url = '/api/v1/users/requests/';

  /** cleanup the data of whitespace */
  title = title.trim();
  content = content.trim();

  /** check if the fields are empty */
  if (!title || !content) {
    return popupMessage(true, 'Please ensure that the title and content fileds are not empty');
  }

  const data = {
    title, department, content, user,
  };

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);

  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });

  fetch(request)
    .then((response) => {
      if (response.status === 400) {
        throw new Error('Error occured, request could not be created');
      }

      return response;
    })
    .then(res => res.json())
    .then((result) => {
      /** since there is a request remove the no request created text */
      noRequestText.style.display = 'none';

      /** update the stored requests */
      let requests = window.localStorage.getItem('userRequests');

      requests = JSON.parse(requests);
      requests.push(result);
      const index = requests.length - 1;
      window.localStorage.setItem('userRequests', JSON.stringify(requests));

      const button = document.createElement('BUTTON');
      button.className = 'accordion';
      const buttonContent = document.createTextNode(`${result.request_title}`);

      button.appendChild(buttonContent);

      // create panel element
      const panel = document.createElement('DIV');
      panel.className = 'panel';
      const panelContent = document.createElement('p');
      const editButton = document.createElement('BUTTON');
      const editButtonContent = document.createTextNode('edit');
      editButton.appendChild(editButtonContent);
      editButton.addEventListener('click', () => editRequest(index));

      panelContent.innerHTML = `<p>${result.request_content}</p> <p>${result.department}</p>
        <p>${result.status}`;
      panelContent.appendChild(editButton);

      panel.appendChild(panelContent);

      /** Create an accordion */
      accordion(button);

      requestContainer.append(button);
      button.after(panel);


      /** remove modal form */
      modal.style.display = 'none';

      /** Clean the form */
      form[0].value = '';
      form[2].value = '';
    })
    .catch(err => popupMessage(true, err));
};


const displayAllRequest = () => {
  const url = '/api/v1/users/requests/';

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', token);


  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: 'GET',
    headers,
  });

  fetch(request)
    .then(res => res.json())
    .then((result) => {
      if (!Array.isArray(result)) {
        /** if no requests are created */
        noRequestText.style.display = 'block';
        window.localStorage.setItem('userRequests', JSON.stringify([]));

        /** stop execution */
        throw new Error(result.message);
      } else {
        /** store the user requests */
        window.localStorage.setItem('userRequests', JSON.stringify(result));
      }

      result.forEach((el) => {
        const button = document.createElement('BUTTON');
        button.className = 'accordion';
        const buttonContent = document.createTextNode(`${el.request_title}`);

        button.appendChild(buttonContent);

        // create panel element
        const panel = document.createElement('DIV');
        panel.className = 'panel';
        const panelContent = document.createElement('p');
        panelContent.innerHTML = `<p>${el.request_content}</p> <p>${el.department}</p>
        <p>${el.status}</p><button class="edit-btn">Edit</button>`;

        panel.appendChild(panelContent);
        requestContainer.append(button);
        button.after(panel);
      });
    })
    .then(() => {
      const acc = document.getElementsByClassName('accordion');
      const editButtons = document.getElementsByClassName('edit-btn');

      /** Create accordion to display requests */
      for (let i = 0; i < acc.length; i += 1) {
        accordion(acc[i]);
        editButtons[i].addEventListener('click', () => {
          editRequest(i);
        });
      }
    })
    .catch(err => err);
};

window.addEventListener('load', displayAllRequest);

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createRequest();
});

