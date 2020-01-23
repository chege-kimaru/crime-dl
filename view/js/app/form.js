function submit(form, url, successAlert, errorAlert, type, callback) {

    var request;
    form.submit(function (event) {
        // Prevent default posting of form - put here to work in case of errors
        event.preventDefault();

        if(type === 'CASE') {
            $('#offenceIdInputField').val(localStorage.getItem('OFFENCE'));
        }
        if(type === 'REGISTER') {
            if($('#password').val() !== $('#confirmPassword').val()) {
                errorAlert.find('p').text('Passwords Do not Match');
                errorAlert.show();
                return;
            } else {
                errorAlert.find('p').text('Error occurred while registering.');
            }
        }


        successAlert.hide();
        errorAlert.hide();

        // Abort any pending request
        if (request) {
            request.abort();
        }

        // Let's select and cache all the fields
        var inputs = form.find("input, select, button, textarea");

        // Serialize the data in the form
        var serializedFormData = form.serializeArray();
        var formDataObj = {};
        $.each(serializedFormData, function (i, v) {
            formDataObj[v.name] = v.value;
        });
        var data = JSON.stringify(formDataObj);

        // Let's disable the inputs for the duration of the Ajax request.
        // Note: we disable elements AFTER the form data has been serialized.
        // Disabled form elements will not be serialized.
        inputs.prop("disabled", true);

        // Fire off the request to /form.php
        request = $.ajax({
            url: url,
            type: "post",
            contentType: "application/json",
            dataType: "json",
            data: data,
            headers: {
                'Authorization': localStorage.getItem('jwt')
            },
        });

        // Callback handler that will be called on success
        request.done(function (response, textStatus, jqXHR) {
            callback(true, response);
            successAlert.show();

            form[0].reset();
        });

        // Callback handler that will be called on failure
        request.fail(function (jqXHR, textStatus, errorThrown) {
            errorAlert.show();
        });

        // Callback handler that will be called regardless
        // if the request failed or succeeded
        request.always(function () {
            // Reenable the inputs
            inputs.prop("disabled", false);
        });

    });
}