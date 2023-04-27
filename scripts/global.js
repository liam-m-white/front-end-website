/**
 * This file contains JavaScript that is required on every page.
 * Contents:
 * 1. Collapse Menu
 * 2. Toggle Display
 * 3. Open Image
 * 4. Form
 * 5. Load Skills
 * 6. Control Buttons
 * 7. Load modules
 */

//-------------------------------------------------------------------------
//COLLAPSE MENU

const collapseMenuBtn = document.getElementById("headerCollapse");
const headerItems = document.getElementById("headerItems");

collapseMenuBtn.addEventListener("click", function() {
  this.classList.toggle("change");
  headerItems.classList.toggle("open");
})

//-------------------------------------------------------------------------
//TOGGLE DISPLAY

const body = document.getElementsByTagName("body")[0];
const toggleDisplayBtn = document.getElementById("toggleDisplay");
const delayTransition = document.querySelector(".delay-transition");
const toggleDisplayControl = document.getElementById("toggleDisplayControl");

setDisplay();

document.addEventListener("DOMContentLoaded", function() {
  delayTransition.classList.remove("delay-transition");
}, false);

toggleDisplayBtn.addEventListener("click", function() {
  toggleDisplay();
  setDisplay();
})

toggleDisplayControl.addEventListener("click", function() {
  toggleDisplay();
  setDisplay();
})

/**
 * Switches the "display" value in session storage.
 * If there is no "display" value, set it to dark.
 */
function toggleDisplay() {
  switch(sessionStorage.getItem("display")) {
    case "dark":
      sessionStorage.setItem("display", "light");
      break;
    case "light":
      sessionStorage.setItem("display", "dark");
      break;
    default:
      sessionStorage.setItem("display", "dark");
  }
}

/**
 * Reads the "display" value in session storage.
 * Sets the page styles to match the "display" value (dark or light).
 */
function setDisplay() {

  if (sessionStorage.getItem("display") == "light") {
    body.classList.remove("dark");
    toggleDisplayBtn.innerText = "Dark Theme";
    toggleDisplayControl.innerHTML = "&#9790;";
  } else if (sessionStorage.getItem("display") == "dark") {
    body.classList.add("dark");
    toggleDisplayBtn.innerText = "Light Theme";
    toggleDisplayControl.innerHTML = "&#9788;";
  } else {
    toggleDisplayBtn.innerText = "Dark Theme";
    toggleDisplayControl.innerHTML = "&#9790;";
  }
}

//-------------------------------------------------------------------------
//OPEN IMAGE

const images = document.getElementsByTagName("img");
const imageDialog = document.getElementById("imageDialog");
const imageDialogClose = document.getElementById("imageDialogClose");
for(let i = 0;i < images.length; i++)
{
  //ignore if it's a link
  if(images[i].parentElement.nodeName != 'A') {
    images[i].addEventListener("click", function(){openImage(images[i])});
  }
}

if(imageDialogClose)
  imageDialogClose.addEventListener("click", closeImage);

function openImage (imageElement) {
  //Create image if it doesn't exist
  if (!document.getElementById("imageDialogImg")) {
    const image = document.createElement('img');
    image.id = "imageDialogImg";
    image.src = imageElement.src;
    imageDialogClose.parentNode.insertBefore(image, imageDialogClose.nextSibling);
  } else {
    document.getElementById("imageDialogImg").src = imageElement.src;
  }

  imageDialog.showModal();
}

function closeImage() {
  imageDialog.close();
}
//-------------------------------------------------------------------------
//FORM

const form = document.getElementsByTagName('form')[0];
const formConfirmation = document.getElementById('formConfirmation');

if(form) {
  form.addEventListener('submit', function(event){
    //stop page reload
    event.preventDefault();

    //get form data
    const data = new FormData(form);

    //create JSON object
    const entry = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      organisation: data.get("organisation"),
      message: data.get("message")
    }

    console.log(entry);

    //show success message
    formConfirmation.removeAttribute('hidden');
    formConfirmation.setAttribute('aria-focus', true);

    window.alert("Submission Sent. Thanks " + data.get("firstName") + ", I will respond when I can.");

  });
}
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
//LOAD SKILLS

