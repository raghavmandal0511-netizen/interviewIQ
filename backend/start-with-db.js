import { MongoMemoryServer } from 'mongodb-memory-server';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function start() {
  console.log('Starting in-memory MongoDB server...');
  try {
    const mongoServer = await MongoMemoryServer.create({
      instance: {
        port: 27017,
        dbName: 'interviewIQ'
      },
      binary: {
        version: '4.4.29'
      }
    });
    const uri = mongoServer.getUri();
    console.log(`In-memory MongoDB started at: ${uri}`);

    console.log('Starting backend server...');
    const child = spawn('node', ['./src/index.js'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        MONGO_URI: uri
      }
    });

    child.on('close', (code) => {
      console.log(`Backend server exited with code ${code}`);
      mongoServer.stop();
      process.exit(code);
    });
  } catch (err) {
    console.error('Failed to start in-memory MongoDB or backend server:', err);
    process.exit(1);
  }
}

start();
