import express from "express";
import bodyParser from "body-parser";
import 'dotenv/config'
import login from "./controller/login";
import announcement from "./controller/announcement"
import announcements from "./controller/announcements"
import member from "./controller/member"
import activity from "./controller/activity"
import activities from "./controller/activities"
import refresh from "./controller/refreshtoken"
import members from "./controller/members"
import admin from "./controller/admin"
import admins from "./controller/admins"
import * as fs from 'node:fs';
import { logger } from "./controller/config";
const app = express();
const folderpath = ["./static/activity", "./static/announcement", "./static/member"]

app.use('/static', express.static('static'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.port || 8080;

app.get("/", (req: any, res: any) => {
  res.send("Hello World");
});

app.use("/login", login)
app.use("/announcement", announcement)
app.use("/announcements", announcements)
app.use("/members", members)
app.use("/member", member)
app.use("/activity", activity)
app.use("/activities", activities)
app.use("/refresh", refresh)
app.use("/admin", admin)
app.use("/admins", admins)

for (const i of folderpath) {
  if (!fs.existsSync(i)) {
    fs.mkdirSync(i, { recursive: true });
    logger.info(`Folder ${i} created`);
  } else {
    logger.info(`Folder ${i} already exist`);
  }
}

app.listen(port, () => {
  logger.info(`Listening on port ${port}...`);
});