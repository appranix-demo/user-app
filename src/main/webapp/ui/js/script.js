$(document).ready(function () {

    setItemValue('userId', 0);
    setItemValue('uploadCount', '0');
    $('#currentUser').text(getItemValue('current_user'));
    homePage();

    partnerListCall();
    $('#accountTBody').empty();
    accountListCall();

    //  Form validation
    formValidation();

    // image upload
    imageUpload();

    $('.masterTooltip').hover(function () {
        // Hover over code
        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
                .text(title)
                .appendTo('body')
                .fadeIn('slow');
    }, function () {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
    }).mousemove(function (e) {
        var mousex = e.pageX + 20; //Get X coordinates
        var mousey = e.pageY + 10; //Get Y coordinates
        $('.tooltip')
                .css({top: mousey, left: mousex});
    });

});

$('.items a').on('click', function () {
    var $this = $(this),
            $bc = $('<div class="item"></div>');

    $this.parents('li').each(function (n, li) {
        var $a = $(li).children('a').clone();
        $bc.prepend(' / ', $a);
    });
    $('.breadcrumb').html($bc.prepend('<a href="#home">Home</a>'));
    return false;
});

function noPreview() {
    $('.image-preview-div').css("display", "none");
    $('.preview-img').attr('src', 'images/noimage');
}

function selectImage(e) {
    setItemValue('uploadCount', '0');
    $('.file').css("color", "green");
    $('.image-preview-div').css("display", "block");
    $('.preview-img').attr('src', e.target.result);
    $('.selectBtn').find('span').text('Change Logo');
    $('.preview-img').css('max-width', '200px');
    $('.formmessage').hide(1000);
}

function selectImageChange(e) {
    setItemValue('uploadCount', '0');
    $('.file').css("color", "green");
    $('.image-preview-div').css("display", "block");
    $('.selectBtn').find('span').text('Change Logo');
    $('.preview-img').attr('src', e);
    $('.preview-img').css('max-width', '200px');
}

function imageUpload() {
    var maxsize = 128 * 1024; // 500 KB

    $('#max-size').html((maxsize / 1024).toFixed(2));

    $('.upload-image-form').on('submit', function (e) {

        e.preventDefault();

        $('.formmessage').empty();
        $('.formmessage').h();

        $.ajax({
            url: "upload-image.php",
            type: "POST",
            data: new FormData(this),
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $('#loading').hide();
                $('#message').html(data);
            }
        });

    });

    $('.file').change(function () {


        var file = this.files[0];
        var match = ["image/jpeg", "image/png", "image/jpg"];
        userId = getItemValue('userId');

        if (!((file.type === match[0]) || (file.type === match[1]) || (file.type === match[2]))) {
            if (userId === '0') {
                noPreview();
                $('.selectBtn').find('span').text('Add Logo');
                setItemValue('uploadCount', '1');
            } else {
                $('.selectBtn').find('span').text('Change Logo');
            }

            $('.formmessage').addClass("alert alert-danger fade in");
            $('.formmessage').html('Invalid image format. Allowed formats: JPG, JPEG, PNG.').show();
            return false;
        }

        if (file.size > maxsize) {
            if (userId === '0') {
                noPreview();
                $('.selectBtn').find('span').text('Add Logo');
                setItemValue('uploadCount', '1');
            } else {
                $('.selectBtn').find('span').text('Change Logo');
            }

            $('.formmessage').addClass("alert alert-danger fade in");
            $('.formmessage').html('The size of image you are attempting to upload is ' + (file.size / 1024).toFixed(2) + ' KB, maximum size allowed is ' + (maxsize / 1024).toFixed(2) + ' KB').show();
            return false;
        }

        var reader = new FileReader();
        reader.onload = function (e) {
            //Initiate the JavaScript Image object.
            var image = new Image();
            if (userId === '0') {
                noPreview();
                $('.selectBtn').find('span').text('Add Logo');
                setItemValue('uploadCount', '1');
            } else {
                $('.selectBtn').find('span').text('Change Logo');
            }
            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.onload = function () {
                //Determine the Height and Width.
                var height = this.height;
                var width = this.width;
                if (height > 46 || width > 200) {
                    $('.formmessage').addClass("alert alert-danger fade in");
                    $('.formmessage').html('Upload a logo with 200 x 46').show();
                    return false;
                } else {
                    selectImage(e);
                    return true;
                }
            };
        };
        reader.readAsDataURL(this.files[0]);

    });
}

function homePage() {
    showSection('#partnerList');
}

function setItemValue(varName, value) {
    window.localStorage.setItem(varName, value);
}

function getItemValue(varName) {
    return window.localStorage.getItem(varName);
}

function removeItemValue(varName) {
    window.localStorage.removeItem(varName);
}

