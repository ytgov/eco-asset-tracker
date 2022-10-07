import { migrateDown } from "../data/migrator"

async function go() {
    await migrateDown();
    process.exit();
}

go();