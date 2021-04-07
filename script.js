var a = 0, b = 0, c = 0, d = 0;
// сумма значений
function getTotal() {
    var result = document.getElementById("result");
    var s = a + b + c + d
    result.innerHTML = s;
}
// количество комнат
$(document).ready(function () {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        d = count * 45000;
        $input.change();
        getTotal()
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) + 1;
        $input.val(count);
        $input.change();
        d = count * 45000;
        getTotal()
        return false;
    });
});
// тип дома
function house() {
    var type_house = document.getElementById("type_house");
    var price = 0;
    price += parseInt(type_house.options[type_house.selectedIndex].value);
    a = price;

    getTotal()
}
// площадь дома
function plaza() {
    var width = parseInt(document.getElementById('width').value);
    var length = parseInt(document.getElementById('length').value);
    if (isNaN(width) === true) width = 0;
    if (isNaN(length) === true) length = 0;
    var area = width * length * 20000;
    b = area;
    getTotal()
}

// сумма радио и чекбокса
var calc = {
    summ: 0, // сумма изначально 0
    valueArray: (function () { //массив изначально создается на основе данных value выбранных кнопок
        var array = [],
            arrayLength = $("#form-calc .calc-group-input").length;
        for (var i = 0; i < arrayLength; i++) {
            array[i] = parseInt($("#form-calc .calc-group-input").eq(i).find("input:checked").attr("value")) || 0;
        };
        return array;
    })(),
    summation: function () { //суммирует значения массива с данными
        var summ = 0,
            i = this.valueArray.length - 1;
        for (; i >= 0; i--) {
            summ += this.valueArray[i];
        };
        this.summ = summ;
        $("#summ").html(calc.summ);
        c = summ;
        getTotal()
    },
    changeEvent: function () {	//подключение обработчика событий
        $("input[type='radio']").change(function () {	//для радиокнопок
            var element = event.target,
                elementValue = parseInt(element.value),
                elementId = $(element).parents(".calc-group-input").index();
            calc.valueArray[elementId] = elementValue;
            calc.summation();
        });
        $("input[type='checkbox']").change(function () {	//для чекбоксов
            var element = event.target,
                elementValue = parseInt(element.value),
                elementId = $(element).parents(".calc-group-input").index();
            if (!element.checked) {
                elementValue = 0;
            };
            calc.valueArray[elementId] = elementValue;
            calc.summation();
        });
    },
    init: function () {
        calc.summation();
        calc.changeEvent();
    }
};
calc.init();

