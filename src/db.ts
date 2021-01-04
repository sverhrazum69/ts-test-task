import { Pool, QueryResult } from 'pg';
import { ITeacher } from './models';

class TeacherCrudOperations {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: Number.parseInt(process.env.DB_PORT || '5432', 10),
        });
    }

    async create(params: Omit<ITeacher, 'id'>) {
        const queryText = 'INSERT INTO public."Teacher"(fullname, birthdate, carier_start, gender) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [params.fullname, params.birthdate, params.carier_start, params.gender];
        const insertedRec = (await this.pool.query(queryText, values) as QueryResult<ITeacher>).rows[0];
        return insertedRec;
    }

    async retrieve(params?: Partial<ITeacher>) {
        const queryText: string = 'SELECT * FROM public."Teacher" ';
        if (!params) {
            const records = (await this.pool.query(queryText) as QueryResult<ITeacher>).rows;
            return records;
        }
        const filters = {
            id: params.id,
            fullname: params.fullname,
            birthdate: params.birthdate,
            carier_start: params.carier_start,
            gender: params.gender,
        };
        const filterArr:string[] = [];
        let strFilters:string = '';
        for (const [key, value] of Object.entries(filters)) {
            if (value) {
                filterArr.push(`${key}='${value}'`);
            }
        }
        if (filterArr.length > 0) {
            strFilters = `WHERE ${filterArr.join(' AND ')}`;
        }
        const records = (await this.pool.query(queryText + strFilters) as QueryResult<ITeacher>).rows;
        return records;
    }

    async update(id:number, params: Partial<Omit<ITeacher, 'id'>>) {
        const queryText: string = 'UPDATE public."Teacher" SET {} WHERE id=$1 RETURNING *';
        const propertiesArr: string[] = [];
        const fieldsToUpdate = {
            fullname: params.fullname,
            birthdate: params.birthdate,
            carier_start: params.carier_start,
            gender: params.gender,
        };
        for (const [key, value] of Object.entries(fieldsToUpdate)) {
            if (value) {
                propertiesArr.push(`${key}='${value}'`);
            }
        }
        if (propertiesArr.length === 0) throw new Error('No fields to update');
        const propertiesStr = propertiesArr.join(', ');
        const updatedRecord = (await this.pool.query(queryText.replace('{}', propertiesStr), [id]) as QueryResult<ITeacher>).rows[0];
        return updatedRecord;
    }

    async delete(id: number) {
        const queryText: string = 'DELETE FROM public."Teacher" WHERE id=$1 RETURNING *';
        const deletedReacord = (await this.pool.query(queryText, [id]) as QueryResult<ITeacher>).rows;
        if (deletedReacord.length < 1) throw new Error(`Recotd with id ${id} doesnt exist`);
        return deletedReacord[0];
    }

    async getTargetMathTeachers() {
        const queryText: string = `SELECT distinct(public."Teacher".id) as id, fullname, birthdate, carier_start, gender from public."Lesson"
        INNER JOIN public."Teacher" ON teacher_id = public."Teacher".id
        INNER JOIN public."Classroom" ON classroom_id=public."Classroom".id 
        WHERE subject='math' and class_number=100 and DATE_PART('year', NOW()) - DATE_PART('year', carier_start) > 10 and day='thursday'
            and TO_TIMESTAMP(start_time::text, 'HH24-MI') between  TO_TIMESTAMP('08-30', 'HH24-MI') and TO_TIMESTAMP('14-30', 'HH24-MI');`;
        const teachers = (await this.pool.query(queryText) as QueryResult<ITeacher>).rows;
        return teachers;
    }
}
export default TeacherCrudOperations;
