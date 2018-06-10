const token = window.localStorage.getItem('token');

const body = document.querySelector('body');
const tableBody = document.querySelector('tbody');
const filterOptions = document.getElementById('filter-by');

/** get the url to be queried if filtered or not
 */
let mainUrl = '/api/v1/requests';


let disApproveRequestCopy;


if (!token) {
  /**
   * if there's no token available
   * redirect to home page
   */

  window.location.replace('admin.html');
  body.style.display = 'none';
  window.location.href = 'index.html';
  alert('Not recognised user, please register or login');
}


// #####################################################
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

/** get identity of user */
const user = parseJwt(token);

/** check if the user is not an admin
 * redirect to user page with an alert message
*/
if (!user.adminRole) {
  window.location.replace('admin.html');
  body.style.display = 'none';
  window.location.href = 'userpage.html';

  alert('Only an admin can access this page');

}

// ################################################

const modalDisplay = () => {
  /**
 * Inspiration from https://www.w3schools.com/howto/howto_css_modals.asp
 */

  const requestModal = document.getElementById('request-modal');

  // Get the link to open request modal
  const requestContent = document.getElementsByClassName('request-title');

  // Get the request ids
  const requestIds = document.getElementsByClassName('request-id');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];

  for (let i = 0; i < requestContent.length; i += 1) {
    requestContent[i].addEventListener('click', () => {
      const requestHeading = document.querySelector('.modal-header h2');
      const requestBody = document.querySelector('.modal-body');
      const requestFooter = document.querySelector('.modal-footer p');
      let requestList = window.localStorage.getItem('allRequests');

      requestList = JSON.parse(requestList);

      const requestIndex = Number(requestIds[i].id);

      const presentRequest = requestList[requestIndex];
      /** populate the modal per request */
      requestHeading.innerText = presentRequest.request_title;

      requestBody.innerText = presentRequest.request_content;

      requestFooter.innerText = presentRequest.department;

      requestModal.style.display = 'block';
    });
  }


  // When the user clicks on <span> (x), close the modal
  span.onclick = () => requestModal.style.display = 'none';

  // When the user clicks anywhere outside of the modal, close it
  window.addEventListener('click', (event) => {
    if (event.target === requestModal) {
      requestModal.style.display = 'none';
    }
  });
};


const resolveRequest = (requestId, index) => {
  const url = `/api/v1/requests/${requestId}/resolve`;

  const headers = new Headers();
  headers.append('Authorization', token);

  /** reate our request constructor with all the parameters we need */
  const request = new Request(url, {
    method: 'PUT',
    headers,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 401) {
        /** means not an admin */
        window.location.replace('admin.html');
        body.style.display = 'none';
        window.location.href = 'index.html';

        alert('Only an admin can access this page');
      }

      return res;
    })
    .then(res => res.json())
    .then((result) => {
      const tableRow = document.createElement('TR');
      const text = `<td id=${Number(result.request_id - 1)} class="request-id">${result.request_id}</td>
      <td>${result.status}</td>
      <td>
        <p class="request-title">${result.request_title}</p>
      </td>
      <td>
        <button data-id="${result.request_id}" class="admin-table-btn accept-btn" disabled>accept</button>
        <button data-id="${result.request_id}" class="admin-table-btn reject-btn" disabled>reject</button>
      </td>
      <td>
        <label class="">
          <button data-id="${result.request_id}" class="resolve-btn" disabled>resolve</button>
        </label>
      </td>`;
      tableRow.innerHTML = text;
      tableBody.replaceChild(tableRow, tableBody.childNodes[index]);
    })
    .then(() => modalDisplay())
    .catch(err => err);
};

const approveRequest = (requestId, index) => {
  const url = `/api/v1/requests/${requestId}/approve`;

  const headers = new Headers();
  headers.append('Authorization', token);

  /** reate our request constructor with all the parameters we need */
  const request = new Request(url, {
    method: 'PUT',
    headers,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 401) {
        /** means not an admin */
        window.location.href = 'userpage.html';
      }

      return res;
    })
    .then(res => res.json())
    .then((result) => {
      const tableRow = document.createElement('TR');
      const text = `<td id=${Number(result.request_id - 1)} class="request-id">${result.request_id}</td>
      <td>${result.status}</td>
      <td>
        <p class="request-title">${result.request_title}</p>
      </td>
      <td>
        <button data-id="${result.request_id}" class="admin-table-btn accept-btn" disabled>accept</button>
        <button data-index="${result.request_id}" class="admin-table-btn reject-btn">reject</button>
      </td>
      <td>
        <label class="">
          <button data-index="${result.request_id}" class="resolve-btn">resolve</button>
        </label>
      </td>`;
      tableRow.innerHTML = text;
      tableBody.replaceChild(tableRow, tableBody.childNodes[index]);
    })
    .then(() => {
      const rejectButtons = document.getElementsByClassName('reject-btn');
      const resolveButtons = document.getElementsByClassName('resolve-btn');


      rejectButtons[index].addEventListener('click', () => {
        disApproveRequestCopy(requestId, index);
      });

      resolveButtons[index].addEventListener('click', () => {
        resolveRequest(requestId, index);
      });

    })
    .then(() => modalDisplay())
    .catch(err => err);
};

