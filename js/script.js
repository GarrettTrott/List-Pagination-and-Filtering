document.addEventListener("DOMContentLoaded", () => {
  // Global variables for list elements and items to be displayed per page

  const studentList = document.querySelectorAll(".student-item");
  const ItemsPerPage = 10;

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
    const pageDiv = document.querySelector(".page");
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
        showPage(studentList, pageSelected);
        e.target.className = "active";
        for (let i = 0; i < links.length; i++) {
          if (links[i] !== e.target) {
            links[i].className = "";
          }
        }
      });
    }

    ul.firstChild.firstChild.className = "active";
    pageDiv.appendChild(div);
  };

  appendPageLinks(studentList);
  showPage(studentList, 1);
});
