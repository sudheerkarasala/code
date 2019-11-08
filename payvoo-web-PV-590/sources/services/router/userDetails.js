/**
 * userDetail route
 * This is a route file, to fetch the Individual user details.
 * @package signup
 * @subpackage sources\services\router\userDetails
 * @author SEPA Cyper Technologies, krishnakanth.r
 */

"use strict";

var userDetail = require('../controller/userDetails/userDetails');

router.post('/service/userDetails', userDetail.details);

router.get('/service/v1/userList', (request, response) => {
  userDetail.index(request, response).then((list) => {
    response.send(list);
  }, (error) => {
    response.status(400).send(error);
  })
})


module.exports = router;