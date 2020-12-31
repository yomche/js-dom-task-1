const button = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("list");
const input = document.getElementById("input-destination");

function dropdownElementHandler() {
  let fragment = new DocumentFragment();

  let dropdownList = [
    {
      label: "Bawcomville",
      id: 0,
    },
    {
      label: "Rushford",
      id: 1,
    },
    {
      label: "Bayview",
      id: 2,
    },
    {
      label: "Heywood",
      id: 3,
    },
    {
      label: "Westbrook",
      id: 4,
    },
    {
      label: "Pacifica",
      id: 5,
    },
  ];
  
  for (let i = 0; i < dropdownList.length; ++i) {
    let listElement = document.createElement("li");
    listElement.textContent = dropdownList[i].label;
    fragment.appendChild(listElement);
  }
  dropdownContent.appendChild(fragment);
}

window.addEventListener("load", dropdownElementHandler);

/* UserCase 1: Open List */
function openDropdownHandler() {
  dropdownContent.classList.toggle("show-dropdown-content");
  input.focus();
  input.value = "";
}

button.addEventListener("click", openDropdownHandler);
input.addEventListener("click", openDropdownHandler);

// /* UserCase 2: Filter List Elements */

// function searchDropdownElementHandler() {
//     const inputValue = input.value;
//     const listElement
// }

input.addEventListener("input", searchDropdownElementHandler);