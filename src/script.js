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

let isElementSelected = false;

const selectDropdownElementHandler = (event) => {
	event.target.classList.toggle("dropdown-content_element");
	input.value = event.target.textContent;
	isElementSelected = true;
	button.classList.remove("dropdown-btn-open");
	button.classList.add("dropdown-btn-close");
};

/* Change List Element background, when you point mouse at it */

const highlightDropdownElementHandler = (event) => {
	event.target.classList.add("dropdown-content_element");
};

/* Add List Elements in Markup */

const dropdownElementHandler = () => {
	const fragment = document.createDocumentFragment();

	dropdownList.forEach(function (dropDownItem) {
		const listElement = document.createElement("li");
		listElement.textContent = dropDownItem.label;
		isElementSelected = false;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);

		fragment.appendChild(listElement);
	});

	getDropdownContent().appendChild(fragment);
};

window.addEventListener("load", dropdownElementHandler);

/* UserCase 1: Open List */

const freeSpaceHandler = () => {
	document.querySelector(".dropdown-content").style.display = "block";
	document.querySelector(".dropdown-content").style.visibility = "hidden";
	
	const dropdownListHeight = document.querySelector(".dropdown-content").offsetHeight;

	document.querySelector(".dropdown-content").style.display = "";
	document.querySelector(".dropdown-content").style.visibility = "";

	const windowHeight = document.documentElement.clientHeight;
	const bottomOffset =  input.getBoundingClientRect().bottom;
	const bottomSpace = windowHeight - bottomOffset;
	const isEnoughSpace = bottomSpace >= dropdownListHeight;

	if(isEnoughSpace) {
		getDropdownContent().classList.toggle("show-dropdown-content");
	}
	else {
		getDropdownContent().classList.toggle("show-dropdown-content-up");
	}
};

const openDropdownHandler = () => {
	if (button.classList.contains("dropdown-btn-close")) {
		button.classList.remove("dropdown-btn-close");
		button.classList.add("dropdown-btn-open");
		input.focus();
		input.value = "";
		searchDropdownElementHandler();
		return;
	} else if (button.classList.contains("dropdown-btn-open")) {
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
		getDropdownContent().classList.remove("show-dropdown-content");
		getDropdownContent().classList.remove("show-dropdown-content-up");
	}
};

button.addEventListener("click", openDropdownHandler);
input.addEventListener("click", openDropdownHandler);

/* UserCase 2: Filter List Elements */

const searchDropdownElementHandler = () => {
	input.focus();
	const inputValue = input.value.toLowerCase();

	const list = document.createElement("ul");
	list.setAttribute("id", "list");

	dropdownList.filter(function (dropDownItem) {
		return (
			dropDownItem.label.toLowerCase().indexOf(inputValue) == 0 ||
      inputValue == ""
		);
	}).forEach( function(element) {
		const listElement = document.createElement("li");
		listElement.textContent = element.label;
		isElementSelected = false;
		listElement.addEventListener("click", selectDropdownElementHandler);
		listElement.addEventListener("mouseover", highlightDropdownElementHandler);
		list.appendChild(listElement);
	});

	list.classList.add("dropdown-content");

	getDropdownContent().parentNode.replaceChild(list, getDropdownContent());

	freeSpaceHandler();
};

input.addEventListener("input", searchDropdownElementHandler);

/* UserCase 4: Close dropdown without choosing List Element*/

const closeDropdownHandler = (event) => {
	const target = event.target;
	if (target !== input && target !== button) {
		getDropdownContent().classList.remove("show-dropdown-content");
		getDropdownContent().classList.remove("show-dropdown-content-up");
		button.classList.remove("dropdown-btn-open");
		button.classList.add("dropdown-btn-close");
	
		if (!isElementSelected) {
			input.value = "";
		}
	}
};

document.addEventListener("click", closeDropdownHandler);
document.addEventListener("scroll", closeDropdownHandler);
window.addEventListener("resize", closeDropdownHandler);
