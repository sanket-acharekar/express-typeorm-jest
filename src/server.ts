import app from './app';
import { AppDataSource } from './ormconfig';

const port = process.env.PORT || 3000;

// Initialize the database and start the server
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error initializing the database:', error);
  });
