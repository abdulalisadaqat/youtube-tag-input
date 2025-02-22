const copyAll = document.querySelector(".copy-all"),
	deleteAll = document.querySelector(".delete-all"),
	tagInput = document.querySelector(".tags input");

let tags = [];

// copy all tags to clipboard
copyAll.onclick = () => {
	if (tags.length > 0) {
		navigator.clipboard.writeText(tags.join(","));
	}
};

// delete all tags
deleteAll.onclick = () => {
	document.querySelectorAll(".tag").forEach((tag) => tag.remove());
	tags = [];
	tagInput.focus();
};

// remove single tag
function removeTag(el, val) {
	el.parentElement.remove();
	tags = tags.filter((tag) => tag != val);
}

// store tags in array
tagInput.onkeyup = (el) => {
	if (el.key == "Enter" || el.key == ",") {
		let tagInput_val = tagInput.value.replace(/\s+/g, " ");
		if (tagInput_val.length > 1 && !tags.includes(tagInput_val)) {
			tags.push(...tagInput_val.split(",").filter((tag) => tag != ""));
			tags = [...new Set(tags)];
			createTag();
		}
		tagInput.value = "";
	}
};

// create tag in html
function createTag() {
	document.querySelectorAll(".tag").forEach((tag) => tag.remove());
	for (t of tags) {
		let tag = `<span class="tag">${t} <button class="remove-tag" onclick="removeTag(this,'${t}')">&times;</button></span>`;
		tagInput.insertAdjacentHTML("beforebegin", tag);
	}
}
