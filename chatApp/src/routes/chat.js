const { Router } = require("express")

const router = Router();
const { sample, connect } = require("../controller/chat")

router.route("/").get(sample)
router.route('/connect').get(connect)

module.exports = router;