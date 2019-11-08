/**
 * upload route
 * This is a route file,using for the upload the docuements and get the data which is related to upload documents 
 * @package upload
 * @subpackage router\upload
 * @author SEPA Cyper Technologies, krishnakanth.r
 */
"use strict";

// var uploadFile = require('../controller/upload/upload');
import { uploadFile, getFile, getFileWithStatus } from '../controller/upload';

router.post('/service/upload', uploadFile);
router.get('/service/uploadstatus/:business_id', getFileWithStatus);
router.get('/service/upload/:business_id', getFile);

module.exports = router;