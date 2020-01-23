function deleteThemeOffenceCase() {
    if (!confirm("Are you sure you want to delete this Case?")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('CASE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/casec/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $.ajax({
                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + localStorage.getItem('OFFENCE'),
                dataType: 'json',
                success: function (data) {
                    let i = 0;
                    $('#themeOffence' + localStorage.getItem('OFFENCE') + 'Cases').empty();
                    $.each(data.data, function (i, casec) {
                        i++;
                        $('#themeOffence' + localStorage.getItem('OFFENCE') + 'Cases').append(
                            '<div class="panel panel-default">\n' +
                            ' <div class="panel-heading">\n' +
                            '   <h4 class="panel-title" id="themeOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading">\n' +
                            '    <a data-toggle="collapse" data-parent="#themeOffence' + localStorage.getItem('OFFENCE') + 'Cases" href="#themeOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                            '   </h4>\n' +
                            ' </div>\n' +
                            ' <div id="themeOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                            '    <div class="panel-body">\n' +
                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteThemeOffenceCase()"><i class="fa fa-trash"></i></button>' +
                            '       <p>' + casec.description + '</p>\n' +
                            '    </div>' +
                            ' </div>\n' +
                            '</div>'
                        );
                        $('#themeOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading').click(function (event) {
                            localStorage.setItem('CASE', casec.id);
                        })
                    });
                }
            });
            alert('Successfully deleted case');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting case');
        }
    });
}

function deleteActOffenceCase() {
    if (!confirm("Are you sure you want to delete this Case?")) {
        return;
    }
    $('.ACTION-SUCCESS').hide();
    $('.ACTION-ERROR').hide();
    let id = {
        'id': localStorage.getItem('CASE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/casec/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $.ajax({
                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + localStorage.getItem('OFFENCE'),
                dataType: 'json',
                success: function (data) {
                    var i = 0;
                    $('#actOffence' + localStorage.getItem('OFFENCE') + 'Cases').empty();
                    $.each(data.data, function (i, casec) {
                        i++;
                        $('#actOffence' + localStorage.getItem('OFFENCE') + 'Cases').append(
                            '<div class="panel panel-default">\n' +
                            ' <div class="panel-heading" id="actOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading">\n' +
                            '   <h4 class="panel-title">\n' +
                            '    <a data-toggle="collapse" data-parent="#actOffence' + localStorage.getItem('OFFENCE') + 'Cases" href="#actOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                            '   </h4>\n' +
                            ' </div>\n' +
                            ' <div id="actOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                            '    <div class="panel-body">\n' +
                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteActOffenceCase()"><i class="fa fa-trash"></i></button>' +
                            '       <p>' + casec.description + '</p>\n' +
                            '    </div>' +
                            ' </div>\n' +
                            '</div>'
                        );
                        $('#actOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading').click(function (event) {
                            localStorage.setItem('CASE', casec.id);
                        });
                    });
                }
            });
            alert('Successfully deleted case.');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting case.');
        }
    });
}

function deleteTitleOffenceCase() {
    if (!confirm("Are you sure you want to delete this Case?")) {
        return;
    }
    $('.ACTION-SUCCESS').hide();
    $('.ACTION-ERROR').hide();
    let id = {
        'id': localStorage.getItem('CASE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/casec/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $.ajax({
                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + localStorage.getItem('OFFENCE'),
                dataType: 'json',
                success: function (data) {
                    var i = 0;
                    $('#titleOffence' + localStorage.getItem('OFFENCE') + 'Cases').empty();
                    $.each(data.data, function (i, casec) {
                        i++;
                        $('#titleOffence' + localStorage.getItem('OFFENCE') + 'Cases').append(
                            '<div class="panel panel-default">\n' +
                            ' <div class="panel-heading" id="titleOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading">\n' +
                            '   <h4 class="panel-title">\n' +
                            '    <a data-toggle="collapse" data-parent="#titleOffence' + localStorage.getItem('OFFENCE') + 'Cases" href="#titleOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                            '   </h4>\n' +
                            ' </div>\n' +
                            ' <div id="titleOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                            '    <div class="panel-body">\n' +
                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteTitleOffenceCase()"><i class="fa fa-trash"></i></button>' +
                            '       <p>' + casec.description + '</p>\n' +
                            '    </div>' +
                            ' </div>\n' +
                            '</div>'
                        );
                        $('#titleOffence' + localStorage.getItem('OFFENCE') + 'Case' + casec.id + 'heading').click(function (event) {
                            localStorage.setItem('CASE', casec.id);
                        });
                    });
                }
            });
            alert('Successfully deleted case');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting case.');
        }
    });
}


function deleteTitleOffence() {
    if (!confirm("Are you sure you want to delete this OFFENCE? Note://It wont be deleted if it contains cases.")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('OFFENCE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/offence/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $('#titleOffence' + localStorage.getItem('OFFENCE') + 'root').remove();
            alert('Successfully deleted OFFENCE');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting OFFENCE.');
        }
    });
}

function deleteActOffence() {
    if (!confirm("Are you sure you want to delete this OFFENCE? Note://It wont be deleted if it contains cases.")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('OFFENCE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/offence/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $('#actOffence' + localStorage.getItem('OFFENCE') + 'root').remove();
            alert('Successfully deleted OFFENCE');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting OFFENCE.');
        }
    });
}

function deleteThemeOffence() {
    if (!confirm("Are you sure you want to delete this OFFENCE? Note://It wont be deleted if it contains cases.")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('OFFENCE')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/offence/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $('#themeOffence' + localStorage.getItem('OFFENCE') + 'root').remove();
            alert('Successfully deleted OFFENCE');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting OFFENCE.');
        }
    });
}


function deleteAct() {
    if (!confirm("Are you sure you want to delete this ACT? Note://It wont be deleted if it contains OFFENCES.")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('ACT')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/act/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $('#act' + localStorage.getItem('ACT') + 'root').remove();
            alert('Successfully deleted ACT');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting ACT.');
        }
    });
}


function deleteTheme() {
    if (!confirm("Are you sure you want to delete this ACT? Note://It wont be deleted if it contains OFFENCES.")) {
        return;
    }
    let id = {
        'id': localStorage.getItem('THEME')
    };
    $.ajax({
        url: 'http://localhost/crime_dl/api/theme/delete.php',
        type: "post",
        contentType: "application/json",
        dataType: "json",
        headers: {
            'Authorization': localStorage.getItem('jwt')
        },
        data: JSON.stringify(id),
        success: function (data) {
            $('#theme' + localStorage.getItem('THEME') + 'root').remove();
            alert('Successfully deleted THEME');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert('Error deleting THEME.');
        }
    });
}