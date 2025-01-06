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

function displayVoltage(){
  const response = fetch (`http://127.0.0.1:8000/battery`)
  const data = response.json();
  console.log(data)
}


let percentage = 50;
let batteryval = Math.floor(percentage/10);

for(let i = 0; i < batteryval; i++){
  const battery = document.querySelectorAll('.unit')
  battery[i].style.backgroundColor="#2dcc6f"

}



let sky = document.querySelector(".data1");
sky.style.backgroundImage =
  "linear-gradient(-20deg, #d76112 5%,#d3834d 14%, #8ab8ba 15%,#38a3ab 80%)";


