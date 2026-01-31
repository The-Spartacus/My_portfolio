const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

(async () => {
    try {
        const dbPath = path.join(__dirname, '../mongo_data');
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath, { recursive: true });
        }

        console.log('Starting local MongoDB instance...');
        console.log(`Data directory: ${dbPath}`);

        // Create the instance with persistence
        const mongod = await MongoMemoryServer.create({
            instance: {
                port: 27017,
                dbPath: dbPath,
                storageEngine: 'wiredTiger',
                // Ensure we bind to 127.0.0.1 for the app to reach it
                ip: '127.0.0.1'
            }
        });

        const uri = mongod.getUri();

        console.log('----------------------------------------');
        console.log('✅ MongoDB Successfully Started!');
        console.log(`📡 URI: ${uri}`);
        console.log('----------------------------------------');
        console.log('KEEP THIS TERMINAL OPEN to keep the database running.');
        console.log('Press Ctrl+C to stop.');

        // Handle cleanup
        process.on('SIGINT', async () => {
            console.log('\nStopping MongoDB...');
            await mongod.stop();
            process.exit(0);
        });

    } catch (error) {
        console.error('Failed to start MongoDB:', error);
        process.exit(1);
    }
})();
