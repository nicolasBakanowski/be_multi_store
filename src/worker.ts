import dotenv from "dotenv";

dotenv.config();

import { validateEnv } from "./config/env";
import { startOrderWorker } from "./queue/orderWorker";

validateEnv();
startOrderWorker();
