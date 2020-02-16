//Position .repere
function getPosition(el) {
    var xPos = 0;
    var yPos = 0;

    while (el) {
        if (el.tagName == "BODY") {
            var yScroll = el.scrollTop || document.documentElement.scrollTop;
            yPos += (el.offsetTop - yScroll + el.clientTop);
        }
        else {
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        y: yPos
    };
}

window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);

//Effets dynamiques
function updatePosition() {
    var myElement = document.querySelector(".repere");
    var position = getPosition(myElement);

    $(window).scroll(function () {
        scroll_effect();
    })

    function scroll_effect() {

        var paddingtop = 0;

        paddingtop += parseFloat($("header").css("height"));
        paddingtop -= parseFloat($(".repere").css("height"));

        var rapport = Math.round((1 - (position.y / paddingtop)) * 1000) / 1000;

        if (rapport <= 1) {
            var scroll = $(window).scrollTop();
            $("header").css("background-position", "center " + (scroll * 0.3) + "px");
        }

        if (rapport >= 1) {
            $(".menu").css("right", "8%");

            $(".logo").css("width", "15%");
            $(".logo").css("top", "-1.8%");
            $(".logo").css("left", "1%");

            $(".blackfont").css("position", "fixed");
            $(".blackfont").css("height", "10%");
            $(".blackfont").css("opacity", "1");
        }

        else {
            $(".menu").css("right", (3 + rapport * 5) + "%");

            $(".logo").css("width", (25 - rapport * 10) + "%");
            $(".logo").css("top", (rapport * (-1.8)) + "%");
            $(".logo").css("left", (rapport * 1) + "%");

            $(".blackfont").css("position", "relative");
            $(".blackfont").css("height", "100%");
            $(".blackfont").css("opacity", (rapport * 1));
        }
    }
}