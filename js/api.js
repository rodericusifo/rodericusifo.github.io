import { getAllTeam, getById } from "./db.js";

const base_url = "https://api.football-data.org/v2/competitions/2001/";
const base_url1 = "https://api.football-data.org/v2/teams/";

const btnSave = document.getElementById("save");
const btnDelete = document.getElementById("delete");

// Blok kode yang akan di panggil jika fetch berhasil
const status = function (response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    console.log(response);
    return Promise.resolve(response);
  }
};

// Blok kode untuk memparsing json menjadi array JavaScript
const json = function (response) {
  return response.json();
};

// Blok kode untuk meng-handle kesalahan di blok catch
const error = function (error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
};

const fetchApi = function (url) {
  return fetch(url, {
    headers: {
      "X-Auth-Token": "112fbbbdea6f4d1f908c8f695e025041",
    },
  });
};

const dataStandings = function (data) {
  let standingsHTML = "";
  data.standings.forEach(function (standings) {
    standingsHTML += `
    <div class="card">
      <div class="card-content">
        <h5 class="center">
          <b>${standings.group} - ${standings.type}</b>
        </h5>

        <br>

        <table class="responsive-table highlight centered">
          <thead>
            <tr>
                <th>Position</th>
                <th>Team Name</th>
                <th>Played Games</th>
                <th>Won</th>
                <th>Draw</th>
                <th>Lost</th>
                <th>Points</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>${standings.table[0].position}</td>
              <td><a href="/teamById.html?id=${standings.table[0].team.id}">${standings.table[0].team.name}</a></td>
              <td>${standings.table[0].playedGames}</td>
              <td>${standings.table[0].won}</td>
              <td>${standings.table[0].draw}</td>
              <td>${standings.table[0].lost}</td>
              <td>${standings.table[0].points}</td>
            </tr>
            <tr>
              <td>${standings.table[1].position}</td>
              <td><a href="/teamById.html?id=${standings.table[1].team.id}">${standings.table[1].team.name}</a></td>
              <td>${standings.table[1].playedGames}</td>
              <td>${standings.table[1].won}</td>
              <td>${standings.table[1].draw}</td>
              <td>${standings.table[1].lost}</td>
              <td>${standings.table[1].points}</td>
            </tr>
            <tr>
              <td>${standings.table[2].position}</td>
              <td><a href="/teamById.html?id=${standings.table[2].team.id}">${standings.table[2].team.name}</a></td>
              <td>${standings.table[2].playedGames}</td>
              <td>${standings.table[2].won}</td>
              <td>${standings.table[2].draw}</td>
              <td>${standings.table[2].lost}</td>
              <td>${standings.table[2].points}</td>
            </tr>
            <tr>
              <td>${standings.table[3].position}</td>
              <td><a href="/teamById.html?id=${standings.table[3].team.id}">${standings.table[3].team.name}</a></td>
              <td>${standings.table[3].playedGames}</td>
              <td>${standings.table[3].won}</td>
              <td>${standings.table[3].draw}</td>
              <td>${standings.table[3].lost}</td>
              <td>${standings.table[3].points}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #standings
  document.getElementById("standings").innerHTML = standingsHTML;
  hideLoader();
};

const dataTeams = function (data) {
  let teamsHTML = "";
  data.teams.forEach(function (teams) {
    teamsHTML += `
              <div class="card">
                <a href="/teamById.html?id=${teams.id}"><img class="responsive-img center-block" src="${teams.crestUrl}" alt="${teams.name} logo"></a>
                <p><b>${teams.name}</b></p>
                <p><i>"${teams.shortName}"</i></p>
              </div>
    `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #teams
  document.getElementById("teams").innerHTML = teamsHTML;
  hideLoader();
};

const dataTeamById = function (data) {
  return new Promise(function (resolve, reject) {
    let teamHTML = "";
    teamHTML += `
    <div class="card" id="wrapper">
  `;
    teamHTML += `
        <div class="team">
          <div class="center" id="team-title">
            <h3>${data.name}</h3>
            <p><i>"${data.shortName}"</i></p>
          </div>
          <div class="center" id="team-logo">
            <img class="responsive-img" src="${data.crestUrl}">
          </div>
          <div id="team-info">
            <h5>Team Information</h5>
            <div>Area : ${data.area.name}</div>
            <div>Address : ${data.address}</div>
            <div>Phone : ${data.phone}</div>
            <div>Website : <a href="${data.website}">${data.website}</a></div>
            <div>Email : ${data.email}</div>
            <div>Founded : ${data.founded}</div>
            <div>Club Colors : ${data.clubColors}</div>
            <div>Venue : ${data.venue}</div>
            <br>
          </div>
        </div>
  `;
    teamHTML += `
        <div class="team1">
          <h5>Active Competitions</h5>
        </div>
  `;
    data.activeCompetitions.forEach(function (activeCompetitions) {
      teamHTML += `
        <div class="team1">
          <div><b>${activeCompetitions.name}</b></div>
          <div>Area : ${activeCompetitions.area.name}</div>
          <div>Code : ${activeCompetitions.code}</div>
          <div>Plan : ${activeCompetitions.plan}</div>
          <div>Last Updated : ${activeCompetitions.lastUpdated}</div>
          <br>
        </div>
  `;
    });
    teamHTML += `
        <div class="team1">
          <h5>Squad</h5>
        </div>
  `;
    data.squad.forEach(function (squad) {
      teamHTML += `
        <div class="team1">
          <div><b>${squad.name}</b></div>
          <div>Position : ${squad.position}</div>
          <div>Date of Birth : ${squad.dateOfBirth}</div>
          <div>Country of Birth : ${squad.countryOfBirth}</div>
          <div>Nationality : ${squad.nationality}</div>
          <div>Shirt Number : ${squad.shirtNumber}</div>
          <div>Role : ${squad.role}</div>
          <br>
        </div>
    `;
    });
    teamHTML += `
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamHTML;
    hideLoader();
    btnSave.classList.remove("scale-out");
    btnSave.classList.add("scale-in");
    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    resolve(data);
  });
};

