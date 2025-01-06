from fastapi import FastAPI
import serial


ser = serial.Serial('COM8', 9600)
print(ser.name)

app = FastAPI()

voltage = 15 ## (13.2-16.8) [for a 4s Lipo]
def calculate_percentage(voltage: float) -> float:
    if 13.2 <= voltage <= 16.8:  # Ensure voltage is within range
        return ((voltage - 13.2) / (16.8 - 13.2)) * 100
    return -1


@app.get("/battery/")
async def sendvoltage(voltage: float):
    percentage = calculate_percentage(voltage)
    return {"percentage": percentage}


@app.post("/lightstate/{state}")
async def state(state : bool):
    val = "0" if state else "1"
    ser.write(val.encode())
    return "done"

# while True:
#     val = input("Enter state: ")
#     ser.write(val.encode())


