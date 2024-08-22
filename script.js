let currentLang = "zh";
let data, i18n;

document.addEventListener("DOMContentLoaded", () => {
    loadData("data.json", loadBlockchainOptions);
    changeLanguage(currentLang);
    updateCopyrightYear();
});

function updateCopyrightYear() {
    const currentYear = new Date().getFullYear();
    let copyrightText;
    if (currentYear > 2024) {
        copyrightText = `&copy; 2024-${currentYear} earthjasonlin. All rights reserved.`;
    } else {
        copyrightText = `&copy; 2024 earthjasonlin. All rights reserved.`;
    }
    document.querySelector("footer p").innerHTML = copyrightText;
}

function loadData(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            callback();
        })
        .catch((error) => console.error("Error loading JSON:", error));
}

function loadI18n(url, callback) {
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
            i18n = json;
            callback();
        })
        .catch((error) => console.error("Error loading i18n JSON:", error));
}

function loadBlockchainOptions() {
    const blockchainSelect = document.getElementById("blockchain");
    blockchainSelect.innerHTML = "";

    for (const key in data) {
        const option = document.createElement("option");
        option.value = key;
        option.textContent = i18n[key];
        blockchainSelect.appendChild(option);
    }
    updateDonationInfo();
}

function changeLanguage(lang) {
    loadI18n(`i18n/${lang}.json`, () => {
        document.getElementById("thank-you").innerHTML = i18n.thankYou;
        document.getElementById("title-text").textContent = i18n.title;
        document.getElementById("copyAddress").textContent = i18n.copyAddress;
        loadBlockchainOptions();
    });
}

function updateDonationInfo() {
    const blockchain = document.getElementById("blockchain").value;
    document.getElementById("qr-code").src = data[blockchain].qr;
    document.getElementById("address").textContent = data[blockchain].address;
    document.getElementById("blockchain-icon").src = data[blockchain].icon;
}

function copyAddress() {
    const address = document.getElementById("address").textContent;
    navigator.clipboard.writeText(address).then(() => {
        alert(i18n.copyAddressSuccess);
    });
}