const dataSavedTeams = function (teams) {
  console.log(teams);
  // Menyusun komponen teams([team's data][team's data1] [...]) secara dinamis
  let teamsHTML = "";
  teams.forEach(function (teams) {
    teamsHTML += `
          <div class="card">
            <a href="/teamById.html?id=${teams.id}&saved=true"><img class="responsive-img center-block" src="${teams.crestUrl}" alt="${teams.name} logo"></a>
            <p><b>${teams.name}</b></p>
            <p><i>"${teams.shortName}"</i></p>
          </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #teams-saved
    document.getElementById("teams-saved").innerHTML = teamsHTML;
    hideLoader();
  });
};

const dataSavedTeamById = function (team) {
  return new Promise(function (resolve, reject) {
    console.log(team);
    let teamHTML = "";
    teamHTML += `
            <div class="card" id="wrapper">
    `;
    teamHTML += `
                <div class="team">
                  <div class="center" id="team-title">
                    <h3>${team.name}</h3>
                    <p><i>"${team.shortName}"</i></p>
                  </div>
                  <div class="center" id="team-logo">
                    <img class="responsive-img" src="${team.crestUrl}">
                  </div>
                  <div id="team-info">
                    <h5>Team Information</h5>
                    <div>Area : ${team.area.name}</div>
                    <div>Address : ${team.address}</div>
                    <div>Phone : ${team.phone}</div>
                    <div>Website : <a href="${team.website}">${team.website}</a></div>
                    <div>Email : ${team.email}</div>
                    <div>Founded : ${team.founded}</div>
                    <div>Club Colors : ${team.clubColors}</div>
                    <div>Venue : ${team.venue}</div>
                    <br>
                  </div>
                </div>
    `;
    teamHTML += `
                <div class="team1">
                  <h5>Active Competitions</h5>
                </div>
    `;
    team.activeCompetitions.forEach(function (activeCompetitions) {
      teamHTML += `
                <div class="team1">
                  <div><b>${activeCompetitions.name}</b></div>
                  <div>Area : ${activeCompetitions.area.name}</div>
                  <div>Code : ${activeCompetitions.code}</div>
                  <div>Plan : ${activeCompetitions.plan}</div>
                  <div>Last Updated : ${activeCompetitions.lastUpdated}</div>
                  <br>
                </div>
    `;
    });
    teamHTML += `
                <div class="team1">
                  <h5>Squad</h5>
                </div>
    `;
    team.squad.forEach(function (squad) {
      teamHTML += `
                <div class="team1">
                  <div><b>${squad.name}</b></div>
                  <div>Position : ${squad.position}</div>
                  <div>Date of Birth : ${squad.dateOfBirth}</div>
                  <div>Country of Birth : ${squad.countryOfBirth}</div>
                  <div>Nationality : ${squad.nationality}</div>
                  <div>Shirt Number : ${squad.shirtNumber}</div>
                  <div>Role : ${squad.role}</div>
                  <br>
                </div>
    `;
    });
    teamHTML += `
            </div>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #body-content
    document.getElementById("body-content").innerHTML = teamHTML;
    hideLoader();
    btnDelete.classList.remove("scale-out");
    btnDelete.classList.add("scale-in");
    // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
    resolve(team.id);
  });
};

