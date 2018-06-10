const logOutLinks = document.getElementsByClassName('log-out');

const logUserOut = () => window.localStorage.clear();

for (let i = 0; i < logOutLinks.length; i += 1) {
  logOutLinks[i].addEventListener('click', logUserOut);
}
