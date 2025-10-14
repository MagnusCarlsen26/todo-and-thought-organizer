import express from 'express';
import categorizationRoutes from './src/routes/categorization/transcribe.ts';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.json({ limit: '50mb' }));

app.use('/categorization', categorizationRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Express with TypeScript!');
});

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  app.listen(port,"0.0.0.0",() => console.log(`Server running on port ${port}`));
}

export default app;