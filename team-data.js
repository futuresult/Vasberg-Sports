
(async function () {
  "use strict";

  const DATA_URL = "data/site-data.json";

  const TEAM_PAGES = {
    "narda.html": "narda",
    "handball.html": "handball-vasberg",
    "basketball.html": "vasberg-basketball"
  };

  function getCurrentPage() {
    const file = window.location.pathname.split("/").pop().toLowerCase();
    return file || "index.html";
  }

  function setText(selector, value) {
    if (!value) return;

    document.querySelectorAll(selector).forEach(element => {
      element.textContent = value;
    });
  }

  function setImage(selector, src, alt) {
    if (!src) return;

    document.querySelectorAll(selector).forEach(element => {
      if (element.tagName === "IMG") {
        element.src = src;
        element.alt = alt || "Csapatlogó";
      } else {
        element.style.backgroundImage = `url("${src}")`;
      }
    });
  }

  function renderTeam(team) {
    if (!team) return;

    document.title = `${team.name} | Vasberg Sports`;

    setText("[data-team-name]", team.name);
    setText("[data-team-sport]", team.sport);
    setText("[data-team-description]", team.description);

    setImage("[data-team-logo]", team.logo, team.name);

    const logoElements = document.querySelectorAll(
      "#team-logo, .team-logo, .team-profile-logo"
    );

    logoElements.forEach(element => {
      if (team.logo && element.tagName === "IMG") {
        element.src = team.logo;
        element.alt = team.name + " logó";
      }
    });
  }

  function renderTeamCards(teams) {
    const container = document.querySelector("[data-teams-list]");

    if (!container) return;

    container.innerHTML = "";

    teams.forEach(team => {
      const card = document.createElement("a");
      card.className = "team-card";

      const page = {
        "narda": "narda.html",
        "handball-vasberg": "handball.html",
        "vasberg-basketball": "basketball.html"
      }[team.id];

      card.href = page || "#";

      if (team.logo) {
        const image = document.createElement("img");
        image.src = team.logo;
        image.alt = team.name + " logó";
        image.className = "team-card-logo";
        card.appendChild(image);
      }

      const title = document.createElement("h3");
      title.textContent = team.name || "";
      card.appendChild(title);

      const sport = document.createElement("p");
      sport.textContent = team.sport || "";
      card.appendChild(sport);

      const description = document.createElement("p");
      description.textContent = team.description || "";
      card.appendChild(description);

      container.appendChild(card);
    });
  }

  try {
    const response = await fetch(DATA_URL, {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Nem sikerült betölteni a csapatadatokat.");
    }

    const data = await response.json();
    const teams = Array.isArray(data.teams) ? data.teams : [];

    const currentPage = getCurrentPage();
    const teamId = TEAM_PAGES[currentPage];

    if (teamId) {
      const team = teams.find(item => item.id === teamId);
      renderTeam(team);
    } else {
      renderTeamCards(teams);
    }

    document.dispatchEvent(
      new CustomEvent("vasberg:data-loaded", {
        detail: data
      })
    );

  } catch (error) {
    console.error("Vasberg Sports:", error);
  }
})();
