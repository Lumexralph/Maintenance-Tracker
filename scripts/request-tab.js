let tabcontent, 
    tablinks = document.getElementsByClassName("tablinks");

const openTab = (evt, tagId) => {
  tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  
  for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("active", "");
  }
  document.getElementById(tagId).style.display = "block";
  evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and display
window.addEventListener('load', () => {
  const startTab = document.getElementById("defaultOpen");
  const tabPanel = document.getElementById('makeRequest');
  startTab.className += " active";
  tabPanel.style.display = "block";
});

// Add EventListener
tablinks[0].addEventListener('click', (event) => {
  openTab(event, 'makeRequest');
});

tablinks[1].addEventListener('click', (event) => {
  openTab(event, 'myRequests');
});