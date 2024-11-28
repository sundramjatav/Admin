function loadContent(url, elementId) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

window.onload = function () {
  loadContent("components/header.html", "header");
  loadContent("components/sidemenu.html", "sideMenu");
  loadContent("components/pages/dashboard.html", "main-content");
};

function onSidebarLinkClick(pageUrl, element) {
  loadContent(pageUrl, "main-content");

  const buttons = document.querySelectorAll(".sidebar-btn");
  buttons.forEach((btn) => btn.classList.remove("active"));

  element.classList.add("active");
}

function toggleAccordion(header) {
  const body = header.nextElementSibling; 
  body.classList.toggle("open"); 

  const icon = header.querySelector(".accordion-icon");
  icon.classList.toggle("rotate");

  const allBodies = document.querySelectorAll(".accordion-body");
  const allIcons = document.querySelectorAll(".accordion-icon");
  allBodies.forEach((item) => {
    if (item !== body) {
      item.classList.remove("open");
    }
  });
  allIcons.forEach((item) => {
    if (item !== icon) {
      item.classList.remove("rotate");
    }
  });
}