const showLoader = function () {
  document.getElementById("loader").style.display = "block";
  const loader = `<div class="center">
                  <div class="preloader-wrapper big active">
                    <div class="spinner-layer spinner-blue">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div>
                      <div class="gap-patch">
                        <div class="circle"></div>
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>

                    <div class="spinner-layer spinner-red">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div>
                      <div class="gap-patch">
                        <div class="circle"></div>
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>

                    <div class="spinner-layer spinner-yellow">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div>
                      <div class="gap-patch">
                        <div class="circle"></div>
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>

                    <div class="spinner-layer spinner-green">
                      <div class="circle-clipper left">
                        <div class="circle"></div>
                      </div>
                      <div class="gap-patch">
                        <div class="circle"></div>
                      </div>
                      <div class="circle-clipper right">
                        <div class="circle"></div>
                      </div>
                    </div>
                  </div>
              </div>`;
  document.getElementById("loader").innerHTML = loader;
};

const hideLoader = function () {
  document.getElementById("loader").style.display = "none";
};

// Blok kode untuk melakukan request data json
const getStandings = function () {
  showLoader();
  if ("caches" in window) {
    caches
      .match(base_url + "standings")
      .then(function (response) {
        if (response) {
          response.json().then(dataStandings);
        }
      })
      .catch(error);
  }

  fetchApi(base_url + "standings")
    .then(status)
    .then(json)
    .then(dataStandings)
    .catch(error);
};

const getTeams = function () {
  showLoader();
  if ("caches" in window) {
    caches
      .match(base_url + "teams")
      .then(function (response) {
        if (response) {
          response.json().then(dataTeams);
        }
      })
      .catch(error);
  }

  fetchApi(base_url + "teams")
    .then(status)
    .then(json)
    .then(dataTeams)
    .catch(error);
};

const getTeamById = function () {
  showLoader();
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    if ("caches" in window) {
      caches
        .match(base_url1 + idParam)
        .then(function (response) {
          if (response) {
            response
              .json()
              .then(dataTeamById)
              .then(function (data) {
                resolve(data);
              });
          }
        })
        .catch(error);
    }

    fetchApi(base_url1 + idParam)
      .then(status)
      .then(json)
      .then(dataTeamById)
      .then(function (data) {
        resolve(data);
      })
      .catch(error);
  });
};

// Blok kode untuk mengambil data yang disimpan di IndexedDB
const getSavedTeams = function () {
  showLoader();
  getAllTeam().then(dataSavedTeams).catch(error);
};

const getSavedTeamById = function () {
  showLoader();
  return new Promise(function (resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = Number(urlParams.get("id"));

    getById(idParam)
      .then(dataSavedTeamById)
      .then(function (teamId) {
        resolve(teamId);
      })
      .catch(error);
  });
};

export { getStandings, getTeams, getTeamById, getSavedTeams, getSavedTeamById };
