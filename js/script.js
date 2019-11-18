// Global variables for list elements and items to be displayed per page

const studentList = document.querySelectorAll(".student-item");
const ItemsPerPage = 10;

// Function to find the list item indexes of a given page then hides other indexes

function showPage(list, pageNumber) {
  const startIndex = pageNumber * ItemsPerPage - ItemsPerPage;
  const endIndex = pageNumber * ItemsPerPage;
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < endIndex) {
      list[i].style.display = "";
    } else {
      list[i].style.display = "none";
    }
  }
}

// Function to generate, append, and add functionality to the pagination buttons.

function appendPageLinks(list) {
  const numberOfPages = list.length / ItemsPerPage;
  const pageDiv = document.querySelector(".page");
  const div = document.createElement("div");
  const ul = document.createElement("ul");

  div.className = "pagination";
  div.appendChild(ul);

  for (i = 0; i < numberOfPages; i++) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = i + 1;
    li.appendChild(a);
    ul.appendChild(li);
  }

  pageDiv.appendChild(div);
}

// Remember to delete the comments that came with this file, and replace them with your own code comments.
