const {createUser,getUserByUserId,getUsers,updateUsers,deleteUser,login} = require("../controller/userController");
const router = require("express").Router();
const {checkToken} = require("../auth/token_validation");

router.post("/",checkToken, createUser);
router.get("/",checkToken,getUsers);
router.get("/:id",checkToken,getUserByUserId);
router.patch("/",checkToken,updateUsers);
router.delete("/",checkToken,deleteUser);
router.post("/login", login);


module.exports = router;