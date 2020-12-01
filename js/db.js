const dbPromised = idb.open("football", 1, function (upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("teams")) {
    const teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id",
    });
    teamsObjectStore.createIndex("name", "name", { unique: false });
  }
});

function saveTeam(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil disimpan.");
    })
    .catch(function () {
      console.log("Team gagal disimpan.");
    });
}

function deleteTeam(team) {
  dbPromised
    .then(function (db) {
      const tx = db.transaction("teams", "readwrite");
      const store = tx.objectStore("teams");
      console.log(team);
      store.delete(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil dihapus.");
    })
    .catch(function () {
      console.log("Team gagal dihapus.");
    });
}

function getAllTeam() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readonly");
        const store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.get(id);
      })
      .then(function (team) {
        resolve(team);
      });
  });
}

export { saveTeam, deleteTeam, getAllTeam, getById };