const skillContainer = document.getElementById('skillContainer');

if (skillContainer) {
  fetch('../data/skills.json')
    .then((response) => response.json())
    .then((json) => {
      json.skills.forEach(function(skill){
        skillContainer.appendChild(createSkillFromJSON(skill));
      });
    });
}

function createSkillFromJSON(data) {
  const skillWrapper = document.createElement("div");
  const skillIcon = document.createElement("div");
  const skillImg = document.createElement("img");
  const skillTextBox = document.createElement("div");
  const skillTitle = document.createElement("h3");
  const skillParagraph = document.createElement("p");

  skillWrapper.classList.add("skill-wrapper");
  skillIcon.classList.add("skill-icon");
  skillTextBox.classList.add("skill-text-box");
  skillTitle.classList.add("skill-title");

  skillTitle.textContent = data.title;
  skillImg.src = data.imageSrc;
  skillImg.alt= data.imageAlt;
  skillParagraph.textContent = data.text;

  skillIcon.appendChild(skillImg);
  skillTextBox.appendChild(skillTitle);
  skillTextBox.appendChild(skillParagraph);
  skillWrapper.appendChild(skillIcon);
  skillWrapper.appendChild(skillTextBox);

  return skillWrapper;
}
//-------------------------------------------------------------------------

//-------------------------------------------------------------------------
//CONTROL BUTTONS
const topButton = document.getElementById("toTop");

topButton.addEventListener('click', function(){
  window.scrollTo({top: 0, behavior: 'smooth'});
})

window.onscroll = function() {
  if (document.documentElement.scrollTop > 25) {
    topButton.classList.remove("hidden");
    toggleDisplayControl.classList.remove("hidden");
  } else {
    topButton.classList.add("hidden");
    toggleDisplayControl.classList.add("hidden");
  }
};

//-------------------------------------------------------------------------
//MODULES

const yearOneList = document.getElementById('yearOneList');
const yearTwoList = document.getElementById('yearTwoList');
const yearThreeList = document.getElementById('yearThreeList');

if (yearOneList) {
  fetch('../data/modules.json')
    .then((response) => response.json())
    .then((json) => {
      json.yearOneModules.forEach(function(module){
        yearOneList.appendChild(createModuleFromJSON(module));
      });
    });
}

if (yearTwoList) {
  fetch('../data/modules.json')
    .then((response) => response.json())
    .then((json) => {
      json.yearTwoModules.forEach(function(module){
        yearTwoList.appendChild(createModuleFromJSON(module));
      });
    });
}

if (yearThreeList) {
  fetch('../data/modules.json')
    .then((response) => response.json())
    .then((json) => {
      json.yearThreeModules.forEach(function(module){
        yearThreeList.appendChild(createModuleFromJSON(module));
      });
    });
}

function createModuleFromJSON(module) {

  let value;

  switch(true) {
    case (module.result >= 70):
      value = "first";
      break;
    case (module.result >= 60):
      value = "two-one";
      break;
    case (module.result >= 50):
      value = "two-two";
      break;
    case (module.result >= 40):
      value = "third";
      break;
    case (module.result < 40):
      value = "fail";
    default:
      value = "pending";
  }

  const listItem = document.createElement('li');
  const topLeft = document.createElement('span');
  const topRight = document.createElement('span');
  const bottomLeft = document.createElement('span');
  const bottomRight = document.createElement('span');

  listItem.classList.add('grid-item');
  topLeft.classList.add('top-left');
  topRight.classList.add('pill', 'top-right', value);
  bottomLeft.classList.add('bottom-left');
  bottomRight.classList.add('bottom-right');

  topLeft.textContent = `${module.title}`;
  topRight.textContent = module.result;
  bottomLeft.textContent = `Term ${module.term}`;
  bottomRight.textContent = `Credits: ${module.credits}`;

  listItem.append(topLeft, topRight, bottomLeft, bottomRight);

  return listItem;
}