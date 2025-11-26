import mongoose from 'mongoose';
import envConfig from './config/env.config';
import app from './app';
import RunningServices from './modules/Running/Running.service';
import UtilsServices from './modules/Utils/Utils.service';
async function main() {
  try {
    // console.log(envConfig)
    const connection = await mongoose.connect(envConfig.url.database as string);

    app.listen(5000, async () => {
      console.log('Server is connected');
      await UtilsServices.getAllExistCategories();
    });

    await RunningServices.Run();
  } catch (error) {
    console.log(error);
  }
}

main();
