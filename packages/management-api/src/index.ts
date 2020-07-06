import { PORT } from 'src/configuration';
import { getApp } from 'src/app';
import getDb from 'src/db';

const startServer = () => {
  try {
    const app = getApp();
    app.listen(PORT, async ()  => {
      const db = getDb;
      console.log(`server started at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
