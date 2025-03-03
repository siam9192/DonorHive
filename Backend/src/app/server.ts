import mongoose from 'mongoose';
import envConfig from './config/env.config';
import app from './app';

async function main() {
  try {
    const connection = await mongoose.connect(envConfig.url.database as string);

    app.listen(5000, () => {
      console.log('Server is connected');
    });
  } catch (error) {
    console.log(error);
  }
}

main();
