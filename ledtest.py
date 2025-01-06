import serial

ser = serial.Serial('COM8', 9600)
print(ser.name)

while True:
    val = input("Enter state: ")
    ser.write(val.encode())

