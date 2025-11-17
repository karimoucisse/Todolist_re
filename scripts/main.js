const typeList = ["TODO", "DOING", "DONE"];
const searchInput = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const listContainer = document.getElementById("todo-list")


let ItemList = [];

searchButton.addEventListener("click", () => addItem(searchInput.value.trim()))

const displayItemToModify = (list) => {
	const deleteIcon = `<i class="fa-solid fa-xmark cursor-pointer text-md text-red-500" id="delete"
		onclick="onClickClose(${list.id})"></i>`
	const valideIcon = `<i class="fa-solid fa-circle-check cursor-pointer text-md text-green-800"
	onclick="onClickModify(${list.id})"></i>`;

	return `
		<div id="${list.id}" class="flex justify-between bg-[#1c2930] h-14 items-center w-[600px] rounded-sm px-4">
			<input class="text-black outline-none py-1 px-2" type="text" value="${list.name}">
			<select name="type" id="type" class="text-[#1c2930] outline-none px-2 bg-white">
				<option value="Todo ${list.type == "TODO" && "selected"}">Todo</option>
				<option value="Doing ${list.type == "DOING" && "selected"}">Doing</option>
				<option value="Done ${list.type == "DONE" && "selected"}">Done</option>
			</select>
			<div class="flex gap-5 text-white justify-end">
				${valideIcon}
				${deleteIcon}
			</div>
		</div>
	`
}

let getItem = (list) =>
{
	const deleteIcon = `<i class="fa-regular fa-trash-can cursor-pointer text-md text-red-500" id="delete"
		onclick="onClickRemove(${list.id})"></i>`
	const modifyIcon = `<i class="fa-solid fa-pen cursor-pointer text-md" onclick="onClickModify(${list.id})"></i>`
	return `
		<div id="${list.id}"class="flex bg-[#1c2930] text-white h-14 items-center w-[600px] rounded-sm px-4">
			<p class="w-[400px]">${list.name}</p>
			<div class="flex justify-between w-full">
				<p>${list.type}</p>
				<div class="flex gap-5">
					${modifyIcon}
					${deleteIcon}
				</div>
			</div>
		</div>
	`
}

const displayList = () => {
	searchInput.value = "";
	listContainer.innerHTML = "";
	ItemList.map((item, index) => {
		item.id = index;
		listContainer.innerHTML += item.toModify ? displayItemToModify(item) : getItem(item);
	})
}


const onClickRemove = (index) => {
	ItemList.splice(index, 1);
	displayList();
}

const onClickModify = (index) => {
	if(ItemList[index].toModify)
		changeInfo(ItemList[index]);
	ItemList[index].toModify = !ItemList[index].toModify;
	displayList();
}

const onClickClose = (index) => {
	ItemList[index].toModify = !ItemList[index].toModify;
	displayList();
}

const changeInfo = (item) => {
	const child = listContainer.children[item.id];
	const select = child.querySelector("div select");
	const nameInput = child.querySelector("input");

	item.type =  (select.value.split(" "))[0];
	item.name = !nameInput.value ? item.name : nameInput.value;
}

const addItem = (name) => {
	let list = {
		name,
		type: typeList[0],
		id: ItemList.length,
		toModify: false
	}
	ItemList.push(list);
	if(!name)
		return;
	displayList();
}