function showSection(id) {
    resetForm();
    hideSection();
    document.getElementById("account_orgname").disabled = false;
    document.getElementById("partner_name").disabled = false;
    if (id === '#partnerList') {
        setItemValue('parent', 'partner');
    } else if (id === '#accountList') {
        $('#partner-select-div').show();
        $('#accountTBody').empty();
        accountListCall();
        setItemValue('parent', 'account');
    } else if (id === '#newAccount') {
        $('#partner-select-div').show();
        $('#partner-select').empty();
        partnerListCall();
    }
    $(id).show();
}

function hideSection() {
    $("#dashboard").hide();
    $("#userList").hide();
    $("#newUser").hide();
    $("#partnerList").hide();
    $("#newPartner").hide();
    $("#accountList").hide();
    $("#newAccount").hide();
    $("#usersParent").hide();
}

function resetForm() {
    document.getElementById("partnerForm").reset();
    document.getElementById("accountForm").reset();
    document.getElementById("userForm").reset();
    $('.formmessage').empty();
    $('.formmessage').removeClass('alert alert-danger fade in');
    $('.formmessage').hide();
    // Remove class "errorBox" from input elements
    var elms = document.querySelectorAll('.error');  // class
    for (var i = 0; i < elms.length; i++) {
        elms[i].classList.remove("error");
    }

    // Remove previous error messages
    elms = document.querySelectorAll('[id$="-error"]');  // id ends with Error
    for (var i = 0; i < elms.length; i++) {
        elms[i].innerHTML = "";
    }
    removeItemValue('userId');
    setItemValue('userId', 0);
    $('.customForm .error').css('color', '#555');
    $('.selectBtn').find('span').text('Add Logo');
    $('.selectBtn').show();
    noPreview();
}

function formValidation() {
    partnerValidation();
    accountValidation();
    userValidation();
}

function sortTable(f, n, id) {
    var rows = $(id).children('tbody').children('tr').get();

    rows.sort(function (a, b) {

        var A = getVal(a);
        var B = getVal(b);

        if (A < B) {
            return -1 * f;
        }
        if (A > B) {
            return 1 * f;
        }
        return 0;
    });

    function getVal(elm) {
        var v = $(elm).children('td').eq(n).text().toUpperCase();
        if ($.isNumeric(v)) {
            v = parseInt(v, 10);
        }
        return v;
    }
//$('#partnerTable').children('tbody').append(rows);
    $.each(rows, function (index, row) {
        $(id).children('tbody').append(row);
    });
}
var f_nm = 1;

function sort(n, id) {
    f_nm *= -1;
    sortTable(f_nm, n, id);
}

function partnerValidation() {
    $('#partnerForm').validate({// initialize the plugin
        rules: {
            partner_name: {
                required: true,
                minlength: 1,
                lettersonly: true
            },
            partner_phonenumber: {
                required: true,
                minlength: 10,
                maxlength: 10,
                number: true
            },
            partner_email: {
                required: true,
                email: true
            },
            partner_billingEmail: {
                required: true,
                email: true
            },
            partner_ad_name: {
                required: true,
                minlength: 3
            },
            partner_ad_username: {
                required: true,
                minlength: 1,
                nowhitespace: true
            },
            partner_ad_phonenumber: {
                required: true,
                minlength: 8,
                number: true
            },
            partner_ad_email: {
                required: true,
                email: true
            },
            partner_ad_password: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }
                    return $("#partner_ad_password").val().length > 0;
                },
                minlength: 5
            },
            partner_ad_cfmpassword: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }
                    return $("#partner_ad_cfmpassword").val().length > 0;
                },
                minlength: 5,
                equalTo: "#partner_ad_password"
            },
            partner_streetAddress: {
                required: true,
                maxlength: 60,
                minlength: 5
            },
            partner_city: {
                required: true
            },
            partner_state: {
                required: true
            },
            partner_country: {
                required: true
            }
        },
        messages: {
            partner_name: {
                required: "Please enter your Organisation name",
                minlength: "Name must be atleast 1 characters",
                lettersonly: "Letters only allowed"
            },
            partner_phonenumber: {
                required: "Please enter your phone number",
                minlength: "Phone number not valid",
                number: "Numbers only allowed"
            },
            partner_email: {
                required: "Please enter your e-mail",
                email: "E-mail is not valid"
            },
            partner_billingEmail: {
                required: "Please enter your Billing e-mail",
                email: "E-mail is not valid"
            },
            partner_ad_name: {
                required: "Please enter your name",
                minlength: "Name must be atleast 3 characters"
            },
            partner_ad_username: {
                required: "Please enter your username",
                minlength: "Name must be atleast 1 characters",
                nowhitespace: "No white space allowed"
            },
            partner_ad_phonenumber: {
                required: "Please enter your phone number",
                minlength: "Phone number not valid",
                number: "Numbers only allowed"
            },
            partner_ad_email: {
                required: "Please enter your e-mail",
                email: "E-mail is not valid"
            },
            partner_ad_password: {
                required: "Please enter your password",
                minlength: "Try password with at least 5 characters"
            },
            partner_ad_cfmpassword: {
                required: "Please re-enter your password",
                minlength: "Try password with at least 5 characters",
                equalTo: "These passwords don't match. Try again?"
            },
            partner_streetAddress: {
                required: "Please enter your street address",
                maxlength: "Street address must be less than 60 characters",
                minlength: "Street address must be atleast 5 characters"
            },
            partner_city: {
                required: "please enter your city",
                lettersonly: "Letters only allowed"
            },
            partner_state: {
                required: "Please enter your state",
                lettersonly: "Letters only allowed"
            },
            partner_country: {
                required: "Please enter your country",
                lettersonly: "Letters only allowed"
            }
        },
        submitHandler: function () {
            uploadCount = getItemValue('uploadCount');
            if (uploadCount === '1') {
                confirmImageUpload("createPartner()");
            } else {
                createPartner();
            }
            return false;
        }
    });
}

