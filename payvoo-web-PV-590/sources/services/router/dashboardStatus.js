"use strict";

import {getDashboardStatus, postDashboardStatus, patchDashboardStatus} from '../controller/dashboardStatus';

router.patch('/service/status', patchDashboardStatus);
router.post('/service/statusInsert', postDashboardStatus);
router.post('/service/status', getDashboardStatus);

module.exports = router;