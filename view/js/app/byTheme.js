$.ajax({
    url: 'http://localhost/crime_dl/api/theme/read.php',
    dataType: 'json',
    success: function (data) {
        $('#themes').empty();
        $.each(data.data, function (i, theme) {
            $('#themes').append(
                '<div class="panel panel-success"  id="theme' + theme.id + 'root">\n' +
                ' <div class="panel-heading" id="themeHeading' + theme.id + '" id="theme' + theme.id + 'root">\n' +
                '   <h4 class="panel-title">\n' +
                '    <a id="theme' + theme.id + 'title" data-toggle="collapse" data-parent="#themes" href="#theme' + theme.id + '">' + theme.title + '</a>\n' +
                '   </h4>\n' +
                ' </div>\n' +
                ' <div id="theme' + theme.id + '" class="panel-collapse collapse">\n' +
                '    <div class="panel-body">\n' +
                '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteTheme()"><i class="fa fa-trash"></i></button>' +
                '       <button class="btn btn-success ADMIN-ONLY" onclick="editThemeClicked()" data-toggle="modal" data-target="#editThemeModal"><i class="fa fa-pencil"></i></button></b>' +
                '       <div class="panel-group" id="offencesTheme' + theme.id + '">\n' +

                '       </div>\n' +
                '    </div>\n' +
                ' </div>\n' +
                '</div>'
            );
            $('#themeHeading' + theme.id).click(function (event) {
                $('#offencesTheme' + theme.id).append('<div class="text-center"><img src="../images/loading.gif" alt="Loading"  width="150" height="150"></div>');
                localStorage.setItem('THEME', theme.id);
                $.ajax({
                    url: 'http://localhost/crime_dl/api/offence/read.php?theme_id=' + theme.id,
                    dataType: 'json',
                    success: function (data) {
                        var i = 0;
                        $('#offencesTheme' + theme.id).empty();
                        $.each(data.data, function (i, offence) {
                            i++;
                            $('#offencesTheme' + theme.id).append(
                                '<div class="panel panel-default" id="themeOffence' + offence.id + 'root">\n' +
                                ' <div class="panel-heading" style="background: linear-gradient(to bottom, #cccccc, #ffe5e5);">\n' +
                                '   <h4 class="panel-title">\n' +
                                '    <a id="themeOffenceHeading' + offence.id + '" data-toggle="collapse" data-parent="#offencesTheme' + theme.id + '"  href="#themeOffence' + offence.id + '">' + 'Offence ' + i + ': ' + offence.title + '</a>\n' +
                                '   </h4>\n' +
                                ' </div>\n' +
                                ' <div id="themeOffence' + offence.id + '" class="panel-collapse collapse">\n' +
                                '    <div class="panel-body">\n' +
                                '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteThemeOffence()"><i class="fa fa-trash"></i></button>' +
                                '       <button class="btn btn-success ADMIN-ONLY" onclick="editThemeOffenceClicked()" data-toggle="modal" data-target="#editThemeOffenceModal"><i class="fa fa-pencil"></i></button></b><br>' +
                                '       <b><p id="themeOffence' + offence.id + 'title">' + offence.title + '</p></b><br>' +
                                '       <p id="themeOffence' + offence.id + 'description">' + offence.description + '</p>' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                                '          <b>Penalty: </b>' +
                                '          <p id="themeOffence' + offence.id + 'penalty">' + offence.penalty + '</p>' +
                                '        </div>' +
                                '       </div>\n' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">' +
                                '          <b>Full Provision: </b>' +
                                '          <p id="themeOffence' + offence.id + 'fullProvision">' + offence.full_provision + '</p>' +
                                '        </div>' +
                                '       </div>\n' +
                                '       <div class="panel panel-default">\n' +
                                '        <div class="panel-body">' +
                                '          <b>View cases: <button class="btn btn-success ADMIN-ONLY" data-toggle="modal" data-target="#caseFormModal"><i class="fa fa-plus"></i></button></b>' +
                                '          <div class="panel-group" id="themeOffence' + offence.id + 'Cases">' +
                                '          </div>' +
                                '        </div>' +
                                '       </div>\n' +
                                '    </div>\n' +
                                ' </div>\n' +
                                '</div>'
                            );
                            $('#themeOffenceHeading' + offence.id).click(function (event) {
                                localStorage.setItem('OFFENCE', offence.id);
                            });
                        });
                        $.each(data.data, function (i, offence) {
                            $.ajax({
                                url: 'http://localhost/crime_dl/api/casec/read.php?offence_id=' + offence.id,
                                dataType: 'json',
                                success: function (data) {
                                    var i = 0;
                                    $('#themeOffence' + offence.id + 'Cases').empty();
                                    $.each(data.data, function (i, casec) {
                                        i++;
                                        $('#themeOffence' + offence.id + 'Cases').append(
                                            '<div class="panel panel-default">\n' +
                                            ' <div class="panel-heading" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);" id="themeOffence' + offence.id + 'Case' + casec.id + 'heading">\n' +
                                            '   <h4 class="panel-title">\n' +
                                            '    <a data-toggle="collapse" data-parent="#themeOffence' + offence.id + 'Cases" href="#themeOffence' + offence.id + 'Case' + casec.id + '">Case ' + i + '</a>\n' +
                                            '   </h4>\n' +
                                            ' </div>\n' +
                                            ' <div id="themeOffence' + offence.id + 'Case' + casec.id + '" class="panel-collapse collapse">\n' +
                                            '    <div class="panel-body" style="background: linear-gradient(to bottom, #d9d9d9, #ffffff);">\n' +
                                            '       <button class="btn btn-danger ADMIN-ONLY" onclick="deleteThemeOffenceCase()"><i class="fa fa-trash"></i></button>' +
                                            '       <button class="btn btn-success ADMIN-ONLY" onclick="editThemeOffenceCaseClicked()" data-toggle="modal" data-target="#editThemeOffenceCaseModal"><i class="fa fa-pencil"></i></button></b><br>' +
                                            '       <p id="themeOffence' + offence.id + 'Case' + casec.id + 'description">' + casec.description + '</p>\n' +
                                            '    </div>' +
                                            ' </div>\n' +
                                            '</div>'
                                        );
                                        $('#themeOffence' + offence.id + 'Case' + casec.id + 'heading').click(function (event) {
                                            localStorage.setItem('CASE', casec.id);
                                        })
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