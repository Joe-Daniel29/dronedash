const buttons = document.querySelectorAll(".outerButton");
let armtoggle = false;

for (let button of buttons) {
  button.addEventListener("click", (e) => {
    button.style.flexDirection =
      button.style.flexDirection === "row" ? "row-reverse" : "row";
  });
}

function setArm() {
  console.log("Arm clicked");
  armtoggle = !armtoggle;
  const res = fetch(`http://127.0.0.1:8000/lightstate/${armtoggle}`, {
    method: "POST",
  });
  logMessage(`Arm toggled to ${armtoggle ? "OFF" : "ON"}`);
}
async function displayVoltage() {
  try {
    const response = await fetch("http://127.0.0.1:8000/battery/");
    const data = await response.json();

    if (data.percentage >= 0) {
      updateBatteryBars(data.percentage);
    } else {
      console.error("Invalid battery percentage received from backend");
    }
  } catch (err) {
    console.error("Error fetching battery percentage:", err);
  }
}

function updateBatteryBars(percentage) {
  const batteryUnits = document.querySelectorAll(".unit");
  const activeBars = Math.floor(percentage / 10);

  batteryUnits.forEach((unit, index) => {
    unit.style.backgroundColor = index < activeBars ? "#2dcc6f" : "#ccc";
  });

  console.log(`Battery percentage: ${percentage}%`);
}

// Fetch battery percentage on page load
document.addEventListener("DOMContentLoaded", displayVoltage);

let sky = document.querySelector(".data1");
sky.style.backgroundImage =
  "linear-gradient(0deg, #d76112 5%,#d3834d 14%, #8ab8ba 15%,#38a3ab 80%)";

setInterval(displayVoltage, 1000); // Fetch every 5 seconds





function logMessage(message) {
  const logMessages = document.querySelector(".logMessages");

  // Create a new log entry
  const logEntry = document.createElement("div");
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;

  // Append the log entry to the container
  logMessages.appendChild(logEntry);

  // Ensure the latest log is visible
  logMessages.scrollTop = logMessages.scrollHeight;
}