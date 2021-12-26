import { getFade, getPhase } from "./utils";

window.addEventListener("load", () => {
  const interval = setInterval(() => {
    if (document.getElementById("iteminfo1_item_name").innerText !== "") {
      clearInterval(interval);
      call();
    }
  }, 100);
});

document.addEventListener("click", (event: MouseEvent) => {
  if (event.target instanceof Element && event.target.classList.contains("inventory_item_link")) {
    call();
  }
});

function call() {
  if (document.getElementById("inventory_link_730").classList.contains("active")) {
    const item0 = document.getElementById("iteminfo0");
    const item1 = document.getElementById("iteminfo1");
    if (item0.style.zIndex === "1") {
      details(item0);
    } else {
      details(item1);
    }
  }
}

function details(item) {
  const description = item.getElementsByClassName("item_desc_description")[0];
  const text = description.children[3];
  const actions = description.children[4];

  fetch("https://api.csgofloat.com/?url=" + actions.firstChild.href).then((res) => res.json()).then((res) => {
    const float = document.createElement("div");
    float.innerText = "Float: " + res.iteminfo.floatvalue;
    text.insertBefore(float, text.children[1]);
    const seed = document.createElement("div");
    seed.innerText = "Seed: " + res.iteminfo.paintseed +  getPhase(res.iteminfo.item_name, res.iteminfo.paintindex) + getFade(res.iteminfo.item_name, res.iteminfo.weapon_type, res.iteminfo.paintseed);
    text.insertBefore(seed, text.children[2]);
  });

  const browser = actions.firstChild.cloneNode(true);
  browser.firstChild.innerText = "Inspect in Browser...";
  browser.href = "#";
  browser.addEventListener("click", (event: MouseEvent) => {
    event.preventDefault();
    fetch("https://cs.deals/API/IScreenshots/QueueScreenshots/v1", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        links: [
          actions.firstChild.href
        ]
      })
    }).then((res) => res.json()).then((res) => {
      const id = res.response.requests[Object.keys(res.response.requests)[0]].requestId;
      const interval = setInterval(() => {
        fetch("https://cs.deals/API/IScreenshots/GetByRequestIDs/v1", {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            requestIds: [
              id
            ]
          })
        }).then((res) => res.json()).then((res) => {
          const r = res.response[id];
          if (r.status === 2) {
            window.open("https://cs.deals/csgoScreenshot/" + window.btoa(r.images[0].id) + ".jpg", "_blank");
            clearInterval(interval);
          }
        });
      }, 1000);
    });
  });
  actions.appendChild(document.createElement("br"));
  actions.appendChild(browser);

  const game = actions.firstChild.cloneNode(true);
  game.firstChild.innerText = "Inspect on Server...";
  game.href = "#";
  game.addEventListener("click", (event) => {
    event.preventDefault();
    fetch("https://api.csgoskins.gg/tests/link", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        link: actions.firstChild.href
      })
    }).then((res) => res.json()).then((res) => {
      if (res.needs_to_connect) {
        location.href = res.connect_to_url;
      }
    });
  });
  actions.appendChild(document.createElement("br"));
  actions.appendChild(game);
}