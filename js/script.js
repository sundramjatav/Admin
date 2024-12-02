function loadPageContent(page) {
  fetch(`components/pages/${page}.html`)
      .then(response => {
          if (!response.ok) throw new Error('Page not found');
          return response.text();
      })
      .then(content => {
          document.getElementById('main-content').innerHTML = content;
      })
      .catch(error => {
          document.getElementById('main-content').innerHTML = `<p>Error loading ${page} page.</p>`;
      });
}

function switchPage(pageName) {
  window.history.pushState({ page: pageName }, '', `/${pageName}`);

  loadPageContent(pageName);

  highlightActiveLink(pageName);
}

function highlightActiveLink(pageName) {
  const buttons = document.querySelectorAll('.sidebar-btn');
  buttons.forEach((btn) => {
      btn.classList.remove('active');
      if (btn.innerText.trim().toLowerCase() === pageName) {
          btn.classList.add('active');
      }
  });
}

window.addEventListener('popstate', function(event) {
  if (event.state && event.state.page) {
      loadPageContent(event.state.page);
      highlightActiveLink(event.state.page);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/')[1] || 'dashboard';  // Default to 'home' if no path
  loadPageContent(path);
  highlightActiveLink(path);
});


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

// document.addEventListener("DOMContentLoaded", function (){
//   document.getElementById('sideHeaderLogo').innerHTML('<img src="../assets/logo.png" alt="">')
// })

document.addEventListener("DOMContentLoaded", function () {
  const includes = document.querySelectorAll("[data-include]");
  console.log(includes); 
  includes.forEach(async (includeElement) => {
      const file = includeElement.getAttribute("data-include");
      try {
          const response = await fetch(file);
          if (!response.ok) throw new Error(`Failed to load ${file}`);
          const content = await response.text();
          includeElement.innerHTML = content;
      } catch (error) {
          console.error(error.message);
          includeElement.innerHTML = "<p>Content could not be loaded.</p>";
      }
  });
});

