const token = window.localStorage.getItem('token');


if (token === undefined) {
  /**
   * if there's no token available
   * redirect to home page
   */

  window.location.href = 'index.html';
}

const sendRequestButton = document.getElementById('sendRequest');

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
  const form = document.forms[0];
  const department = form[1].value;
  const title = form[0].value;
  const content = form[2].value;


  const url = '/api/v1/users/requests/';

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
    .then(res => res.json())
    .then((result) => {
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
      panelContent.innerHTML = `<p>${result.request_content}</p> <p>${result.department}</p>
        <p>${result.status}</p><button onClick=${editRequest(index)} class="edit-btn">Edit</button>`;

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
    .catch(err => err);
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
      /** store the user requests */
      window.localStorage.setItem('userRequests', JSON.stringify(result));

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

sendRequestButton.addEventListener('click', createRequest);