function confirmImageUpload(method) {
    $('#confirmModal').modal();
    $('.modal-body').html('<p>Are you sure to proceed without logo?</p>');
    $('#confirmButton').html('<a class="btn btn-danger" onclick="' + method + '">Confirm</a>');
}

function partnerListCall() {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/partner', // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
            "x-auth-token": getItemValue('access_token')
        },
        statusCode: {
            200: function (request) {
                partnerList(request);
                getActivePartners();
            },
            401: function () {
                window.location = 'index.html';
                alertDanger('Provide User name or Password');
            }
        }
    });
}

function partnerList(request) {

    $('#partnerTBody').empty();
    var partnerValues = request;

    var values = ["id", "name", "createdDateTime", "emailId", "phoneNumber", "deleted"];
    partnerValues.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }

        return 0;
    });

    var partnerTBody = document.getElementById('partnerTBody');
    for (var iLoop = 0; iLoop < partnerValues.length; iLoop++) {
        var tr = document.createElement('tr');

        for (var jLoop = 0; jLoop <= values.length; jLoop++) {
            var td = document.createElement('td');
            if (jLoop < values.length-1) {
                if (values[jLoop] === 'id') {
                    partnerId = partnerValues[iLoop][values[jLoop]];
                    td.appendChild(document.createTextNode(iLoop+1));
                } else {
                    td.appendChild(document.createTextNode(partnerValues[iLoop][values[jLoop]]));
                }
                tr.appendChild(td);
            }
            if (partnerValues[iLoop][values[5]] === false) {
                tr.setAttribute('class', 'card-5');
                if (jLoop === values.length) {
                    td.setAttribute('class', 'td-edit');
                    //Anchor tag for users
                    var callFunction = 'listPartnerAccounts(' + partnerId + ')';
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-street-view');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Show associated Accounts');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);

                    //Anchor tag for users
                    var callFunction = 'parentUser(' + partnerId + ')';
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-users');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Show associated Users');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);

                    // Anchor tag for Edit
                    var callFunction = 'editPartnerForm(' + partnerId + ')';
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-pencil-square-o');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Edit Partner');
                    anchor.setAttribute('id', 'editPartner');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);

                    // Anchor tag for delete
                    var callFunction = 'confirmDeletePartner('.concat(partnerId).concat(')');
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-ban');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Disable Partner');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);
                }
            } else {
                tr.setAttribute('class', 'card-5 r-disabled');
            }
        }

        partnerTBody.appendChild(tr);
    }
}

