const button = document.getElementById("dropdown-btn");
const getDropdownContent = () => document.getElementById("list");
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

/* UserCase 3: Choose from Dropdown List */

const selectDropdownElementHandler = (event) => {
	event.target.classList.add("dropdown-content_element");
	input.value = event.target.textContent;
	getDropdownContent().classList.remove("show-dropdown-content");

};

const highlightDropdownElementHandler = (event) => {
	event.target.classList.add("dropdown-content_element");
};

/* Add List Elements in Markup */

let dropdownElementHandler = () => {
	let fragment = document.createDocumentFragment();

	dropdownList.forEach(function (dropDownItem) {
		let listElement = document.createElement("li");
		listElement.textContent = dropDownItem.label;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);
		fragment.appendChild(listElement);
	});

	getDropdownContent().appendChild(fragment);
};

window.addEventListener("load", dropdownElementHandler);

/* Change arrow icon on close / open Dropdown*/

let changeDropdownIconHandler = () => {
	if (button.classList.contains("dropdown-btn-open")) {
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	} else if (button.classList.contains("dropdown-btn-close")) {
		button.classList.remove("dropdown-btn-close");
		button.classList.add("dropdown-btn-open");
	}
};

/* UserCase 1: Open List */

let openDropdownHandler = () => {
	getDropdownContent().classList.toggle("show-dropdown-content");
	input.focus();
	input.value = "";
	searchDropdownElementHandler();
};

button.addEventListener("click", openDropdownHandler);
button.addEventListener("click", changeDropdownIconHandler);

input.addEventListener("click", openDropdownHandler);
input.addEventListener("click", changeDropdownIconHandler);

/* UserCase 2: Filter List Elements */

let searchDropdownElementHandler = () => {
	input.focus();
	getDropdownContent().classList.add("show-dropdown-content");
	const inputValue = input.value.toLowerCase();

	let matchingElements = dropdownList.filter(function (dropDownItem) {
		return (
			dropDownItem.label.toLowerCase().indexOf(inputValue) == 0 ||
      inputValue == ""
		);
	});

	let list = document.createElement("ul");
	list.setAttribute("id", "list");

	let fragment = document.createDocumentFragment();

	for (let i = 0; i < matchingElements.length; i++) {
		let listElement = document.createElement("li");
		listElement.textContent = matchingElements[i].label;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);
		fragment.appendChild(listElement);
	}

	list.classList.add("dropdown-content", "show-dropdown-content");
	list.appendChild(fragment);

	getDropdownContent().parentNode.replaceChild(list, getDropdownContent());
};

input.addEventListener("input", searchDropdownElementHandler);

/* UNDONE UserCase 4: Close dropdown without choosing List Element*/

let closeDropdownHandler = (event) => {
	if (
		!input.contains(event.target) &&
    !button.contains(event.target) &&
    !getDropdownContent().contains(event.target)
	) {
		getDropdownContent().classList.remove("show-dropdown-content");
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	}
};

document.addEventListener("click", closeDropdownHandler);
