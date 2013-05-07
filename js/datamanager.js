/**
  * Object provides methods(insert, get, update, remove) for manipulating student's data 
  */

J.DataManager.StudentsList = {
	
	__storage : null,
	
	storage : function() { 
		return this.__storage;
	},
	
	initStorage : function(storage) {
		if(storage) {
			this.__storage = storage;
		}
	},
	
	insert : function(name) {
		var self = this;
		$.ajax({
			type : 'post',
			data : { name : name },
			url : '/students/insert/',
			dataType : 'json', 
			success : function(data) {
				console.log(data);
				self.__storage.insert(data);
			}
		});
	},
	
	get : function() {
		var self = this;
		$.ajax({
			type : 'get',
			url : '/students/',
			dataType : 'json',
			success : function(data) {
				var i = 0, len = data.length;
				while(i < len) {
					self.__storage.insert(data[i]);
					++i;
				}
				if(len != 0){
					self.getAttendance();
				}
			}
		});
	},
	
	update : function(id, name) {
		$.ajax({
			type : 'post',
			url : '/students/update/',
			data : { id : id, name : name },
			dataType : 'json',
			success : function(data) {
				console.log('ok, updated');
			}			
		});
	},
	
	remove : function(id) {
		$.ajax({
			type : 'post',
			url : '/students/remove/',
			data : { id : id },
			dataType : 'json',
			success : function(data) {
				console.log('ok, removed');
			}
		});
	},
	
	saveAttendance : function() {
		var self = this, presentList = self.__storage.getPresentList();
		if(presentList.length == 0) return;
		$.ajax({
			type : 'post',
			url : '/attendance/save/',
			data : { date : currentDate.getISODate(), present : presentList },
			dataType : 'json', 
			success : function(data) {
				console.log(data);
			}
		});
	},
	
	getAttendance : function() {
		var self = this;
		$.ajax({
			type : 'get',
			url : '/attendance/',
			data : { date : currentDate.getISODate() },
			dataType : 'json',
			success : function(data) {
				self.__storage.makeStudentsHere();
				var i = 0, len = data.present.length;
				while(i < len) {
					var student = self.__storage.getStudentById(data.present[i]);
					if(student)
						student.present(true);
					++i;
				}
			}
		});
	}
};