function editPartnerForm(id) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/partner-admin-user/' + id, // the url where we want to POST
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            200: function (request) {
                document.getElementById('partner_name').value = request.name;
                document.getElementById("partner_name").disabled = true;
                document.getElementById('partner_email').value = request.emailId;
                document.getElementById('partner_phonenumber').value = request.phoneNumber;
                document.getElementById('partner_ad_name').value = request.adminName;
                document.getElementById('partner_ad_username').value = request.username;
                document.getElementById('partner_ad_email').value = request.adminEmailId;
                document.getElementById('partner_streetAddress').value = request.streetAddress;
                document.getElementById('partner_city').value = request.city;
                document.getElementById('partner_state').value = request.state;
                document.getElementById('partner_country').value = request.country;
                document.getElementById('partner_zipcode').value = request.zipCode;

                selectImageChange(request.logoImageUrl);
                setItemValue('userId', request.id);

                $('#newPartner').show();
                $("#partnerList").hide();
            },
            500: function () {
                alertDanger('Name/Email already exist');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function confirmDeletePartner(id) {
    $('#confirmModal').modal();
    $('.modal-body').html('<p>Are you sure to delete this item?</p>');
    $('#confirmButton').html('<a class="btn btn-danger" onclick="deletePartner(' + id + ')">Delete</a>');
}

function deleteData(user) {
    // do your stuffs with id
    alertSuccess(user + " deleted successfully!");
    $('#confirmModal').modal('hide'); // now close modal
}

function alertSuccess(msg) {
    $(".AlertMessage").removeClass('alert alert-danger');
    $(".AlertMessage").html(msg);
    $(".AlertMessage").addClass('alert alert-success');
    $(".AlertMessage").show(0).delay(2500).hide(0);

}

function alertDanger(msg) {
    $(".AlertMessage").removeClass('alert alert-success');
    $(".AlertMessage").html(msg);
    $(".AlertMessage").addClass('alert alert-danger');
    $(".AlertMessage").show(0).delay(7500).hide(0);
}

function deletePartner(id) {
    $.ajax({
        type: 'DELETE', // define the type of HTTP verb we want to use
        url: '/api/v1/partner/delete/' + id, // the url where we want to DELETE

        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            204: function () {
                deleteData('Partner');
                $('#partnerTBody').empty();
                partnerListCall();
            },
            500: function () {
                alertDanger('Invalid Details, Please fill the form correctly');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function createPartner() {
    $('#confirmModal').modal('hide');
    var id = getItemValue('userId');
    var httpMethod;
    var httpUrl;
    if (id === '0') {
        httpMethod = 'POST';
        httpUrl = '/api/v1/partner/create';
    } else {
        httpMethod = 'PATCH';
        httpUrl = '/api/v1/partner/' + id + '/update';
    }
    var imageData = [];
    var arr = document.getElementById('partner_preview-img').src;
    check = arr.split(':');
    if (check[0] === 'http') {
        filename = arr.substring(arr.lastIndexOf("/") + 1, arr.length);
        imageData[1] = '';
    } else {
        imageData = arr.split('base64,');
        var brr = imageData[0].split('/');
        var imageType = brr[1].split(';');
        filename = "filename." + imageType[0] + "";
    }
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
        "name": $('input[id=partner_name]').val(),
        "emailId": $('input[id=partner_email]').val(),
        "billingEmailId": $('input[id=partner_email]').val(),
        "phoneNumber": $('input[id=partner_phonenumber]').val(),
        "username": $('input[id=partner_ad_username]').val(),
        "password": $('input[id=partner_ad_password]').val(),
        "adminName": $('input[id=partner_ad_name]').val(),
        "adminEmailId": $('input[id=partner_ad_email]').val(),
        "streetAddress": $('input[id=partner_streetAddress]').val(),
        "status": "ACTIVE",
        "customLogoEnabled": false,
        "city": $('input[id=partner_city]').val(),
        "state": $('input[id=partner_state]').val(),
        "country": $('input[id=partner_country]').val(),
        "zipCode": $('input[id=partner_zipcode]').val(),
        "logoImageName": filename,
        "logoImageData": imageData[1]
    };
    // process the form
    $.ajax({
        type: httpMethod, // define the type of HTTP verb we want to use
        url: httpUrl, // the url where we want to communicate
        data: JSON.stringify(formData), // our data object
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            201: function () {
                alertSuccess('Partner is successfully created');
                showSection('#partnerList');
                $('#partnerTBody').empty();
                partnerListCall();
                removeItemValue('userId');
            },
            202: function () {
                alertSuccess('Partner is successfully updated');
                showSection('#partnerList');
                $('#partnerTBody').empty();
                partnerListCall();
                removeItemValue('userId');
            },
            500: function () {
                alertDanger('Name/Email Id already Exist');
            },
            400: function (request) {
                if (request.responseJSON.message.includes("partner_name_unique")) {
                    alertDanger("Partner name is already used");
                } else {
                    alertDanger(request.responseJSON.message);
                }
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function parentUser(pId) {
    setItemValue('pId', pId);
    hideSection();
    showSection('#userList');
    userListCall();
}

function listPartnerAccounts(pId) {
    setItemValue('partId', pId);
    hideSection();
    showSection('#accountList');
}
function userValidation() {
    $('#userForm').validate({// initialize the plugin
        rules: {
            user_fname: {
                required: true,
                minlength: 3,
                lettersonly: true
            },
            user_lname: {
                required: true,
                minlength: 3
            },
            user_email: {
                required: true,
                email: true
            },
            user_username: {
                required: true,
                minlength: 1,
                nowhitespace: true
            },
            user_password: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }
                    return $("#user_password").val().length > 0;
                },
                minlength: 5
            },
            user_cfmpassword: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }

                    return $("#user_cfmpassword").val().length > 0;
                },
                minlength: 5,
                equalTo: "#user_password"
            }
        },
        messages: {
            user_fname: {
                required: "Please enter your firstname",
                minlength: "Name must be atleast 3 characters",
                lettersonly: "Letters only allowed"
            },
            user_lname: {
                required: "Please enter your lastname",
                minlength: "Name must be atleast 3 characters"
            },
            user_email: {
                required: "Please enter your e-mail",
                email: "E-mail is not valid"
            },
            user_username: {
                required: "Please enter your username",
                minlength: "Name must be atleast 1 characters",
                nowhitespace: "No white space allowed",
                lettersonly: "Letters only allowed"
            },
            user_password: {
                required: "Please enter your password",
                minlength: "Try password with at least 5 characters"
            },
            user_cfmpassword: {
                required: "Please re-enter your password",
                minlength: "Try password with at least 5 characters",
                equalTo: "These passwords don't match. Try again?"
            }
        },
        submitHandler: function () {
            createUser();
            return false;
        }
    });
}


function userListCall() {
    parent = getItemValue('parent');
    pId = getItemValue('pId');
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/' + parent + '/' + pId + '/user?deleted=false', // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
            "x-auth-token": getItemValue('access_token')
        },
        statusCode: {
            200: function (request) {
                userList(request, parent, pId);
            },
            401: function () {
                window.location = 'index.html';
                alertDanger('Provide User name or Password');
            }
        }
    });
}


