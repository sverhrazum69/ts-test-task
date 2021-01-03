interface Identificator {
    id: number
}

export interface ITeacher extends Identificator {
    fullname: string,
    birthdate: Date,
    carier_start: Date,
    gender: Sex
}

export interface ILesson extends Identificator {
    day: Day
    subject: Subject,
    start_time: StartTime,
    teacher_id: number,
    classroom_id: number
}

export interface IClassroom extends Identificator {
    class_number: number,
}

export enum Sex {
    MALE = 'm',
    FEMALE = 'f',
    OTHER = 'o',
}

export enum Day {
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday',
}

export enum StartTime {
    FIRST = '08-30',
    SECOND = '10-25',
    THIRD = '12:20',
    FOURTH = '14:15',
    FIFTH = '16:10',
}

export enum Subject {
    BIOLOGY = 'biology',
    MATH = 'math',
    PHYSICS = 'physics',
    CHEMISTRY = 'chemistry',
}

export class Lesson implements ILesson {
    constructor(
        public id: number,
        public subject: Subject,
        public start_time: StartTime,
        public day: Day,
        public teacher_id: number,
        public classroom_id: number,
    ) { }
}

export class Teacher implements ITeacher {
    constructor(
        public id: number,
        public fullname: string,
        public birthdate: Date,
        public carier_start: Date,
        public gender: Sex,
    ) { }
}

export class Classroom implements IClassroom {
    constructor(public id: number, public class_number: number) { }
}
