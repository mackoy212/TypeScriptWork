"use strict";
// Enums
var StudentStatus;
(function (StudentStatus) {
    StudentStatus["Active"] = "Active";
    StudentStatus["Academic_Leave"] = "Academic_Leave";
    StudentStatus["Graduated"] = "Graduated";
    StudentStatus["Expelled"] = "Expelled";
})(StudentStatus || (StudentStatus = {}));
var CourseType;
(function (CourseType) {
    CourseType["Mandatory"] = "Mandatory";
    CourseType["Optional"] = "Optional";
    CourseType["Special"] = "Special";
})(CourseType || (CourseType = {}));
var Semester;
(function (Semester) {
    Semester["First"] = "First";
    Semester["Second"] = "Second";
})(Semester || (Semester = {}));
var GradeValue;
(function (GradeValue) {
    GradeValue[GradeValue["Excellent"] = 5] = "Excellent";
    GradeValue[GradeValue["Good"] = 4] = "Good";
    GradeValue[GradeValue["Satisfactory"] = 3] = "Satisfactory";
    GradeValue[GradeValue["Unsatisfactory"] = 2] = "Unsatisfactory";
})(GradeValue || (GradeValue = {}));
var Faculty;
(function (Faculty) {
    Faculty["Computer_Science"] = "Computer_Science";
    Faculty["Economics"] = "Economics";
    Faculty["Law"] = "Law";
    Faculty["Engineering"] = "Engineering";
})(Faculty || (Faculty = {}));
// Class
class UniversityManagementSystem {
    constructor() {
        this.students = [];
        this.courses = [];
        this.grades = [];
        this.nextStudentId = 1;
        this.nextCourseId = 1;
    }
    // Method to enroll a student
    enrollStudent(student) {
        const newStudent = Object.assign(Object.assign({}, student), { id: this.nextStudentId++ });
        this.students.push(newStudent);
        return newStudent;
    }
    // Method to register a student for a course
    registerForCourse(studentId, courseId) {
        const student = this.students.find(s => s.id === studentId);
        const course = this.courses.find(c => c.id === courseId);
        if (!student || !course) {
            throw new Error('Student or Course not found');
        }
        const enrolledStudentsCount = this.grades.filter(g => g.courseId === courseId).length;
        if (enrolledStudentsCount >= course.maxStudents) {
            throw new Error('Course is full');
        }
        if (student.faculty !== course.faculty) {
            throw new Error('Faculty mismatch');
        }
        this.grades.push({ studentId, courseId, grade: GradeValue.Satisfactory, date: new Date(), semester: course.semester });
    }
    // Method to set a grade for a student in a course
    setGrade(studentId, courseId, grade) {
        const gradeRecord = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);
        if (!gradeRecord) {
            throw new Error('Student is not registered for the course');
        }
        gradeRecord.grade = grade;
        gradeRecord.date = new Date();
    }
    // Method to update a student's status
    updateStudentStatus(studentId, newStatus) {
        const student = this.students.find(s => s.id === studentId);
        if (!student) {
            throw new Error('Student not found');
        }
        student.status = newStatus;
    }
    // Method to get students by faculty
    getStudentsByFaculty(faculty) {
        return this.students.filter(s => s.faculty === faculty);
    }
    // Method to get grades of a student
    getStudentGrades(studentId) {
        return this.grades.filter(g => g.studentId === studentId);
    }
    // Method to get available courses by faculty and semester
    getAvailableCourses(faculty, semester) {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }
    // Method to calculate the average grade of a student
    calculateAverageGrade(studentId) {
        const studentGrades = this.getStudentGrades(studentId);
        if (studentGrades.length === 0) {
            return 0;
        }
        const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
        return total / studentGrades.length;
    }
    // Method to get top students by faculty
    getTopStudents(faculty) {
        const facultyStudents = this.getStudentsByFaculty(faculty);
        return facultyStudents.filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id);
            return averageGrade === 5;
        });
    }
}
// Example usage
const ums = new UniversityManagementSystem();
//# sourceMappingURL=Work7.js.map