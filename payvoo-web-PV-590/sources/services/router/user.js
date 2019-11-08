import { registerUser, kycEntry, isUserExists} from '../controller/signUp';
import { forgotPassword, resetPassword, updatePassword, changePassword } from '../controller/password';
import { loginUser } from '../controller/login';

// route for password
router.post("/service/user/forgotPassword", forgotPassword)
router.post("/service/user/resetPassword", resetPassword);
router.post("/service/user/forgotPassword/:type/:code", updatePassword);
router.post("/service/user/changePassword", changePassword);

//Service for user registration.
router.post('/service/user/registration', registerUser);
//Service for checking email or phone number given by user already exist or not
router.post('/service/user/isUserExists', isUserExists);

// service for user Login
router.post('/service/user/login', loginUser);
router.post('/service/user/kycEntry', kycEntry)

module.exports = router;
