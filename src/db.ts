import { Pool, QueryResult } from 'pg';
import { ITeacher } from './models';

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: Number.parseInt(process.env.DB_PORT || '5432', 10),
});

pool.query('SELECT * FROM public."Teacher"', (err, res: QueryResult<ITeacher>) => {
    console.log(res.rows[0].fullname);
    pool.end();
});
