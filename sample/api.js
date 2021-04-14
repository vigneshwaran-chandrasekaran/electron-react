const electron = require("electron");
const postman = require("postman-request");

const { app, BrowserWindow, Tray, screen, Menu } = electron;
let mainWindow = null;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    center: true,
  });
  console.log("__dirname", __dirname);
  mainWindow.loadURL(`file://${__dirname}/api.html`);
});

app.whenReady().then(() => {
  const { net } = require("electron");
  const request = net.request("https://www.nseindia.com/api/market-turnover");

  postman(
    "https://www.nseindia.com/api/market-turnover",
    function (error, response, body) {
      console.log("postman error:", error); // Print the error if one occurred
      console.log("postman statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("postman body:", body); // Print the HTML for the Google homepage.
    }
  );

  request.on("response", (response) => {
    console.log(`STATUS: ${response.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`);
    response.on("data", (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    response.on("end", () => {
      console.log("No more data in response.");
    });
  });
  request.end();

  // const requests = net.request({
  //   method: "GET",
  //   protocol: "https:",
  //   hostname: "https://www.nseindia.com/api/market-turnover",
  //   path: "/get",
  //   redirect: "follow",
  // });
  // requests.on("response", (response) => {
  //   console.log(`STATUS: ${response.statusCode}`);
  //   console.log(`HEADERS: ${JSON.stringify(response.headers)}`);

  //   response.on("data", (chunk) => {
  //     console.log(`BODY: ${chunk}`);
  //   });
  // });
  // requests.on("finish", () => {
  //   console.log("Request is Finished");
  // });
});
