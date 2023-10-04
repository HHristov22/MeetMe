function reloadHelloUser() {
  let fullname = "";

  let isLogin = localStorage.getItem("login");
  if (isLogin == "1") fullname = localStorage.getItem("userFullname");
  if (fullname != "") fullname = ", " + fullname;
  console.log("|" + fullname + "|");
  //document.getElementById("hello_user").innerText = "fullname";
  document.getElementById("output").innerHTML = fullname;
}

function logOut() {
  localStorage.setItem("login", "0");
  localStorage.setItem("role", "");
  reloadHelloUser();
}

function visibilityLoggedButtons() {
  // document.getElementById("f").style.display = "none";
  let isLogin = localStorage.getItem("login");
  if (isLogin == "1")
    document.getElementById("logged-buttons").style.display = "none";
  else document.getElementById("logged-buttons").style.display = "block";
}

function visibilityNavButtons() {
  // document.getElementById("f").style.display = "none";
  let isLogin = localStorage.getItem("login");
  if (isLogin == "1")
    document.getElementById("nav-buttons").style.display = "block";
  else document.getElementById("nav-buttons").style.display = "none";
}

reloadHelloUser();
visibilityLoggedButtons();
visibilityNavButtons();

const title = document.querySelector(".title");
let sentence = title.innerText;
sentence = "Join MeetMe for virtual meetings with colleagues and educators.";
let result = [];
for (let i = 0; i < sentence.length; i++) {
  let char = sentence[i];
  if (char == " ") {
    //ha ha
    //empty character
    result.push("‏‏‎ ‎");
  } else {
    result.push(char);
  }
}
title.innerHTML = result
  .map((ltr, idx) => {
    return `<span class="ltr" style="--delay: ${idx * 60}ms">${ltr}</span>`;
  })
  .join("");

// console.log(title);

const ltrs = document.querySelectorAll(".title .ltr");

ltrs.forEach((ltr) => {
  ltr.addEventListener("animationend", () => {
    ltr.classList.add("show");
  });
});
