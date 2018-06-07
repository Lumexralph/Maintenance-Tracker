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


const updateRequest = () => {
  department = department.value;
  title = title.value;
  content = content.value;

};
