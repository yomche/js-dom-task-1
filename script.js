const button = document.getElementById("dropdown-btn");

/* Function for getting up-to-date list */
const getDropdownContent = () => document.getElementById("list");

const input = document.getElementById("input-destination");

/* Array of Objects */

const dropdownList = [
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

let selectedElement = false;

const selectDropdownElementHandler = (event) => {
	event.target.classList.toggle("dropdown-content_element");
	input.value = event.target.textContent;
	selectedElement = true;
	button.classList.remove("dropdown-btn-open");
	button.classList.add("dropdown-btn-close");
};

/* Change List Element background, when you point mouse at it */

const highlightDropdownElementHandler = (event) => {
	event.target.classList.add("dropdown-content_element");
};

/* Add List Elements in Markup */

const dropdownElementHandler = () => {
	let fragment = document.createDocumentFragment();

	dropdownList.forEach(function (dropDownItem) {
		let listElement = document.createElement("li");
		listElement.textContent = dropDownItem.label;
		selectedElement = false;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);

		fragment.appendChild(listElement);
	});

	getDropdownContent().appendChild(fragment);
};

window.addEventListener("load", dropdownElementHandler);

/* UserCase 1: Open List */

const openDropdownHandler = () => {
	getDropdownContent().classList.toggle("show-dropdown-content");
	if (button.classList.contains("dropdown-btn-close")) {
		button.classList.remove("dropdown-btn-close");
		button.classList.add("dropdown-btn-open");
	} else if (button.classList.contains("dropdown-btn-open")) {
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	}
	input.focus();
	input.value = "";
	searchDropdownElementHandler();
};

button.addEventListener("click", openDropdownHandler);
input.addEventListener("click", openDropdownHandler);


/* UserCase 2: Filter List Elements */

const searchDropdownElementHandler = () => {
	input.focus();
	// getDropdownContent().classList.add("show-dropdown-content");
	const inputValue = input.value.toLowerCase();

	let matchingElements = dropdownList.filter(function (dropDownItem) {
		return (
			dropDownItem.label.toLowerCase().indexOf(inputValue) == 0 ||
      inputValue == ""
		);
	});

	let list = document.createElement("ul");
	list.setAttribute("id", "list");

	for (let i = 0; i < matchingElements.length; i++) {
		let listElement = document.createElement("li");
		listElement.textContent = matchingElements[i].label;
		selectedElement = false;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);
		list.appendChild(listElement);
	}

	list.classList.add("dropdown-content", "show-dropdown-content");

	getDropdownContent().parentNode.replaceChild(list, getDropdownContent());
};

input.addEventListener("input", searchDropdownElementHandler);

/* UserCase 4: Close dropdown without choosing List Element*/

const closeDropdown = () => {
	getDropdownContent().classList.remove("show-dropdown-content");
	button.classList.remove("dropdown-btn-open");
	button.classList.add("dropdown-btn-close");

	if (!selectedElement) {
		input.value="";
	}
};

const closeDropdownHandler = (event) => {
	if (
		!input.contains(event.target) &&
    !button.contains(event.target) &&
    !getDropdownContent().contains(event.target)
	) {
		closeDropdown();
	}
};

document.addEventListener("click", closeDropdownHandler);

window.addEventListener("scroll", closeDropdown);
window.addEventListener("resize", closeDropdown);