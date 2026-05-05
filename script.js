const programList = {
  windows: ["Chrome", "Spotify", "VSCode"],
  macos: ["Chrome", "Slack", "VSCode"],
  linux: ["Firefox", "LibreOffice", "GIMP"]
};

function nextStep() {
  const os = document.getElementById("osSelect").value;
  const listDiv = document.getElementById("programList");
  listDiv.innerHTML = "";
  programList[os].forEach(p => {
    listDiv.innerHTML += `<input type="checkbox" value="${p}">${p}<br>`;
  });
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.remove("hidden");
}

function generateInstaller() {
  const os = document.getElementById("osSelect").value;
  const selected = Array.from(document.querySelectorAll("#programList input:checked"))
                        .map(el => el.value);
  fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ os, programs: selected })
  })
  .then(res => res.text())
  .then(data => {
    document.getElementById("output").textContent = data;
  });
}