function userList(request) {
    var userValues = request;
    parent = getItemValue('parent');
    pId = getItemValue('pId');
    var values = ["id", "firstName", "username", "emailId", "createdDateTime"];
    userValues.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }

        return 0;
    });

    document.getElementById('userTBody').innerHTML = '';
    var userTBody = document.getElementById('userTBody');
    for (var iLoop = 0; iLoop < userValues.length; iLoop++) {
        var tr = document.createElement('tr');
        tr.setAttribute('class', 'card-5');
        for (var jLoop = 0; jLoop <= values.length; jLoop++) {
            var td = document.createElement('td');
            if (jLoop < values.length) {
                if (values[jLoop] === 'id') {
                    userId = userValues[iLoop][values[jLoop]];
                    td.appendChild(document.createTextNode(iLoop+1));
                } else {
                    td.appendChild(document.createTextNode(userValues[iLoop][values[jLoop]]));
                }
                tr.appendChild(td);
            }
            if (jLoop === values.length) {
                // Anchor tag for Edit
                var callFunction = 'editUserForm('.concat(userId).concat(')');
                var anchor = document.createElement('a');
                var i = document.createElement('i');
                i.setAttribute('class', 'fa fa-pencil-square-o');
                anchor.appendChild(i);
                anchor.setAttribute('title', 'Edit User');
                anchor.setAttribute('onclick', callFunction);
                td.appendChild(anchor);
                tr.appendChild(td);

                // Anchor tag for delete
                var callFunction = 'confirmDeleteUser(' + userId + ')';
                var anchor = document.createElement('a');
                var i = document.createElement('i');
                i.setAttribute('class', 'fa fa-ban');
                anchor.appendChild(i);
                anchor.setAttribute('title', 'Delete user');
                anchor.setAttribute('onclick', callFunction);
                td.appendChild(anchor);
                tr.appendChild(td);
            }
        }
        userTBody.appendChild(tr);
    }
}

function confirmDeleteUser(id) {
    $('#confirmModal').modal();
    $('.modal-body').html('<p>Are you sure to delete this item?</p>');
    $('#confirmButton').html('<a class="btn btn-danger" onclick="deleteUser(' + id + ')">Delete</a>');
}

