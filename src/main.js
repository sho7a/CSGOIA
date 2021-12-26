document.addEventListener("click", (event) => {
    if (document.getElementById("inventory_link_730").classList.contains("active")) {
        if (event.target.classList.contains("inventory_item_link")) {
            const item0 = document.getElementById("iteminfo0");
            const item1 = document.getElementById("iteminfo1");
            if (item0.style.zIndex == 1)  {
                details(item0);
            } else {
                details(item1);
            }
        }
    }
});

function details(item) {
    const description = item.getElementsByClassName("item_desc_description")[0];
    const text = description.children[3];
    const actions = description.children[4];

    fetch("https://api.csgofloat.com/?url=" + actions.firstChild.href)
    .then((res) => res.json())
    .then((res) => {
        console.log(res)
        const float = document.createElement("div");
        float.innerText = "Float: " + res.iteminfo.floatvalue;
        text.insertBefore(float, text.children[1]);
        const seed = document.createElement("div");
        seed.innerText = "Seed: " + res.iteminfo.paintseed;
        text.insertBefore(seed, text.children[2]);
    });

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
            }),
        })
        .then((res) => res.json())
        .then((res) => {
            if (res.needs_to_connect) {
                location.href = res.connect_to_url;
            }
        });
    });
    actions.appendChild(game);
}