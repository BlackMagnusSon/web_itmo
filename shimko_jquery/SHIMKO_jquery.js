//Проверка на готовность объектной модели
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
    $("a").prepend("↗");//.prepend добавляет контент внутрь выбранных элементов ПЕРЕД существующим контентом
    $("a").attr("target", "_blank")//.attr позволяет получить содержимое атрибута и позволяет установить содержимое
                                    //в данной ситуации чтобы ссылки открывались в новой вкладке
    $("a").each(function () { //итерация по объектам
        /*
        Получаем значение атрибута href и меняем его
        Значение текущего атрибута помещаем в переменную value
        */
        $(this).attr("href", function (index, value) {
            let protocol = value.substring(0, value.indexOf(':')); 
            /*
            Объявляем переменную и присваиваем ей значение ссылки до :(т.е либо http, либо https) 
             */
            if (protocol === 'http') { //если не https, дописываем s. Если все ок-ничего не делаем
                let href = value.substring(value.indexOf(':'), value.length);
                return protocol + 's' + href;
            }
        });
    });

    //сброс 1 и 2 пункта

    $('body').append('<button id = "cancel">Cancel</button>'); //вставляем кнопку сброса с id cancel
    $("#cancel").click(function () { //функция активируется при нажатии по кнопке с id cancel

        $("a").each(function () { //перебор по сылкам(селектор а)
            /*в каждом выбираем текст, проверяем на наличие стрелочки, если есть возвращаем без учета этой стрелочки
            (с 1 позиции)*/
            $(this).text(function (index, text) {
                if (text.substr(0, 1) === '↗') {
                    return text.substring(1, text.length);
                }
            });
        });
        //каждые формы меняем на активные
        //Возвращает / изменяет значение свойств выбранных элементов(prop=property)
        $("form *").prop("disabled", false);
    });

    // ЭФФЕКТЫ JQUERY
    /*
    переходим от элемента с нужным id
    к родительскому элементу(те к строке в таблице)
    выделяем объекты-соседи по DOM
    Выделяем дочерний элемент
    Применяем анимацию
    */
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
//AJAX - асинхронный JS и XML
$("#ajax").click(() => {
    $.ajax({ // построение ajax запроса
        url: "https://inxaoc.github.io/example/ajax-1.html"  //адрес на который будет отправлен запрос
    }).done((e) => { // в случае успеха
        let pageContent = document.createElement("div");//создаем div
        pageContent.innerHTML = e;//возвращаем значение элемента страницы на которую отправили запрос
        $("body").append(pageContent);//вставляем то что получилось на нашу страницу
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
//prop - key, req[prop] - value
/*
1. Вызываем цикл
2. Если value - объект, то выводим key
	и далее начинаем перебирать его вложенные члены
3. Если value - не объект, то выводим value
*/
function createList(element) {
    let ul = document.createElement('ul');
    for (const props in element) {
        let li = document.createElement('li');
        if (typeof (element[props]) !== 'object') {
            li.innerText = element[props];
        } else {
            li.innerText = props;
            // добавляет вложенный список в li
            li.append(createList(element[props]));
        }
        ul.append(li);
    }
    return ul;
}
