import { createApp } from "./app";
import { config } from "./config";

process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
});

const app = createApp();

app.listen(config.port, () => {
  console.log(`Usage Metering Service listening on :${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
});
