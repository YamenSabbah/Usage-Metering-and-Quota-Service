import { createApp } from "./app";
import { config } from "./config";
const app = createApp();
app.listen(config.port, () => {
    console.log(`Usage Metering Service listening on :${config.port}`);
});
//# sourceMappingURL=index.js.map