import browser from "webextension-polyfill";
import { getFade, getPhase, getRank } from "./utils";

document.addEventListener("click", (event: MouseEvent) => {
  if (event.target instanceof Element && event.target.classList.contains("inventory_item_link")) {
    call();
  }
});

const interval = setInterval(() => {
  if (document.getElementById("iteminfo1_item_name")?.innerText !== "") {
    clearInterval(interval);
    call();
  }
}, 100);

function call() {
  if (document.getElementById("inventory_link_730")?.classList.contains("active")) {
    const item0 = document.getElementById("iteminfo0");
    const item1 = document.getElementById("iteminfo1");
    if (item0?.style.zIndex === "1") {
      details(item0);
    } else if (item1) {
      details(item1);
    }
  }
}

function details(item: HTMLElement) {
  const description = item.getElementsByClassName("item_desc_description")[0];
  const text = description.children[3];
  const actions = description.children[4];
  if (actions.firstChild === null) return;
  const inspect = (<HTMLLinkElement> actions.firstChild).href;

  browser.runtime.sendMessage({ url: "https://api.csgofloat.com/?url=" + inspect }).then((res) => {
    if (res.iteminfo.paintseed !== 0) {
      const float = document.createElement("div");
      float.innerText = "Float: " + res.iteminfo.floatvalue + getRank(res.iteminfo.low_rank, res.iteminfo.high_rank);
      text.insertBefore(float, text.children[1]);
      const seed = document.createElement("div");
      seed.innerText = "Seed: " + res.iteminfo.paintseed +  getPhase(res.iteminfo.item_name, res.iteminfo.paintindex) + getFade(res.iteminfo.item_name, res.iteminfo.weapon_type, res.iteminfo.paintseed);
      text.insertBefore(seed, text.children[2]);
    }
  });

  const screenshot = <HTMLLinkElement> actions.firstChild.cloneNode(true);
  (<HTMLElement> screenshot.firstChild).innerText = "Inspect in Browser...";
  screenshot.href = "javascript:;";
  screenshot.addEventListener("click", () => {
    window.open("https://market.swap.gg/screenshot?inspectLink=" + inspect, "_blank");
  });
  actions.appendChild(document.createElement("br"));
  actions.appendChild(screenshot);

  const server = <HTMLLinkElement> actions.firstChild.cloneNode(true);
  (<HTMLElement> server.firstChild).innerText = "Inspect on Server...";
  server.href = "javascript:;";
  server.addEventListener("click", () => {
    browser.runtime.sendMessage({ url: "https://api.csgoskins.gg/tests/link", options: {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        link: inspect
      })
    }}).then((res) => {
      if (res.needs_to_connect) {
        location.href = res.connect_to_url;
      }
    });
  });
  actions.appendChild(document.createElement("br"));
  actions.appendChild(server);
}