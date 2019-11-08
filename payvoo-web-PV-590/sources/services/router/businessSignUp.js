/**
 * businessSignUp route
 * This is a route file, where all the business related services such as, for registering business, businessIndustries,
 * and business sector details as well as to get the business type and sector type also defined. 
 * @package businessSignUp
 * @subpackage router\businessSignUp
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu , Satyanarayana G.
 */
"use strict";

var business = require('../controller/businessSignup/businessSignup');

//route for business registration service.
// router.post('/service/businessRegistration', function (req, res) {
//     business.businessSignUp(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });

//route for get business_type service.
// router.get('/service/businessType', function (req, res) {
//     business.getBusiness(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });

//route for get sector_type service.
// router.get('/service/sectorType', function (req, res) {
//     business.getSector(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });

// foute for get business sector industries details
router.post('/service/businessSectorIndustriesDetails', function (req, res) {
    business.postSectorAndIndustries(req, res).then(function (response) {
        res.send(response);
    }, function (error) {
        res.send(error);
    });
});

//route for getting business_sector_details.
// router.post('/service/businessSectorIndustriesDetails', function (req, res) {
//     business.getSectorAndIndustries(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });

//route for updating business_sector_details.
router.patch('/service/businessSectorIndustriesDetails', function (req, res) {
    business.patchSectorAndIndustries(req, res).then(function (response) {
        res.send(response);
    }, function (error) {
        res.send(error);
    });
});

//route for get businessIndustries service.
// router.get('/service/businessIndustries', function (req, res) {
//     business.getIndustries(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });

//route for getting status for dashbosrd.
router.post('/service/status', function (req, res) {
    business.getAccountVerificationStatus(req, res).then(function (response) {
        res.send(response);
    }, function (error) {
        res.send(error);
    });
});

// //route for business registration service.
// router.post('/service/businessRegistrationWithOutKyb', function (req, res) {
//     business.businessSignUpKyb(req, res).then(function (response) {
//         res.send(response);
//     }, function (error) {
//         res.send(error);
//     });
// });


module.exports = router;
