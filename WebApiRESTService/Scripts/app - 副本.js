// When client is not on same domain.
// var serviceUrl = 'http://localhost:53838/api/Manufacturers';

// When client is local.
var serviceUrl = './api/Products1';
//var serviceUrl = './api/Manufacturer';  no using Why ????  S problem ** 

// http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api
function sendRequest() {
    $("#products").replaceWith("<span id='value1'></span>");
    var method = $('#method').val();
    $.ajax({
        type: method,
        url: serviceUrl
    }).done(function (data) {
        data.forEach(function (val) {
            callback(val)
        });
    }).fail(function (jqXHR, textStatus, errorThrown) {
        $('#value1').text(jqXHR.responseText || textStatus);
    });
}

/*
function callback(val) {
    //  $("#products").replaceWith("<span id='value1'>(Result)</span>");
    $("#value1").replaceWith("<ul id='products' />");
    var str = "Product: " + val.Manufacturer +  " Discount: " + val.Price;
    $('<li/>', { text: str }).appendTo($('#products'));
}
*/


function callback(val) {
    //  $("#products").replaceWith("<span id='value1'>(Result)</span>");
    $("#value1").replaceWith("<ul id='products' />");
    var str = "Product " + val.ID + ", " + val.Description + ", MFG: " + val.Manufacturer + ", Price: " + val.Price;
    $('<li/>', { text: str }).appendTo($('#products'));
}


// Deletes and refreshes list.
function updateList() {
    $("#products").replaceWith("<span id='value1'>(Result)<br /></span>");
    sendRequest();
}


function find() {

    var id = $('#mfgIdFind').val();

    $.getJSON(serviceUrl + "/" + id,
        function (data) {
            if (data == null) {
                $('#productFind').text('Product not found.');
            }
            var str = data.Manufacturer + ': ' + data.Price + '%';

            $('#productFind').text(str);
        })
    .fail(
        function (jqueryHeaderRequest, textStatus, err) {
            $('#productFind').text('Find error: ' + err);
        });
}


// Add a new product.
function create() {

    jQuery.support.cors = true;

    var product = {

        ID: $('#txtAdd_ID').val(),

        Description: $('#txtAdd_Description').val(),

        Manufacturer: $('#txtAdd_Manufacturer').val(),

        Price: $('#txtAdd_Price').val()
    };

    var id = $('#txtAdd_ID').val();

    var cr = JSON.stringify(product);
    $.ajax({
        url: serviceUrl,
        type: 'POST',
        data: JSON.stringify(product),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $('#productCreate')
                .text('Product successfully created.');
            updateList();
        },
        error: function (_httpRequest, _status, _httpError) {
            // XMLHttpRequest, textStatus, errorThrow
            $('#productCreate')
            .text('Error while adding product.  XMLHttpRequest:'
                    + _httpRequest + '  Status: ' + _status
                    + '  Http Error: ' + _httpError);
        }
    });
}


// Update a product object.
function update() {
    jQuery.support.cors = true;
    var product = {

        ID:  $('#txtUpdate_ID').val(),

        Description: $('#txtUpdate_Description').val(),

        Manufacturer: $('#txtUpdate_Manufacturer').val(),

        Price: $('#txtUpdate_Price').val()
    };

    var cr = JSON.stringify(product);
    $.ajax({

        url: serviceUrl + "/" + $('#txtUpdate_ID').val(),
        type: 'PUT',
        data: JSON.stringify(product),
        contentType: "application/json;charset=utf-8",
        success: function (data) {
            $('#productUpdate')
            .text('The update was successful.');
            updateList();
        },
        error: function (_httpRequest, _status, _httpError) {
            $('#productUpdate')
            .text('Error while adding product.  XMLHttpRequest:'
            + _httpRequest + '  Status: ' + _status + '  Http Error: '
            + _httpError);
        }
    });
}


function del() {
    var id = $('#mfgID').val();
    $.ajax({
        url: serviceUrl + "/" + id,
        type: 'DELETE',
        dataType: 'json',

        success: function (data) {
            $('#productDelete').text('Delete successful.');
            updateList();
        }
    }).fail(
        function (jqueryHeaderRequest, textStatus, err) {
            $('#productDelete').text('Delete error: ' + err);
        });
}
