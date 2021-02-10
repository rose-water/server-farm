const express    = require('express');
const app        = express();
const path       = require('path');
const PORT       = 3000;
const SerialPort = require('serialport');
const Readline   = require('@serialport/parser-readline');
const sPort      = new SerialPort('/dev/cu.usbmodem201', { baudRate: 9600 }); // DOUBLE CHECK
const parser     = sPort.pipe(new Readline({ delimiter: '\n' }));



// --------------------------------------------------------
// SERIAL PORT 
// --------------------------------------------------------
// Tells us when the serial port is open and available to read from.
// Make sure serial monitor is not open with Arduino IDE
sPort.on("open", () => {
  console.log('Serial port open.');
});


// --------------------------------------------------------
// Our parser streams the incoming serial data
parser.on('data', data => {
  if (parseInt(data) == 1) {
    console.log("BUTTON PRESSED");
  } else {
    console.log("NOT PRESSED");
  }
});


// --------------------------------------------------
app.use(express.static('public'));


// --------------------------------------------------
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
});


// --------------------------------------------------
app.listen(PORT, () => {
  console.log(`listening on PORT ${ PORT }`);
});