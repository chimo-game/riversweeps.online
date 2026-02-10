function changeColor() {
    var colors = [
        "#DB2B39", "#F06449", "#5BC3EB", "#540D6E", "#EE4266", "#7E2E84",
        "#1B4079", "#FF2ECC", "#38369A", "#00A6FB", "#F02D3A", "#29335C",
        "#C42021", "#3C1742", "#020887", "#003E1F", "#390099", "#BA1F33"
    ];
    var color = colors[Math.floor(Math.random() * colors.length)];
    document.querySelector("#homepage_hero_party").style.color = color;
}

setInterval(changeColor, 1000);