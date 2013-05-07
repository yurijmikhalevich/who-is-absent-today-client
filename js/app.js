
$(document).ready(function() { 
	J.DataManager.StudentsList.initStorage(J.DataStorage.StudentsStorage);
	
	var date = new Date();
    currentDate.setDate({ day : date.getUTCDate() + 1, month : date.getMonth() + 1, year : date.getFullYear()  });
	ko.applyBindings(J.DataManager.StudentsList, $('.student-list').get(0));
    ko.applyBindings(currentDate, $('.date').get(0));
    $('#calendar').Calendar({ weekStart : 1 })
        .on('changeDay', function(event){
            currentDate.setDate({ day : event.day.valueOf(), month : event.month.valueOf(), year : event.year.valueOf()});
			J.DataManager.StudentsList.getAttendance();
        });
	J.DataManager.StudentsList.get();
});