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

ko.bindingHandlers.clickToRemove = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('click', function(event) {
            event.stopPropagation();
            var studentId = $(this).closest('tr').find('.hidden-student-id').text();
            J.DataManager.StudentsList.remove(studentId);
        });
    }
};

ko.bindingHandlers.stopPropagation = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('click', function(event) {
            event.stopPropagation();
        });
    }
};

ko.bindingHandlers.acceptChanges = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('keyup', function(event) {
            event.stopPropagation();
            element = $(element);
            if(event.keyCode == 27) {
                var newName = element.val(),
                    studentId = viewModel.id;
                if(newName.replace(/\s+/g, ' ').length == 0) return;
                valueAccessor().update(studentId, newName);
                element.parent().removeClass('edit-mode');
            }
        });
    }
};

ko.bindingHandlers.clickToEdit = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        $(element).on('click', function(event) {
            event.stopPropagation();
            element = $(element);
            element.parent().addClass('edit-mode');
        });
    }
};