const disApproveRequest = (requestId, index) => {
  const url = `/api/v1/requests/${requestId}/disapprove`;

  const headers = new Headers();
  headers.append('Authorization', token);

  /** reate our request constructor with all the parameters we need */
  const request = new Request(url, {
    method: 'PUT',
    headers,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 401) {
        /** means not an admin */
        window.location.href = 'userpage.html';
      }

      return res;
    })
    .then(res => res.json())
    .then((result) => {
      const tableRow = document.createElement('TR');
      const text = `<td id=${Number(result.request_id - 1)} class="request-id">${result.request_id}</td>
      <td>${result.status}</td>
      <td>
        <p class="request-title">${result.request_title}</p>
      </td>
      <td>
        <button data-id="${result.request_id}" class="admin-table-btn accept-btn">accept</button>
        <button data-id="${result.request_id}" class="admin-table-btn reject-btn" disabled>reject</button>
      </td>
      <td>
        <label class="">
          <button data-id="${result.request_id}" class="resolve-btn">resolve</button>
        </label>
      </td>`;
      tableRow.innerHTML = text;
      tableBody.replaceChild(tableRow, tableBody.childNodes[index]);
    })
    .then(() => {
      const acceptButtons = document.getElementsByClassName('accept-btn');
      const resolveButtons = document.getElementsByClassName('resolve-btn');

      acceptButtons[index].addEventListener('click', () => {
        approveRequest(requestId, index);
      });

      resolveButtons[index].addEventListener('click', () => {
        resolveRequest(requestId, index);
      });

    })
    .then(() => modalDisplay())
    .catch(err => err);
};
/** hold a copy of the function to be used above because of temporary dead zone */
disApproveRequestCopy = disApproveRequest;


const displayAllRequests = () => {
  const url = mainUrl;

  const headers = new Headers();
  headers.append('Authorization', token);

  /** reate our request constructor with all the parameters we need */
  const request = new Request(url, {
    method: 'GET',
    headers,
  });

  fetch(request)
    .then((res) => {
      if (res.status === 401) {
        /** means not an admin */
        window.location.replace('admin.html');
        body.style.display = 'none';
        window.location.href = 'userpage.html';
      }

      return res;
    })
    .then(res => res.json())
    .then((result) => {
      /** Keep Request in local storage */
      window.localStorage.setItem('allRequests', JSON.stringify(result));

      result.forEach((el, index) => {
        const tableRow = document.createElement('TR');
        const text = `<td id=${index} class="request-id">${el.request_id}</td>
      <td>${el.status}</td>
      <td>
        <p class="request-title">${el.request_title}</p>
      </td>
      <td>
        <button data-id="${el.request_id}" class="admin-table-btn accept-btn">accept</button>
        <button data-id="${el.request_id}" class="admin-table-btn reject-btn">reject</button>
      </td>
      <td>
        <label class="">
          <button data-id="${el.request_id}" class="resolve-btn">resolve</button>
        </label>
      </td>`;
        tableRow.innerHTML = text;

        /** add the new rows */
        tableBody.appendChild(tableRow);
      });
    })
    .then(() => modalDisplay())
    .then(() => {
      const acceptButtons = document.getElementsByClassName('accept-btn');
      const rejectButtons = document.getElementsByClassName('reject-btn');
      const resolveButtons = document.getElementsByClassName('resolve-btn');

      for (let i = 0; i < acceptButtons.length; i += 1) {
        acceptButtons[i].addEventListener('click', function accept() {
          approveRequest(this.dataset.id, i);
        });

        rejectButtons[i].addEventListener('click', function reject() {
          disApproveRequest(this.dataset.id, i);
        });

        resolveButtons[i].addEventListener('click', function reject() {
          resolveRequest(this.dataset.id, i);
        });
      }
    })
    .catch(err => err);
};

/** when the page loads */
window.addEventListener('load', displayAllRequests);

/** when the request is being filtered */
filterOptions.addEventListener('input', function filter() {
  mainUrl = filterOptions.value === 'none' ? '/api/v1/requests' : `/api/v1/requests?filter=${this.value}`;
  /** in case we filter the page and not on loading it clear the table body */
  tableBody.innerHTML = '';
  displayAllRequests();
});
