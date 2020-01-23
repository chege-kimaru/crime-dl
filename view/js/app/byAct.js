$.ajax({
    url: 'http://localhost/crime_dl/api/act/read.php',
    dataType: 'json',
    success: function (data) {
        $('#acts').empty();
        $.each(data.data, function (i, act) {
            $('#acts').append(
                '<div class="panel panel-primary" id="act' + act.id + 'root">\n' +
                ' <div class="panel-heading" id="actHeading' + act.id + '">\n' +
                '   <h4 class="panel-title">\n' +
                '    <a id="act' + act.id + 'title" data-toggle="collapse" data-parent="#acts" href="#act' + act.id + '">' + act.title + '</a>\n' +
                '   </h4>\n' +
                ' </div>\n' +
                ' <div id="act' + act.id + '" class="panel-collapse collapse">\n' +
                '    <div class="panel-body">\n' +
                '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteAct()"><i class="fa fa-trash"></i></button>' +
                '       <button class="btn btn-success ADMIN-ONLY" onclick="editActClicked()" data-toggle="modal" data-target="#editActModal"><i class="fa fa-pencil"></i></button></b>' +
                '       <div class="panel-group" id="offencesAct' + act.id + '">\n' +

                '       </div>\n' +
                '    </div>\n' +
                ' </div>\n' +
                '</div>'
            );
            $('#actHeading' + act.id).click(function (event) {
                $('#offencesAct' + act.id).append('<div class="text-center"><img src="../images/loading.gif" alt="Loading"  width="150" height="150"></div>');
                localStorage.setItem('ACT', act.id);
                $.ajax({
                    url: 'http://localhost/crime_dl/api/offence/read.php?act_id=' + act.id,
                    dataType: 'json',
                    success: function (data) {
                        let i = 0;
                        $('#offencesAct' + act.id).empty();
                        $.each(data.data, function (i, offence) {
                            i++;
                            $('#offencesAct' + act.id).append(
                                '<div class="panel panel-default" id="actOffence' + offence.id + 'root">\n' +
                                ' <div class="panel-heading" style="background: linear-gradient(to bottom, #cccccc, #ffe5e5);">\n' +
                                '   <h4 class="panel-title">\n' +
                                '    <a id="actOffenceHeading' + offence.id + '" data-toggle="collapse" data-parent="#offencesAct' + act.id + '"  href="#actOffence' + offence.id + '">' + 'Offence ' + i + ': ' + offence.title + '</a>\n' +
                                '   </h4>\n' +
                                ' </div>\n' +
                                ' <div id="actOffence' + offence.id + '" class="panel-collapse collapse">\n' +
                                '    <div class="panel-body">\n' +
                                '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteActOffence()"><i class="fa fa-trash"></i></button>' +
                                '       <button class="btn btn-success ADMIN-ONLY" onclick="editActOffenceClicked()" data-toggle="modal" data-target="#editActOffenceModal"><i class="fa fa-pencil"></i></button></b><br>' +
                                '       <b><p id="actOffence' + offence.id + 'title">' + offence.title + '</p></b><br>' +
                                '       <p id="actOffence' + offence.id + 'description">' + offence.description + '</p>' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                                '          <b>Penalty: </b>' +
                                '          <p id="actOffence' + offence.id + 'penalty">' + offence.penalty + '</p>' +
                                '        </div>' +
                                '       </div>\n' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                                '          <b>Full Provision: </b>' +
                                '          <p id="actOffence' + offence.id + 'fullProvision">' + offence.full_provision + '</p>' +
                                '        </div>' +
                                '       </div>\n' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body">' +
                                '          <b>View cases:</b> <button class="btn btn-success ADMIN-ONLY" data-toggle="modal" data-target="#caseFormModal"><i class="fa fa-plus"></i></button></p>' +
                                '          <div class="panel-group" id="actOffence' + offence.id + 'Cases">' +
                                '          </div>' +
                                '        </div>' +
                                '       </div>\n' +
                                '    </div>\n' +
                                ' </div>\n' +
                                '</div>'
                            );
                            $('#actOffenceHeading' + offence.id).click(function (event) {
                                localStorage.setItem('OFFENCE', offence.id);
                            });

                        });
                        $.each(data.data, function (i, offence) {
                            $.ajax({
                                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + offence.id,
                                dataType: 'json',
                                success: function (data) {
                                    var i = 0;
                                    $('#actOffence' + offence.id + 'Cases').empty();
                                    $.each(data.data, function (i, casec) {
                                        i++;
                                        $('#actOffence' + offence.id + 'Cases').append(
                                            '<div class="panel panel-default">\n' +
                                            ' <div class="panel-heading" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);" id="actOffence' + offence.id + 'Case' + casec.id + 'heading">\n' +
                                            '   <h4 class="panel-title">\n' +
                                            '    <a data-toggle="collapse" data-parent="#actOffence' + offence.id + 'Cases" href="#actOffence' + offence.id + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                                            '   </h4>\n' +
                                            ' </div>\n' +
                                            ' <div id="actOffence' + offence.id + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                                            '    <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">\n' +
                                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteActOffenceCase()"><i class="fa fa-trash"></i></button>' +
                                            '       <button class="btn btn-success ADMIN-ONLY" onclick="editActOffenceCaseClicked()" data-toggle="modal" data-target="#editActOffenceCaseModal"><i class="fa fa-pencil"></i></button></b><br>' +
                                            '       <p id="actOffence' + offence.id + 'Case' + casec.id + 'description">' + casec.description + '</p>\n' +
                                            '    </div>' +
                                            ' </div>\n' +
                                            '</div>'
                                        );
                                        $('#actOffence' + offence.id + 'Case' + casec.id + 'heading').click(function (event) {
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
            });
        });
    }
});