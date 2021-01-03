import TeacherCrudOperations from './db';

const teacherCrudOperations = new TeacherCrudOperations();

teacherCrudOperations.delete(3).then((data) => {
    console.log(data);
}).catch((err) => {
    console.error(err);
});