function editUserForm(id) {
    parent = getItemValue('parent');
    pId = getItemValue('pId');
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/' + parent + '/' + pId + '/user/' + id, // the url where we want to POST
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            200: function (request) {
                if (request.firstName !== '' && request.lastName === null) {
                    name = request.firstName;
//                  fName = name.split(' ')[0];
                    fName = name.substr(0, name.indexOf(' '));
                    lName = name.substr(name.indexOf(' ') + 1);
                    if (fName === '') {
                        fName = lName;
                    }
                } else {
                    fName = request.firstName;
                    lName = request.lastName;
                }
                userType = request.type.split('_');
                if (userType[1] === 'ADMIN') {
                    setItemValue('userType', userType[1]);
                } else {
                    setItemValue('userType', userType[1]);
                }
                document.getElementById('user_fname').value = fName;
                document.getElementById('user_lname').value = lName;
                document.getElementById('user_email').value = request.emailId;
                document.getElementById('user_username').value = request.username;
                setItemValue('userId', request.id);

                $('#newUser').show();
                $("#userList").hide();
            },
            500: function () {
                alertDanger('Name/Email already exist');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function deleteUser(id) {
    parent = getItemValue('parent');
    pId = getItemValue('pId');
    $.ajax({
        type: 'DELETE', // define the type of HTTP verb we want to use
        url: '/api/v1/user/delete/' + id, // the url where we want to DELETE

        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            204: function () {
                deleteData('User');
                userListCall();
            },
            500: function () {
                alertDanger('Invalid Details, Please fill the form correctly');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function createUser() {
    var id = getItemValue('userId');
    var httpMethod;
    var httpUrl;
    parent = getItemValue('parent');
    pId = getItemValue('pId');

    if (id === '0') {
        httpMethod = 'POST';
        httpUrl = '/api/v1/' + parent + '/' + pId + '/user';
        setItemValue('userType', 'USER');
        userType = getItemValue('userType');
    } else {
        httpMethod = 'PATCH';
        httpUrl = '/api/v1/' + parent + '/' + pId + '/user/' + id;
        userType = getItemValue('userType');
    }
    parentType = parent + '_' + userType;
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
        "username": $('input[id=user_username]').val(),
        "firstName": $('input[id=user_fname]').val(),
        "lastName": $('input[id=user_lname]').val(),
        "password": $('input[id=user_password]').val(),
        "emailId": $('input[id=user_email]').val(),
        "status": "ENABLED",
        "type": parentType.toUpperCase()
    };
    // process the form
    $.ajax({
        type: httpMethod, // define the type of HTTP verb we want to use
        url: httpUrl, // the url where we want to communicate
        data: JSON.stringify(formData), // our data object
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            201: function () {
                alertSuccess('User is successfully created');
                showSection('#userList');
                userListCall();
                removeItemValue('userId');
            },
            202: function () {
                alertSuccess('User is successfully updated');
                showSection('#userList');
                userListCall();
                removeItemValue('userId');
            },
            500: function () {
                alertDanger('Name/Email Id already Exist');
            },
            400: function (request) {
                alertDanger(request.responseJSON.message);
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function accountValidation() {
    $('#accountForm').validate({// initialize the plugin
        rules: {
            account_orgname: {
                required: true,
                minlength: 1,
                lettersonly: true
            },
            account_email: {
                required: true,
                email: true
            },
            account_billingEmail: {
                required: true,
                email: true
            },
            account_phonenumber: {
                required: true,
                minlength: 10,
                maxlength: 10,
                number: true
            },
            account_ad_name: {
                required: true,
                minlength: 3
            },
            account_ad_username: {
                required: true,
                minlength: 1,
                nowhitespace: true
            },
            account_ad_phonenumber: {
                required: true,
                minlength: 8,
                number: true
            },
            account_ad_email: {
                required: true,
                email: true
            },
            account_ad_password: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }
                    return $("#account_ad_password").val().length > 0;
                },
                minlength: 5
            },
            account_ad_cfmpassword: {
                required: function () {
                    if (getItemValue('userId') === '0') {
                        return true;
                    }
                    return $("#account_ad_cfmpassword").val().length > 0;
                },
                minlength: 5,
                equalTo: "#account_ad_password"
            },
            account_streetAddress: {
                required: true,
                maxlength: 60,
                minlength: 5
            },
            account_city: {
                required: true
            },
            account_state: {
                required: true
            },
            account_country: {
                required: true
            }
        },
        messages: {
            account_orgname: {
                required: "Please enter your organisation name",
                minlength: "Name must be atleast 1 characters",
                lettersonly: "Letters only allowed"
            },
            account_phonenumber: {
                required: "Please enter your phone number",
                minlength: "Phone number not valid",
                number: "Numbers only allowed"
            },
            account_email: {
                required: "Please enter your e-mail",
                email: "E-mail is not valid"
            },
            account_billingEmail: {
                required: "Please enter your Billing e-mail",
                email: "E-mail is not valid"
            },
            account_ad_name: {
                required: "Please enter your name",
                minlength: "Name must be atleast 3 characters"
            },
            account_ad_username: {
                required: "Please enter your username",
                minlength: "Name must be atleast 1 characters",
                nowhitespace: "No white space allowed"
            },
            account_ad_phonenumber: {
                required: "Please enter your phone number",
                minlength: "Phone number not valid",
                number: "Numbers only allowed"
            },
            account_ad_email: {
                required: "Please enter your e-mail",
                email: "E-mail is not valid"
            },
            account_ad_password: {
                required: "Please enter your password",
                minlength: "Try password with at least 5 characters"
            },
            account_ad_cfmpassword: {
                required: "Please re-enter your password",
                minlength: "Try password with at least 5 characters",
                equalTo: "These passwords don't match. Try again?"
            },
            account_streetAddress: {
                required: "Please enter your street address",
                maxlength: "Street address must be less than 60 characters",
                minlength: "Street address must be atleast 5 characters"
            },
            account_city: {
                required: "please enter your city",
                lettersonly: "Letters only allowed"
            },
            account_state: {
                required: "Please enter your state",
                lettersonly: "Letters only allowed"
            },
            account_country: {
                required: "Please enter your country",
                lettersonly: "Letters only allowed"
            }
        },
        submitHandler: function () {
            uploadCount = getItemValue('uploadCount');
            if (uploadCount === '1') {
                confirmImageUpload("createAccount()");
            } else {
                createAccount();
            }
            return false;
        }
    });
}

function accountListCall() {
    var partnerId = getItemValue('partId');
    var httpUrl;
    if (partnerId !== null && partnerId !== 0) {
        httpUrl = '/api/v1/account/' + partnerId + '/partner-accounts';
    } else {
        httpUrl = '/api/v1/account';
    }

    removeItemValue('partId');

    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: httpUrl, // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
            "x-auth-token": getItemValue('access_token')
        },
        statusCode: {
            200: function (request) {
                $('#accountTBody').empty();
                accountList(request);
            },
            401: function () {
                window.location = 'index.html';
                alertDanger('Provide User name or Password');
            }
        }
    });
}


function accountList(request) {
    var accountValues = request;

    var values = ["id", "aliasName", "createdDateTime", "emailId", "phoneNumber", "deleted"];
    accountValues.sort(function (a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }

        return 0;
    });

    var accountTBody = document.getElementById('accountTBody');
    for (var iLoop = 0; iLoop < accountValues.length; iLoop++) {
        var tr = document.createElement('tr');
        for (var jLoop = 0; jLoop <= values.length; jLoop++) {
            var td = document.createElement('td');
            if (jLoop < values.length - 1) {
                if (values[jLoop] === 'id') {
                    accountId = accountValues[iLoop][values[jLoop]];
                    td.appendChild(document.createTextNode(iLoop+1));
                } else {
                    td.appendChild(document.createTextNode(accountValues[iLoop][values[jLoop]]));
                }
                tr.appendChild(td);
            }
            if (accountValues[iLoop][values[5]] === false) {
                tr.setAttribute('class', 'card-5');
                if (jLoop === values.length) {
                    //Anchor tag for users
                    var callFunction = 'parentUser(' + accountId + ')';
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-users');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Show associated Users');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);

                    // Anchor tag for Edit
                    var callFunction = 'editAccountForm('.concat(accountId).concat(')');
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-pencil-square-o');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Edit Accounts');
                    anchor.setAttribute('id', 'editAccount');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);

                    // Anchor tag for delete
                    var callFunction = 'confirmDeleteAccount('.concat(accountId).concat(')');
                    var anchor = document.createElement('a');
                    var i = document.createElement('i');
                    i.setAttribute('class', 'fa fa-ban');
                    anchor.appendChild(i);
                    anchor.setAttribute('title', 'Dissble Account');
                    anchor.setAttribute('onclick', callFunction);
                    td.appendChild(anchor);
                    tr.appendChild(td);
                }
            } else {
                tr.setAttribute('class', 'card-5 r-disabled');
            }
        }
        accountTBody.appendChild(tr);
    }
}

