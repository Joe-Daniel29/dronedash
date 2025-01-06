from fastapi import FastAPI
import serial


# ser = serial.Serial('COM8', 9600)
# print(ser.name)

app = FastAPI()

voltage = 15 ## (13.2-16.8) [for a 4s Lipo]
percentage = ((v-13.2)/(16.8-13.2))*100




@app.post("/lightstate/{state}")
async def state(state : bool):
    val = int(state)
    print(val)
    # ser.write(val.encode())
    return "done"


# while True:
#     val = input("Enter state: ")
#     ser.write(val.encode())


# ser.close()