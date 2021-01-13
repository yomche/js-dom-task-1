const button = document.getElementById("dropdown-btn");
const dropdownContent = document.getElementById("list");
const input = document.getElementById("input-destination");

/* Array of Objects */

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

/* Add List Elements in Markup */

function dropdownElementHandler() {
	let fragment = document.createDocumentFragment();

	dropdownList.forEach(function (dropDownItem) {
		let listElement = document.createElement("li");
		listElement.textContent = dropDownItem.label;
		fragment.appendChild(listElement);
	});

	dropdownContent.appendChild(fragment);
}

window.addEventListener("load", dropdownElementHandler);

/* Change arrow icon on close / open Dropdown*/

function changeDropdownIconHandler() {
	if (button.classList.contains("dropdown-btn-open")) {
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	} else if (button.classList.contains("dropdown-btn-close")) {
		button.classList.remove("dropdown-btn-close");
		button.classList.add("dropdown-btn-open");
	}
}

/* UserCase 1: Open List */

function openDropdownHandler() {
	// dropdownContent.classList.remove("hide-dropdown-content");
	dropdownContent.classList.toggle("show-dropdown-content");
	input.focus();
	input.value = "";
}

button.addEventListener("click", openDropdownHandler);
button.addEventListener("click", changeDropdownIconHandler);

input.addEventListener("click", openDropdownHandler);
input.addEventListener("click", changeDropdownIconHandler);

/* UserCase 2: Filter List Elements */

function searchDropdownElementHandler() {
	input.focus();
	// dropdownContent.classList.remove("hide-dropdown-content");
	dropdownContent.classList.add("show-dropdown-content");
	const inputValue = input.value.toLowerCase();

	let matchingElements = [];
	dropdownList.forEach(function (dropDownItem) {
		if (dropDownItem.label.toLowerCase().indexOf(inputValue) == 0) {
			matchingElements.push(dropDownItem);
		}
	});

	if (matchingElements.length > 0) {
		let listElement = document.getElementsByTagName("li");
		while (listElement.length > 0) {
			let removedElement = listElement[0];
			let removedElementParent = removedElement.parentNode;
			removedElementParent.removeChild(removedElement);
		}

		let fragment = document.createDocumentFragment();

		matchingElements.forEach(function (matchingElementsItem) {
			let listElement = document.createElement("li");
			listElement.textContent = matchingElementsItem.label;
			fragment.appendChild(listElement);
		});

		dropdownContent.appendChild(fragment);
	}
}

input.addEventListener("input", searchDropdownElementHandler);

/* UNDONE UserCase 4: Close dropdown without choosing List Element*/

function closeDropdownHandler(event) {
	if (!input.contains(event.target) && !button.contains(event.target)) {
		dropdownContent.classList.remove("show-dropdown-content");
		// dropdownContent.classList.add("hide-dropdown-content");
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	}
}

window.addEventListener("click", closeDropdownHandler);

/* UNDONE UserCase 3: Choose from Dropdown List */

let listElement = document.getElementsByTagName("li");
function selectDropdownElementHandler(event) {
	for (let i = 0; i < listElement.length; i++) {
		if (listElement[i].contains(event.target)) {
			input.value = listElement[i].value;
		}
	}
}

listElement.addEventListener("click", selectDropdownElementHandler);