function confirmDeleteAccount(id) {
    $('#confirmModal').modal();
    $('.modal-body').html('<p>Are you sure to delete this item?</p>');
    $('#confirmButton').html('<a class="btn btn-danger" onclick="deleteAccount(' + id + ')">Delete</a>');
}

function editAccountForm(id) {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/account-admin-user/' + id, // the url where we want to POST
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            200: function (request) {
                document.getElementById('account_orgname').value = request.aliasName;
                document.getElementById("account_orgname").disabled = true;
                document.getElementById('account_email').value = request.emailId;
                document.getElementById('account_phonenumber').value = request.phoneNumber;
                document.getElementById('account_ad_name').value = request.adminName;
                document.getElementById('account_ad_email').value = request.adminEmailId;
                document.getElementById('account_ad_username').value = request.username;
                document.getElementById('account_streetAddress').value = request.streetAddress;
                document.getElementById('account_city').value = request.city;
                document.getElementById('account_state').value = request.state;
                document.getElementById('account_country').value = request.country;
                document.getElementById('account_zipcode').value = request.zipCode;
                if (request.partner !== null) {
                    $("#partner-select").empty();
                    var selectPartner = document.getElementById('partner-select');
                    var option = document.createElement('option');
                    option.appendChild(document.createTextNode(request.partner.name));
                    option.setAttribute('value', request.partner.id);
                    selectPartner.appendChild(option);


                } else {
                    $("#partner-select-div").hide();
                }

                selectImageChange(request.logoImageUrl);
                setItemValue('userId', request.id);
                $('#newAccount').show();
                $("#accountList").hide();
            },
            500: function () {
                alertDanger('Name/Email already exist');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function deleteAccount(id) {
    $.ajax({
        type: 'DELETE', // define the type of HTTP verb we want to use
        url: '/api/v1/account/delete/' + id, // the url where we want to DELETE

        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            204: function () {
                deleteData('Account');
                $('#accountTBody').empty();
                accountListCall();
            },
            500: function () {
                alertDanger('Invalid Details, Please fill the form correctly');
                window.location = 'portal.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function createAccount() {
    $('#confirmModal').modal('hide');
    var id = getItemValue('userId');
    var httpMethod;
    var httpUrl;
    if (id === '0') {
        httpMethod = 'POST';
        httpUrl = '/api/v1/account/create';
    } else {
        httpMethod = 'PATCH';
        httpUrl = '/api/v1/account/' + id + '/update';
    }
    var imageData = [];
    var arr = document.getElementById('account_preview-img').src;
    check = arr.split(':');
    if (check[0] === 'http') {
        filename = arr.substring(arr.lastIndexOf("/") + 1, arr.length);
        imageData[1] = '';
    } else {
        imageData = arr.split('base64,');
        var brr = imageData[0].split('/');
        var imageType = brr[1].split(';');
        filename = "filename." + imageType[0] + "";
    }

    var partnerSelected = document.getElementById("partner-select");
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
        "organisationName": $('input[id=account_orgname]').val(),
        "aliasName": $('input[id=account_orgname]').val(),
        "emailId": $('input[id=account_email]').val(),
        "billingEmailId": $('input[id=account_email]').val(),
        "phoneNumber": $('input[id=account_phonenumber]').val(),
        "username": $('input[id=account_ad_username]').val(),
        "password": $('input[id=account_ad_password]').val(),
        "adminName": $('input[id=account_ad_name]').val(),
        "adminEmailId": $('input[id=account_ad_email]').val(),
        "streetAddress": $('input[id=account_streetAddress]').val(),
        "status": 'ACTIVE',
        "city": $('input[id=account_city]').val(),
        "state": $('input[id=account_state]').val(),
        "country": $('input[id=account_country]').val(),
        "zipCode": $('input[id=account_zipcode]').val(),
        "logoImageName": filename,
        "logoImageData": imageData[1],
        "partnerId": partnerSelected.options[partnerSelected.selectedIndex].value
    };
    // process the form
    $.ajax({
        type: httpMethod, // define the type of HTTP verb we want to use
        url: httpUrl, // the url where we want to communicate
        data: JSON.stringify(formData), // our data object
        headers: {
            "x-auth-token": getItemValue('access_token'),
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            201: function () {
                alertSuccess('Account is successfully created');
                showSection('#accountList');
                $('#accountTBody').empty();
                accountListCall();
                removeItemValue('userId');
            },
            202: function () {
                alertSuccess('Account is successfully updated');
                showSection('#accountList');
                $('#accountTBody').empty();
                accountListCall();
                removeItemValue('userId');
            },
            500: function () {
                alertDanger('Name or Email Id already Exist');
            },
            400: function (request) {
                if (request.responseJSON.message.includes("account_name_unique")) {
                    alertDanger("Account name is already used");
                } else {
                    alertDanger(request.responseJSON.message);
                }
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function logout() {
    // process the form
    $.ajax({
        type: 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/auth/logout', // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
            "x-auth-token": getItemValue('access_token')
        },
        statusCode: {
            200: function () {
                window.location = 'index.html';
                removeItemValue('access_token');
                removeItemValue('current_user');
            }
        }

    });
}

function getActivePartners() {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/partner?deleted=false', // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
            "x-auth-token": getItemValue('access_token')
        },
        statusCode: {
            200: function (request) {
                getPartnerListDropDown(request);
            },
            401: function () {
                window.location = 'index.html';
                alertDanger('Provide User name or Password');
            }
        }
    });
}

function getPartnerListDropDown(request) {
    var partner = request;
    var selectPartner = document.getElementById('partner-select');

    var option = document.createElement('option');
    option.appendChild(document.createTextNode('--Select-Partner--'));
    option.setAttribute('value', 0);
    selectPartner.appendChild(option);

    for (var i = 0; i < request.length; i++) {
        var option = document.createElement('option');
        option.appendChild(document.createTextNode(partner[i]['name']));
        option.setAttribute('value', partner[i]['id']);
        selectPartner.appendChild(option);
    }
}
