ko.bindingHandlers.enterStudentData = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('keyup', function(event) {
            if(event.keyCode == 13) {
                var student = $(this).val();
                viewModel.insert(student);
				$(this).val('');
            }
        });
    }
};

ko.bindingHandlers.clickToCheck = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('click', function(event) {
            var studentId = $(this).find('.hidden-student-id').text();
            var student  = J.DataStorage.StudentsStorage.getStudentById(studentId);
            if(student) {
                var studentPresent = student.present();
                student.present(!studentPresent);
				J.DataManager.StudentsList.saveAttendance();
            }	
        });
    }
};