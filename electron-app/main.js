const { app, BrowserWindow } = require("electron");
const path = require("path");
const net = require("net"); // ใช้สำหรับเช็คว่า localhost:3000 พร้อมใช้งานหรือยัง

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
    },
  });
}

function loadReactApp() {
  mainWindow.loadURL("http://localhost:3000");
}

// ฟังก์ชันเพื่อเช็คว่าพอร์ต 3000 พร้อมใช้งานหรือยัง
function waitForReact() {
  const port = 3000;
  const interval = setInterval(() => {
    const server = net.createConnection({ port }, () => {
      clearInterval(interval); // ถ้าเชื่อมต่อได้ ให้หยุดการเช็ค
      server.end();
      loadReactApp(); // เมื่อ React พร้อม ให้โหลดหน้าเว็บใน Electron
    });

    server.on("error", () => {
      // ถ้าไม่เชื่อมต่อได้ จะเช็คใหม่ใน 1 วินาที
      console.log("Waiting for React server to start...");
    });
  }, 1000); // เช็คทุก 1 วินาที
}

app.whenReady().then(() => {
  createWindow();
  waitForReact(); // รอให้ React พร้อมก่อน

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
