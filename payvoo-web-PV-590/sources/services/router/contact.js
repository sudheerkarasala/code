/**
 * contact route
 * contact route is used for the user will able to enter the contact details in the database and get the contact details from
 * database
 * @package contact
 * @subpackage router/contact
 *  @author SEPA Cyper Technologies,krishnakanth.r
 */
"use strict";

//var contact = require('../controller/contact/contact');
import { addContact, updateContact, getContactDetails } from '../controller/contact';
//This is api using for the store the contact details in our database

router.post('/service/contact', addContact);
router.put('/service/contact', updateContact);
router.get('/service/contact/:applicant_id', getContactDetails);

module.exports = router;
