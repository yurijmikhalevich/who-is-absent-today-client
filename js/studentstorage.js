/**
  *
  *
  */
J.DataStorage.StudentsStorage = { 
	
	__innerStorage : ko.observableArray(),
	
	getStorage : function() { 
		return this.__innerStorage;
	},
	
	makeStudentsHere : function() {
		var i = 0, len = this.__innerStorage().length;
		while(i < len){ 
			this.__innerStorage()[i].present(false);
			++i;
		}
	},
	
	insert : function(studentData) {
		var student = this.getStudentById(studentData.id);
		var name = studentData.name.split(' ');
		if(!student) {			
			if(name.length == 1) {
				this.__innerStorage.push({
					id : studentData._id,
					firstName : ko.observable(name[0]),
					lastName : ko.observable(''),
					present : ko.observable(false)
				});	
			}else{
				this.__innerStorage.push({
					id : studentData._id,
					firstName : ko.observable(name[0]),
					lastName : ko.observable(name[1]),
					present : ko.observable(false)
				});
			}
			
		}else{
			student.firstName(name[0]);
			if(name.length == 2) {
				student.lastName(name[1]);
			}else{
				student.lastNmae(' ');
			}
		}
	},
	
	remove : function(id) {
		var student = this.getStudentById(id);
		if(student) {
			this.__innerStorage.remove(student);
			return student;
		}else{
			console.log('Student does not exists !');
			return null;
		}
	},
	
	getStudentById : function(id) {
		var i = 0, len = this.__innerStorage().length;
		while(i < len) {
			if(this.__innerStorage()[i].id == id) {
				return this.__innerStorage()[i];
			}
		 	++i;
		}
		return null;
	},
	
	getPresentList : function() {
		var i = 0, len = this.__innerStorage().length, result = [];
		while(i < len) {
			if(this.__innerStorage()[i].present()) {
				result.push(this.__innerStorage()[i].id);
			}
			++i;
		}
		return result.join(',');
	}
};