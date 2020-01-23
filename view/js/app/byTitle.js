$.ajax({
    url: 'http://localhost/crime_dl/api/offence/read.php',
    dataType: 'json',
    success: function (data) {
        $('#titles').empty();
        $.each(data.data, function (i, offence) {
            $('#titles').append(
                '<div class="panel panel-default" id="titleOffence' + offence.id + 'root">\n' +
                ' <div class="panel-heading" style="background: linear-gradient(to bottom, #cccccc, #ffe5e5);" id="titleOffenceHeading' + offence.id + '" >\n' +
                '   <h4 class="panel-title">\n' +
                '    <a data-toggle="collapse" data-parent="#titles"  href="#titleOffence' + offence.id + '">' + offence.title + '</a>\n' +
                '   </h4>\n' +
                ' </div>\n' +
                ' <div id="titleOffence' + offence.id + '" class="panel-collapse collapse">\n' +
                '    <div class="panel-body">\n' +
                '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteTitleOffence()"><i class="fa fa-trash"></i></button>' +
                '       <button class="btn btn-success ADMIN-ONLY" onclick="editTitleOffenceClicked()" data-toggle="modal" data-target="#editTitleOffenceModal"><i class="fa fa-pencil"></i></button></b><br>' +
                '       <b><p id="titleOffence' + offence.id + 'title">' + offence.title + '</p></b><br>' +
                '       <p id="titleOffence' + offence.id + 'description">' + offence.description + '</p>' +
                '       <div class="panel panel-default">\n' +
                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                '          <b>Penalty: </b>' +
                '          <p id="titleOffence' + offence.id + 'penalty">' + offence.penalty + '</p>' +
                '        </div>' +
                '       </div>\n' +
                '       <div class="panel panel-default">\n' +
                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                '          <b>Full Provision: </b>' +
                '          <p id="titleOffence' + offence.id + 'fullProvision">' + offence.full_provision + '</p>' +
                '        </div>' +
                '       </div>\n' +
                '       <div class="panel panel-default">\n' +
                '        <div class="panel-body">' +
                '          <b>View cases: <button class="btn btn-success ADMIN-ONLY" data-toggle="modal" data-target="#caseFormModal"><i class="fa fa-plus"></i></button></b>' +
                '          <div class="panel-group" id="titleOffence' + offence.id + 'Cases">' +
                '          </div>' +
                '        </div>' +
                '       </div>\n' +
                '    </div>\n' +
                ' </div>\n' +
                '</div>'
            );

            $('#titleOffenceHeading' + offence.id).click(function (event) {
                localStorage.setItem('OFFENCE', offence.id);
            });
        });
        $.each(data.data, function (i, offence) {
            $.ajax({
                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + offence.id,
                dataType: 'json',
                success: function (data) {
                    var i = 0;
                    $('#titleOffence' + offence.id + 'Cases').empty();
                    $.each(data.data, function (i, casec) {
                        i++;
                        $('#titleOffence' + offence.id + 'Cases').append(
                            '<div class="panel panel-default">\n' +
                            ' <div class="panel-heading" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);" id="titleOffence' + offence.id + 'Case' + casec.id + 'heading">\n' +
                            '   <h4 class="panel-title">\n' +
                            '    <a data-toggle="collapse" data-parent="#titleOffence' + offence.id + 'Cases" href="#titleOffence' + offence.id + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                            '   </h4>\n' +
                            ' </div>\n' +
                            ' <div id="titleOffence' + offence.id + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                            '    <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">\n' +
                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteTitleOffenceCase()"><i class="fa fa-trash"></i></button>' +
                            '       <button class="btn btn-success ADMIN-ONLY" onclick="editTitleOffenceCaseClicked()" data-toggle="modal" data-target="#editTitleOffenceCaseModal"><i class="fa fa-pencil"></i></button></b><br>' +
                            '       <p id="titleOffence' + offence.id + 'Case' + casec.id + 'description">' + casec.description + '</p>\n' +
                            '    </div>' +
                            ' </div>\n' +
                            '</div>'
                        );
                        $('#titleOffence' + offence.id + 'Case' + casec.id + 'heading').click(function (event) {
                            localStorage.setItem('CASE', casec.id);
                        });
                    });

                    if(localStorage.getItem('role') != 1) {
                        $('.ADMIN-ONLY').hide();
                    } else {
                        $('.ADMIN-ONLY').show();
                    }
                }
            });

        });
    }

});