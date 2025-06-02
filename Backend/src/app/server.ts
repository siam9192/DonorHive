import mongoose from 'mongoose';
import envConfig from './config/env.config';
import app from './app';
import RunningServices from './modules/Running/Running.service';
import Campaign from './modules/Campaign/campaign.model';

async function main() {
  try {
    const connection = await mongoose.connect(envConfig.url.database as string);

    app.listen(5000, () => {
      console.log('Server is connected');
    });

    await RunningServices.Run();
  } catch (error) {
    console.log(error);
  }
}

main();
