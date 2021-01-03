import express from 'express';
import bodyParser from 'body-parser';
import TeacherCrudOperations from './db';

const app = express();
const teacherCrudOperations = new TeacherCrudOperations();

app.use(bodyParser.json());

app.post('/create', async (req, res) => {
    try {
        const createdTeacher = await teacherCrudOperations.create(req.body);
        return res.status(201).json(createdTeacher);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.get('/retrieve', async (req, res) => {
    try {
        const retrievedTeachers = await teacherCrudOperations.retrieve(req.query);
        return res.status(200).json(retrievedTeachers);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.patch('/update/:id', async (req, res) => {
    try {
        const updatedTeacher = await teacherCrudOperations.update(Number.parseInt(req.params.id, 10), req.body);
        return res.status(200).json(updatedTeacher);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.delete('/delete/:id', async (req, res) => {
    try {
        const updatedTeacher = await teacherCrudOperations.delete(Number.parseInt(req.params.id, 10));
        return res.status(200).json(updatedTeacher);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.get('/', async (req, res) => {
    try {
        const retrievedTeachers = await teacherCrudOperations.getTargetMathTeachers();
        return res.status(200).json(retrievedTeachers);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

app.listen(process.env.SERVER_PORT || 5000);
