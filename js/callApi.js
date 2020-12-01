import { getSavedTeamById, getTeamById } from "./api.js";
import { saveTeam, deleteTeam } from "./db.js";

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const isFromSaved = urlParams.get("saved");

  const btnSave = document.getElementById("save");
  const btnDelete = document.getElementById("delete");

  let itemDelete;
  let itemSave;

  if (isFromSaved) {
    // Hide button save jika dimuat dari indexed db
    btnSave.style.display = "none";

    // ambil Saved Team lalu tampilkan
    itemDelete = getSavedTeamById();
  } else {
    // Hide button delete jika tidak dimuat dari indexed db
    btnDelete.style.display = "none";

    // ambil Team lalu tampilkan
    itemSave = getTeamById();
  }

  btnSave.onclick = function () {
    console.log("Tombol Save Icon di klik.");
    itemSave.then(function (team) {
      saveTeam(team);
    });
    btnSave.classList.remove("scale-in");
    btnSave.classList.add("scale-out");
  };

  btnDelete.onclick = function () {
    console.log("Tombol Delete Icon di klik.");
    itemDelete.then(function (team) {
      deleteTeam(team);
    });
    btnDelete.classList.remove("scale-in");
    btnDelete.classList.add("scale-out");
  };
});
