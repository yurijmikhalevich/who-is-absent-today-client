
$(document).ready(function() { 
	J.DataManager.StudentsList.initStorage(J.DataStorage.StudentsStorage);
    $('.new-student').find('input').val('');
	var date = new Date();
    J.DataManager.DateManager.setDate({ day : date.getUTCDate(), month : date.getMonth() + 1, year : date.getFullYear()  });
	ko.applyBindings(J.DataManager.StudentsList, $('.student-list').get(0));
    ko.applyBindings(J.DataManager.DateManager, $('.date').get(0));
    $('#calendar').Calendar({ weekStart : 1 })
        .on('changeDay', function(event){
            J.DataManager.DateManager.setDate({ day : event.day.valueOf(), month : event.month.valueOf(), year : event.year.valueOf()});
			J.DataManager.StudentsList.getAttendance();
        });
	J.DataManager.StudentsList.get();
});