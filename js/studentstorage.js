/**
  *
  *
  */
J.DataStorage.StudentsStorage = { 
	
	__innerStorage : ko.observableArray(),
	
	getStorage : function() { 
		return this.__innerStorage;
	},

    clear : function() {
        this.__innerStorage.removeAll();
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
		var name = $.trim(studentData.name).replace(/\s+/g, ' ');
		if(!student) {
            this.__innerStorage.push({
                id : studentData._id,
                name : ko.observable(name),
                present : ko.observable(false)
            });
		}else{
			student.name(name);
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