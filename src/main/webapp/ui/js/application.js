$(document).ready(function () {

	hideSection();
    $('#userTBody').empty();
    showSection('#userList');
    userListCall();

    //  Form validation
    formValidation();

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

function formValidation() {
    userValidation();
}

function showSection(id) {
    resetForm();
    hideSection();
    $(id).show();
}

function resetForm() {
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
    $('.customForm .error').css('color', '#555');
    $('.selectBtn').find('span').text('Add Logo');
    $('.selectBtn').show();
}

function hideSection() {
    $("#userList").hide();
    $("#newUser").hide();
}

function noPreview() {
    $('.image-preview-div').css("display", "none");
    $('.preview-img').attr('src', 'images/noimage');
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
            user_address: {
                required: true,
                minlength: 1,
                nowhitespace: true
            },
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
            user_address: {
                required: "Please enter your address",
                minlength: "Name must be atleast 1 characters",
                nowhitespace: "No white space allowed",
                lettersonly: "Letters only allowed"
            }
        },
        submitHandler: function () {
            createUser();
            return false;
        }
    });
}

function createUser() {
    var httpMethod;
    var httpUrl;
    httpMethod = 'POST';
    httpUrl = '/api/v1/user';
    // get the form data
    // there are many ways to get this data using jQuery (you can use the class or id also)
    var formData = {
        "address": $('input[id=user_address]').val(),
        "firstName": $('input[id=user_fname]').val(),
        "lastName": $('input[id=user_lname]').val(),
        "emailId": $('input[id=user_email]').val(),
        "status": "ENABLED"
    };
    // process the form
    $.ajax({
        type: httpMethod, // define the type of HTTP verb we want to use
        url: httpUrl, // the url where we want to communicate
        data: JSON.stringify(formData), // our data object
        headers: {
            "content-type": "application/json"
        },
        datatype: "json", // what type of data do we expect back from the serve
        contentType: "application/json",
        statusCode: {
            201: function () {
                alertSuccess('User is successfully created');
                showSection('#userList');
                userListCall();
            },
            202: function () {
                alertSuccess('User is successfully updated');
                showSection('#userList');
                userListCall();
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

function userListCall() {
    $.ajax({
        type: 'GET', // define the type of HTTP verb we want to use (POST for our form)
        url: '/api/v1/user', // the url where we want to POST
        datatype: "json", // what type of data do we expect back from the serve
        headers: {
        	"content-type": "application/json"
        },
        statusCode: {
            200: function (request) {
                userList(request);
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
    var values = ["id", "firstName", "emailId", "address", "createdDateTime"];
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
                    td.appendChild(document.createTextNode(userId));
                } else {
                    td.appendChild(document.createTextNode(userValues[iLoop][values[jLoop]]));
                }
                tr.appendChild(td);
            }
            if (jLoop === values.length) {
                // Anchor tag for Edit
//                var callFunction = 'editUserForm('.concat(userId).concat(')');
//                var anchor = document.createElement('a');
//                var i = document.createElement('i');
//                i.setAttribute('class', 'fa fa-pencil-square-o');
//                anchor.appendChild(i);
//                anchor.setAttribute('title', 'Edit User');
//                anchor.setAttribute('onclick', callFunction);
//                td.appendChild(anchor);
//                tr.appendChild(td);

                // Anchor tag for delete
                var callFunction = 'confirmDeleteUser(' + userId + ')';
                var anchor = document.createElement('a');
                var i = document.createElement('i');
                i.setAttribute('class', 'fa fa-trash');
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

function deleteUser(id) {
    $.ajax({
        type: 'DELETE', // define the type of HTTP verb we want to use
        url: '/api/v1/user/' + id, // the url where we want to DELETE

        headers: {
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
                window.location = 'index.html';
            },
            401: function () {
                alertDanger('Please Login to Continue');
                window.location = 'index.html';
            }
        }
    });
}

function deleteData(user) {
    // do your stuffs with id
    alertSuccess(user + " deleted successfully!");
    $('#confirmModal').modal('hide'); // now close modal
}
