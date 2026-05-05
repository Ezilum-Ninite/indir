const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// POST isteğini karşılayan route
app.post("/generate", (req, res) => {
  const { os, programs } = req.body;
  let output = "";

  programs.forEach(p => {
    let ext = os === "windows" ? "bat" : "sh";
    const scriptPath = path.join(__dirname, "../installers", os, `${p.toLowerCase()}.${ext}`);
    if (fs.existsSync(scriptPath)) {
      output += fs.readFileSync(scriptPath, "utf8") + "\n";
    }
  });

  res.type("text/plain").send(output);
});

app.listen(3000, () => console.log("Server çalışıyor: http://localhost:3000"));
