from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import serial


ser = serial.Serial('COM8', 9600)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use specific origins in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# voltage = 15 ## (13.2-16.8) [for a 4s Lipo]
def calculate_percentage(voltage: float) -> float:
    if 13.2 <= voltage <= 16.8:  # Ensure voltage is within range
        return ((voltage - 13.2) / (16.8 - 13.2)) * 100
    return -1


@app.get("/battery/")
async def get_battery_percentage():
    current_voltage = 16
    percentage = calculate_percentage(current_voltage)
    return {"percentage": percentage}

@app.post("/lightstate/{state}")
async def state(state : bool):
    val = "0" if state else "1"
    ser.write(val.encode())
    return "done"



