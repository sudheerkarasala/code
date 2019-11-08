/**
 * checkroute route
 * This is a route file where all the checkrates related APIa are defined.
 * @package checkRate
 * @subpackage router/checkRate
 * @author SEPA Cyber Technologies, Sujit kumar , Sekhara Suman Sahu , Shashank singu.
 */

import {checkRate,deleteCheckRate} from '../controller/checkRate';

//router for inserting data into check_rates table
router.post('/service/v1/checkRate',checkRate);

//route for deleting a record in check_rates table
router.delete('/service/v1/checkRate/:check_rate_id',deleteCheckRate);

module.exports = router;
