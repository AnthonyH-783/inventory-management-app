
function onNavItemSelect(e){
const listItem = e.target.closest("li");
if (
  !listItem ||
  listItem.tagName.toLowerCase() !== "li" ||
  listItem.classList.contains("selected-item")
) return;

    // Undoing previous selection
    const prev = listItem.closest("ul").querySelector(".selected-item");
    if(prev){
        prev.classList.remove("selected-item");
        prev.querySelector("svg").setAttribute("stroke", "#373737");
        prev.querySelector("span").classList.replace("dm-sans-500", "dm-sans-400");
    }
    // Applying selection styling to new item
    listItem.classList.add("selected-item");
    const svg = listItem.querySelector("svg");
    const text = listItem.querySelector("span");
    svg.setAttribute("stroke", "#27500A");
    text.classList.replace("dm-sans-400", "dm-sans-500");
}

export {onNavItemSelect};


