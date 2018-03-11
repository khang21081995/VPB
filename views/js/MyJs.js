function callAjax(jsonStringSend, urlReciver, methodSend, callBackFunction) {
    var data = (jsonStringSend);
    $.ajax({
        url: urlReciver,
        method: methodSend,
        contentType: "application/json",
        data: data
    }).done(function (response) {
        callBackFunction(response);
    });
}