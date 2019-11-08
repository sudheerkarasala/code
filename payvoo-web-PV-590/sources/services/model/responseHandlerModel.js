/**
 * responseHandlerModel Model
 * responseHandlerModel is used for constructing success or failure response.
 * @package responseHandlerModel
 * @subpackage sources/services/model/responseHandlerModel
 * @author SEPA Cyper Technologies, Satyanarayana G.
 */

export class ResponseHandler {
  constructor() {
    this.STATUS_SUCCESS = "Success";
    this.STATUS_FAILURE = "Fail";
    this.STATUS_CODE = 0;
    this.FAILURE_STATUS_CODE = 1;
  }
  successHandler(data, message) {
    let successResponse = {};
    successResponse.status = this.STATUS_SUCCESS;
    successResponse.statusCode = this.STATUS_CODE;
    if (data == null) {
      successResponse.status = this.STATUS_FAILURE;
      successResponse.statusCode = this.FAILURE_STATUS_CODE;
    } else {
      successResponse.message = message;
    }
    successResponse.data = data;
    return successResponse
  }

  failureHandler(message) {
    let failureResponse = {};
    failureResponse.statusCode = this.FAILURE_STATUS_CODE;
    failureResponse.status = this.STATUS_FAILURE;
    failureResponse.message = message;
    return failureResponse
  }
}