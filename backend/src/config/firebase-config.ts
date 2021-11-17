const admin = require("firebase-admin");
import serviceAccount from "./serviceAccount.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
