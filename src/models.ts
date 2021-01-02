export interface Identificator {
    id: number
}

export interface ITeacher extends Identificator {
    fullname: string,
    birthdate: Date,
    carier_start: Date,
}

export interface ILesson extends Identificator {
    day: Day
    subject: Subject,
    start_time: StartTime,
}

export interface IClassroom extends Identificator {
    class_number: number,
}

export enum Day {
    MONDAY = 1,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
}

export enum StartTime {
    '08-30' = 1,
    '10-25',
    '12:20',
    '14:15',
    '16:10',
}

export enum Subject {
    Biology = 1,
    Math,
    Physics,
    Chemistry,
}

export class Lesson implements ILesson {
    constructor(
        public id: number,
        public subject: Subject,
        public start_time: StartTime,
        public day: Day,
    ) { }
}

export class Teacher implements ITeacher {
    constructor(
        public id: number,
        public fullname: string,
        public birthdate: Date,
        public carier_start: Date,
    ) { }
}

export class Classroom implements IClassroom {
    constructor(public id: number, public class_number: number) { }
}
