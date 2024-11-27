// Enums
enum StudentStatus {
    Active = 'Active',
    Academic_Leave = 'Academic_Leave',
    Graduated = 'Graduated',
    Expelled = 'Expelled'
}

enum CourseType {
    Mandatory = 'Mandatory',
    Optional = 'Optional',
    Special = 'Special'
}

enum Semester {
    First = 'First',
    Second = 'Second'
}

enum GradeValue {
    Excellent = 5,
    Good = 4,
    Satisfactory = 3,
    Unsatisfactory = 2
}

enum Faculty {
    Computer_Science = 'Computer_Science',
    Economics = 'Economics',
    Law = 'Law',
    Engineering = 'Engineering'
}

// Interfaces
interface Student {
    id: number;
    fullName: string;
    faculty: Faculty;
    year: number;
    status: StudentStatus;
    enrollmentDate: Date;
    groupNumber: string;
}

interface Course {
    id: number;
    name: string;
    type: CourseType;
    credits: number;
    semester: Semester;
    faculty: Faculty;
    maxStudents: number;
}

interface Grade {
    studentId: number;
    courseId: number;
    grade: GradeValue;
    date: Date;
    semester: Semester;
}

// Class
class UniversityManagementSystem {
    private students: Student[] = [];
    private courses: Course[] = [];
    private grades: Grade[] = [];
    private nextStudentId: number = 1;
    private nextCourseId: number = 1;

    // Method to enroll a student
    enrollStudent(student: Omit<Student, "id">): Student {
        const newStudent: Student = { ...student, id: this.nextStudentId++ };
        this.students.push(newStudent);
        return newStudent;
    }

    // Method to register a student for a course
    registerForCourse(studentId: number, courseId: number): void {
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
    setGrade(studentId: number, courseId: number, grade: GradeValue): void {
        const gradeRecord = this.grades.find(g => g.studentId === studentId && g.courseId === courseId);

        if (!gradeRecord) {
            throw new Error('Student is not registered for the course');
        }

        gradeRecord.grade = grade;
        gradeRecord.date = new Date();
    }

    // Method to update a student's status
    updateStudentStatus(studentId: number, newStatus: StudentStatus): void {
        const student = this.students.find(s => s.id === studentId);

        if (!student) {
            throw new Error('Student not found');
        }

        student.status = newStatus;
    }

    // Method to get students by faculty
    getStudentsByFaculty(faculty: Faculty): Student[] {
        return this.students.filter(s => s.faculty === faculty);
    }

    // Method to get grades of a student
    getStudentGrades(studentId: number): Grade[] {
        return this.grades.filter(g => g.studentId === studentId);
    }

    // Method to get available courses by faculty and semester
    getAvailableCourses(faculty: Faculty, semester: Semester): Course[] {
        return this.courses.filter(c => c.faculty === faculty && c.semester === semester);
    }

    // Method to calculate the average grade of a student
    calculateAverageGrade(studentId: number): number {
        const studentGrades = this.getStudentGrades(studentId);

        if (studentGrades.length === 0) {
            return 0;
        }

        const total = studentGrades.reduce((sum, grade) => sum + grade.grade, 0);
        return total / studentGrades.length;
    }

    // Method to get top students by faculty
    getTopStudents(faculty: Faculty): Student[] {
        const facultyStudents = this.getStudentsByFaculty(faculty);
        return facultyStudents.filter(student => {
            const averageGrade = this.calculateAverageGrade(student.id);
            return averageGrade === 5;
        });
    }
}

// Example usage
const ums = new UniversityManagementSystem();
