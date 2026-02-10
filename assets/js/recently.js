var claimedAmounts = ["$20", "$25", "$20", "$25"];
var partyIcons = ["🎉", "🥳", "🎉", "🥳", "🎉", "🥳"];
var intervalId;

function addClaimedAmount() {
    var claimedList = document.querySelector(".claimed-list");
    var claimedItem = document.createElement("div");
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    claimedItem.className = "claimed-item";
    claimedItem.style.color = "#" + randomColor;
    var claimedIcon = document.createElement("span");
    claimedIcon.className = "claimed-icon";
    claimedIcon.textContent = partyIcons[Math.floor(Math.random() * partyIcons.length)];
    claimedItem.appendChild(claimedIcon);
    claimedItem.textContent += " Someone claimed free play " + claimedAmounts[Math.floor(Math.random() * claimedAmounts.length)] + " just now!";
    claimedList.prepend(claimedItem);
    setTimeout(function () {
        var opacity = 1;
        var interval = setInterval(function () {
            opacity -= 0.1;
            claimedItem.style.opacity = opacity;
            if (opacity <= 0) {
                clearInterval(interval);
                claimedList.removeChild(claimedItem);
            }
        }, 200);
    }, 9000);
}

intervalId = setInterval(addClaimedAmount, 8000);