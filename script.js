const dropdownOpen = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("dropdown-cntnt");
const inputDestination = document.getElementById("input-destination");
const changeButton = document.getElementsByClassName("dropdown_button");

// UC 1: Open List
dropdownOpen.addEventListener("click", function () {
  changeButton.className = "dropdown-btn-open";
  dropdownContent.classList.toggle("show-dropdown-content");
  inputDestination.focus();
});

inputDestination.addEventListener("click", function () {
  dropdownContent.classList.toggle("show-dropdown-content");
  inputDestination.value = "";
});

// function myFunction() {
//     document.getElementById("dropdown-content").classList.toggle("show-dropdown-content");
//     document.getElementById("input-destination").focus();
// }
