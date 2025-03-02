import dotenv from 'dotenv';
import path from 'node:path';


dotenv.config({ path: path.join((process.cwd(), '.env')) });

const envConfig = {
 url:{
    database:process.env.DATABASE_URL
 }
}

export default envConfig;