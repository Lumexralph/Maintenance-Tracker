const token = window.localStorage.getItem('token');

if (!token) {
  /**
   * if there's no token available
   * redirect to home page
   */
  window.location.href = 'http://localhost:3000/api/v1/index.html';
}

const sendRequestButton = document.getElementById('sendRequest');

const requestContainer = document.getElementById('myRequests');

console.log(requestContainer);


/**
 *
 * @param {string} token
 * @function source https://stackoverflow.com/questions/38552003/how-to-decode-jwt-token-in-javascript/38552302#38552302
 */
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

const user = parseJwt(token);

const createRequest = () => {
  const form = document.forms[0];
  const department = form[1].value;
  const title = form[0].value;
  const content = form[2].value;


  const url = 'http://localhost:3000/api/v1/users/requests/';

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
      const button = document.createElement('BUTTON');
      button.className = 'accordion';
      const buttonContent = document.createTextNode(`${result.message.request_title}`);

      button.appendChild(buttonContent);

      // create panel element
      const panel = document.createElement('DIV');
      panel.className = 'panel';
      const panelContent = document.createElement('p');
      panelContent.innerHTML = `<p>${result.message.request_content}</p> <p>${result.message.department}</p>
        <p>${result.message.status}</p>`;

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
    })
    .catch(err => console.log(err));
};

const displayAllRequest = () => {
  const url = 'http://localhost:3000/api/v1/users/requests/';

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
      result.message.forEach((el) => {
        const button = document.createElement('BUTTON');
        button.className = 'accordion';
        const buttonContent = document.createTextNode(`${el.request_title}`);

        button.appendChild(buttonContent);

        // create panel element
        const panel = document.createElement('DIV');
        panel.className = 'panel';
        const panelContent = document.createElement('p');
        panelContent.innerHTML = `<p>${el.request_content}</p> <p>${el.department}</p>
        <p>${el.status}</p>`;

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
    })
    .then(() => {
      const acc = document.getElementsByClassName('accordion');

/**
 * Inspiration from https://www.w3schools.com/howto/howto_js_accordion.asp
 */

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener('click', function () {
    this.classList.toggle('active');
    const panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = `${panel.scrollHeight  }px`;
    }
  });
}
    })
    .catch(err => err);
};

window.addEventListener('load', displayAllRequest);

sendRequestButton.addEventListener('click', createRequest);
