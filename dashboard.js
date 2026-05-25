// SIDEBAR ACTIVE EFFECT

const menuItems = document.querySelectorAll(".sidebar ul li");

menuItems.forEach(item => {

  item.addEventListener("click", () => {

    menuItems.forEach(i => i.classList.remove("active"));

    item.classList.add("active");

  });

});


// LIVE DATE & TIME

const topbar = document.querySelector(".topbar");

const timeBox = document.createElement("div");

timeBox.classList.add("time-box");

topbar.appendChild(timeBox);

function updateTime() {

  const now = new Date();

  const options = {
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit"
  };

  timeBox.innerHTML = `
    <span>${now.toLocaleDateString()}</span>
    <br>
    <small>${now.toLocaleTimeString([], options)}</small>
  `;

}

updateTime();

setInterval(updateTime, 1000);


// CARD ANIMATION ON LOAD

const cards = document.querySelectorAll(".card-box");

cards.forEach((card, index) => {

  card.style.opacity = "0";

  card.style.transform = "translateY(40px)";

  setTimeout(() => {

    card.style.transition = "0.6s ease";

    card.style.opacity = "1";

    card.style.transform = "translateY(0)";

  }, index * 200);

});


// TABLE ROW HOVER EFFECT

const rows = document.querySelectorAll("tbody tr");

rows.forEach(row => {

  row.addEventListener("mouseenter", () => {

    row.style.transform = "scale(1.01)";
    row.style.transition = "0.2s";

  });

  row.addEventListener("mouseleave", () => {

    row.style.transform = "scale(1)";

  });

});


// ADD STUDENT BUTTON DEMO

const addBtn = document.querySelector(".table-header button");

addBtn.addEventListener("click", () => {

  alert("Add Student feature will connect to database later.");

});


// LOGOUT BUTTON

const logoutBtn = document.querySelector(".logout");

logoutBtn.addEventListener("click", () => {

  const confirmLogout = confirm("Are you sure you want to logout?");

  if(confirmLogout){

    window.location.href = "admin.html";

  }

});


// WELCOME MESSAGE ANIMATION

const heading = document.querySelector(".topbar h1");

heading.style.opacity = "0";
heading.style.transform = "translateX(-40px)";

setTimeout(() => {

  heading.style.transition = "0.8s ease";

  heading.style.opacity = "1";

  heading.style.transform = "translateX(0px)";

}, 300);

