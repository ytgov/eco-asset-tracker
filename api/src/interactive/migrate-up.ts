
import { migrateUp } from "../data/migrator"

async function go() {
    await migrateUp();
    process.exit();
}

go();