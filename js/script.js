document.addEventListener("DOMContentLoaded", () => {
  // Global variables for list elements and items to be displayed per page

  const ItemsPerPage = 10;
  const studentList = document.querySelectorAll(".student-item");
  const pageHeaderDiv = document.querySelector(".page-header");
  const pageDiv = document.querySelector(".page");

  // Search bar elements and styling

  const searchDiv = document.createElement("div");
  const searchInput = document.createElement("input");
  const searchButton = document.createElement("button");
  const studentNames = document.querySelectorAll("H3");
  const noResult = document.createElement("h2");

  searchButton.textContent = "Search";
  searchInput.type = "text";
  searchInput.placeholder = "Search for students..";
  searchDiv.className = "student-search";
  searchDiv.appendChild(searchInput);
  searchDiv.appendChild(searchButton);
  pageHeaderDiv.appendChild(searchDiv);
  noResult.textContent = "No search results found";
  noResult.style.color = "#888";
  noResult.style.textAlign = "center";
  noResult.style.display = "none";
  pageDiv.appendChild(noResult);

  // Function to find the list item indexes of a given page then hides other indexes

  const showPage = (list, pageNumber) => {
    const startIndex = pageNumber * ItemsPerPage - ItemsPerPage;
    const endIndex = pageNumber * ItemsPerPage;
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = "";
      } else {
        list[i].style.display = "none";
      }
    }
  };

  // Function to generate, append, and add functionality to the pagination buttons.

  const appendPageLinks = list => {
    const numberOfPages = list.length / ItemsPerPage;
    const div = document.createElement("div");
    const ul = document.createElement("ul");
    div.className = "pagination";
    div.appendChild(ul);

    for (let i = 0; i < numberOfPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = i + 1;
      li.appendChild(a);
      a.href = "#";
      ul.appendChild(li);

      a.addEventListener("click", e => {
        const pageSelected = e.target.textContent;
        const links = ul.querySelectorAll("a");
        showPage(list, pageSelected);
        e.target.className = "active";
        for (let i = 0; i < links.length; i++) {
          if (links[i] !== e.target) {
            links[i].className = "";
          }
        }
      });
    }
    if (numberOfPages > 1) {
      ul.firstChild.firstChild.className = "active";
      pageDiv.appendChild(div);
    }
  };

  // hides all divs of a given list

  const removePageLinks = () => {
    const pageLinksDiv = document.querySelector(".pagination");
    if (pageLinksDiv) {
      pageDiv.removeChild(pageLinksDiv);
    }
  };

  // Search filter function * returns filtered divs

  const searchNames = (input, names) => {
    const filteredList = [];
    noResult.style.display = "none";
    removePageLinks();
    for (let i = 0; i < names.length; i++) {
      if (
        names[i].textContent.toLowerCase().indexOf(input.value.toLowerCase()) >
        -1
      ) {
        names[i].parentNode.parentNode.style.display = "";
        filteredList.push(names[i].parentNode.parentNode);
      } else {
        names[i].parentNode.parentNode.style.display = "none";
      }
    }
    if (filteredList.length === 0) {
      noResult.style.display = "";
    }
    return filteredList;
  };

  appendPageLinks(studentList);
  showPage(studentList, 1);

  searchInput.addEventListener("keyup", () => {
    const seachedDivs = searchNames(searchInput, studentNames);
    appendPageLinks(seachedDivs);
    showPage(seachedDivs, 1);
  });

  searchButton.addEventListener("click", () => {
    const seachedDivs = searchNames(searchInput, studentNames);
    appendPageLinks(seachedDivs);
    showPage(seachedDivs, 1);
  });
});
