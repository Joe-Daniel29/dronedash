const buttons = document.querySelectorAll(".outerButton");
let armtoggle = false;

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    button.style.flexDirection =
      button.style.flexDirection === "row" ? "row-reverse" : "row";
  });
}

function setArm(){
  console.log("Arm clicked");
  armtoggle = !armtoggle;
  const res = fetch(`http://127.0.0.1:8000/lightstate/${armtoggle}`, {
    method: "POST",
  });
}


let sky = document.querySelector(".data1");
sky.style.backgroundImage =
  "linear-gradient(0deg, #d76112 5%,#d3834d 54%, #8ab8ba 55%,#38a3ab 80%)";


