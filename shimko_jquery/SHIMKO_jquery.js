$(document).ready(function() {

// работа с селекторами
    $("h1").css("fontSize", "20px");
    $(".paragraph").css("color", "red");
    $(".anchor").css({
        "backgroundColor": "#F3F2F1",
        "textDecoration": "none",
        "color": "red"
    });
    $("form *").prop("disabled", true);

// РАБОТА С DOM
    $("a").prepend("↗");
    $("a").attr("target", "_blank")
    $("a").each(function () {
        $(this).attr("href", function (index, value) {
            let protocol = value.substring(0, value.indexOf(':'));
            if (protocol === 'http') {
                let href = value.substring(value.indexOf(':'), value.length);
                return protocol + 's' + href;
            }
        });
    });
    //сброс 1 и 2 пункта
    $('body').append('<button id = "cancel">Cancel</button>');
    $("#cancel").click(function () {

        $("a").each(function () {
            $(this).text(function (index, text) {
                if (text.substr(0, 1) === '↗') {
                    return text.substring(1, text.length);
                }
            });
        });

        $("form *").prop("disabled", false);
    });

    // ЭФФЕКТЫ JQUERY
    $("#fadeOut").click(() => {
        $("#fadeOut").parent().siblings().children().fadeOut();
    });

    $("#fadeIn").click(() => {
        $("#fadeIn").parent().siblings().children().fadeIn();
    });

    $("#fadeTo").click(() => {
        $("#fadeTo").parent().siblings().children().fadeTo(1000, 0.4, "linear", () => alert('Fade To succeded!'));
    });

    $("#slideDown").click(() => {
        $("#slideDown").parent().siblings().children().slideDown();
    });

    $("#slideToggle").click(() => {
        $("#slideToggle").parent().siblings().children().slideToggle();
    });

    $("#toggle").click(() => {
        $("#toggle").parent().siblings().children().toggle();
    });
});

// AJAX Запросы в JQUERY
$("#ajax").click(() => {
    $.ajax({
        url: "https://inxaoc.github.io/example/ajax-1.html"
    }).done((e) => {
        let pageContent = document.createElement("div");
        pageContent.innerHTML = e;
        $("body").append(pageContent);
    });
});
//обновление страницы
$.ajax({
    url: "https://inxaoc.github.io/example/ajax.json"
}).done((e) => {
    let req = Object.assign({}, e);
    console.log(req);
    $("body").append(createList(req));
});

