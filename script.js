function Student(name, marks) {
	this.name = name;
	this.marks = marks; 
};

Student.prototype.averageMarks = function() {
	let sumMarks = this.marks.reduce((accumulator, currentValue) => accumulator + currentValue);
    let averageMark = sumMarks / this.marks.length;

    return averageMark;
};