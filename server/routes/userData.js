const Router = require('express-promise-router');
const userData = require('../controllers/userDataOperations.js');

const router = Router();

router.get("/user-data", userData.get);
router.post("/user-data", userData.add);
router.put("/user-data", userData.update);
router.delete("/user-data", userData.remove);

module.exports = router