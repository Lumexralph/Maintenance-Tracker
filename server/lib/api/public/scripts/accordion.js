'use strict';

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