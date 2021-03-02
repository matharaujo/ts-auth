import { createConnection } from 'typeorm';

export default async () => {
    await createConnection().then(() => console.log('Successfully connected with database'));
}
