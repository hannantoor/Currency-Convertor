const currencyBg = document.getElementById("currencyBg");

const currencies = [
    { symbol: "$", color: "#FFD700" },
    { symbol: "€", color: "#579cff" },
    { symbol: "£", color: "#b68cff" },
    { symbol: "¥", color: "#f4c16b" },
    { symbol: "₨", color: "#53c98b" },
    { symbol: "₹", color: "#ffad65" },
    { symbol: "₽", color: "#80cfa0" },
    { symbol: "₺", color: "#ff7777" },
    { symbol: "₩", color: "#8ec8df" },
    { symbol: "฿", color: "#e6b96b" },
    { symbol: "₫", color: "#ef8e83" },
    { symbol: "₱", color: "#70c8ff" },
    { symbol: "د.إ", color: "#d8b46a" },
    { symbol: "﷼", color: "#6dd5a0" }
];

if (currencyBg) {
    for (let i = 0; i < 30; i++) {
        const symbol = document.createElement("span");

        const currency =
            currencies[Math.floor(Math.random() * currencies.length)];

        symbol.className = "currency-symbol";
        symbol.textContent = currency.symbol;

        // Har symbol ka apna original color
        symbol.style.color = currency.color;

        // Matching color ka glow
        symbol.style.textShadow = `
            0 0 5px ${currency.color},
            0 0 12px ${currency.color},
            0 0 22px ${currency.color},
            0 0 35px ${currency.color}
        `;

        symbol.style.filter = "brightness(0.85) saturate(1.4)";
        symbol.style.opacity = "0.95";

        symbol.style.left = Math.random() * 100 + "%";

        symbol.style.fontSize =
            32 + Math.random() * 30 + "px";

        symbol.style.fontWeight = "900";

        symbol.style.animationDuration =
            12 + Math.random() * 15 + "s";

        symbol.style.animationDelay =
            -Math.random() * 25 + "s";

        currencyBg.appendChild(symbol);
    }
}

const BASE_URL=  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select")

for (let select of dropdowns) {
    for(let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected="selected"
        }else  if (select.name === "to" && currCode === "PKR") {
            newOption.selected="selected"
        }

        select.append(newOption)

        select.addEventListener("change", (evt)=>{
            updateFlag(evt.target)
        })
    }
} 

const updateFlag =(element) => {
    let currCode=element.value
    let countryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img")
    img.src=newSrc
}



const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const btn = document.querySelector("form button");
const msg = document.querySelector(".msg");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const from = fromCurr.value.toLowerCase();
  const to = toCurr.value.toLowerCase();
  const url = `${BASE_URL}/${from}.json`;

  let response = await fetch(url);
  let data = await response.json();
  let rate = data[from][to];
  let finalAmount = (amtVal * rate).toFixed(2);

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
});



