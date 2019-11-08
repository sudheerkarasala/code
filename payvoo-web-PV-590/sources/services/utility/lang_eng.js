/**
 * lang_eng config
 * This is a config file, where english message responses are stored.
 * @package lang_eng
 * @subpackage sources/services/utility/lang_eng
 * @author SEPA Cyber Technologies, Sekhara Suman Sahu
 */

export const langEngConfig = {
  message: {
    signUp: {
      success: "registratiton successfully",
      fail: "registratiton failed",
      address_update: "Status updated successfully.",
      data_update: "Data updated successfully"
    },
    indexCountry: {
      error: "you have an database error in fetch country detail.",
      operationError: "Database operation error ",
      inputError: "Wrong request parameter passed or Country does not exist.",
      connError: "Error in DB connection",
      countryError: "you have an database error in fetch country detail.",
      checkRequest: "Wrong request parameter passed.",
      checkValue: "Null data passed from front end.",
      emailExist: "email already exist",
      mobileExist: "mobile already exist",
      emailAndMobileExist: "email and mobile already exist"
    },
    mail: {
      subject: "Welcome to PayVoo",
      from: "sekharasahu@gmail.com",
      email_failure: "Email sending failure",
    },
    password: {
      succ: `New Password Updated successfully`,
      passchange_succ: `Password changed successfully`,
      valid_pass: `Please enter valid old password`,
      valid_new_pass: `Please enter valid  password`,
    },
    industries: {
      success: "Industries fetched successfully.",
      checklistSuccess: "Business industries checklist posted successfully",
      operationError: `Business industries checklist insertion fail`,
      operationFailure: `Business industries checklist batchInsertion fail`,
      operationConnectionFail: `Business industries checklist connection failure`,
      selectedListSuccess: `Selected business industries list fetched successfully.`,
      checklistSectorSuccess: `Business sector and selected industries detail inserted successfully.`,
      restrictedBusinessSuccess: `This industry is treated with special attention. Our support team will additionally contact you to advise what would be the next steps for opening an account.`

    },
    businessdetails: {
      success: "Company Registered successfully.",
      fail: "Company Registration failed.",
      dberror: "Error in connection",
      fetchsuccess: "Business Sector detail fetched for business_id",
      fetcherror: "Data not found based upon the business_id ",
      withoutKYB: "registered without KYB"
    },
    business_type: {
      error: "Error in data fetching.",
      query_error: "No data found.",
      conn_error: "Error in database connection.",
      insert_error: "Errror in data inserting"
    },
    kyb_status: {
      success: "Status inserted successfully.",
      error: "Error in status insertion.",
      status_error: "Error occurred while status updation. Please check business_id exists or column name is correct",
      isert_status: "Status does not exist for respective business_Id. Please call the /service/post/statusInsert API first."
    },
    country: {
      status_suc: "Currency data fectched",
      status_fail: "Error while fetching."
    },
    loginMessage: {
      emailNotFound: "login failed || email not found",
      passwordInvalid: "invalid password",
      connectionError: "connection error ",
      mpinNotFound: "unable to login due to mpin does not exist",
      emailSuccess: "Please Verify , SandBox details sent successfully to ",
      emailFail: "Email sending Fail",
      noDataError: "Invalid Input Data",
      errorMessage: "No data found with this email"

    },
    userDetailsMessage: {
      success: "User data found",
      fail: "Data not found",
      inValidEmail: "Username not valid"

    },
    upload: {
      fail: `Failed to upload`,
      success: `File uploded`

    },
    getFail: {
      fail: `Data not found`,
      success: `Data found`
    },
    transaction: {
      operationError: `Transaction countries insertion fail`,
      operationSuccess: `Transaction countries inserted successfully`,
      operationFailure: `Transaction countries batchInsertion fail`,
      operationConnectionFail: `Transaction connection failure`,
      dataEmpty: `Please provide valid business transaction details`

    },

    transactionVolume: {
      success: `Data stored successfully`,
      fail: `Data failed to store`,
      error: `Connection Error`,
      fetchsuccess: "Transaction volume fetched for business_id ",
      fetcheerror: "Error in transaction volume fetching. ",
      country_transaction_success: "Transaction country detail fethced successfully for business_id ",
      country_transaction_failed: "Transaction country detail fetching failed."

    },

    payment: {
      failure: `Payment details insertion fail`,
      success: `Payment details insert successfully`,
      noDataError: `No data found with selected user `,
      apiError: `Failure for api response `,
      inputError: `Payment User invalid `,
      authError: `You are unauthorized`,
      headerError: `Please provide authorization header`,
      wallet_balance_success: `Wallet balance fetched successfuly`,
      wallet_balance_error: `Error while fetching  Wallet balance`,
      wallet_applicant_id_error: `applicant_id not found`,
      exchange_success: "exchange rate set successfully",
      exchange_error: "Error while seting exchange.",
      alert_success: "alert rate set successfully",
      get_success: " currency exchange details fetched sucesfully",
      get_fail: "record doesn't exist with applicantId",
      get_id: "Error while fetching currency exchange details",
      delete_success: "currency exchange details deleted sucesfully",
      delete_fail: "record not deleted",
      delete_id: "something went wrong",
      update_success: " record updated successfully",
      update_fail: " record not updated ",
      update_data: "please enter valid data",
      card_cvv_invalid: "Please enter valid cvv",
      acc_upd_succ: 'Account Updated Successfully',
      card_success: "Card data inserted successfuly",
      err: "Error occured while inserting.",
      cardDeactiveSuccess: "Card deactivated successfuly",
      cardActiveSuccess: "Card activated successfuly",
      cardFailure: "Error while deactivating the card.",
      getcardSuccess: "Card detail fetched sucesfuly",
      getcardError: "no card found against the applican id",
      noCardFound: "No card details found against the applicant_id",
      trans_success: "Amount added succesfuly",
      trans_failed: "Amount addition failed",
      insufficient_balance: "insufficient balance",
      account_deactive: "Account is deactive",
      enough_balance: "Enough balance",
      amount_deduction_success: "Amount deducted successfuly",
      amount_deduction_fail: "Amount deduction failed",
      amount_addition_success: "Amount added succesfuly",
      amount_addition_failed: "Amount addition failed",
      transaction_detail_fetch_success: "Transaction details fetched successfuly",
      transaction_detail_fetch_error: "Account OR Transaction not found",
      receiver_applicantid_success: "Receivers applicant_id fetched successfuly",
      receiver_applicantid_error: "Error while fetching receivers applicant_id",
      fullname_success: "Full name fetched successfuly",
      fullname_error: "Error while fetching Full name",
      trans_record_succ: "Transaction created successfuly",
      trans_record_fail: "Error while creating transaction record.",
      check_rate_succ: "Record created successfuly",
      check_rates_fail: "Record creation failed",
      check_rates_fail1: "Record already inserted",
      check_rates_fail2: "Please send valid data",
      check_rate_del_succ: " Record deleted successfuly",
      check_rate_del_fail: "Record not found ",
      duplicate_card_succ: "Card already added for this user",
      duplicate_card_fail: " Card not found",
      duplicate_card_query_err: "error while fetching duplicate query error"
    },

    otp: {

      sendEmailError: "Problem While Sending otp through Email ",
      sendMobileError: "Problem While Sending otp through mobile ",
      checkValidMobile: "Please enter a correct mobile number ",
      checkEmailMobile: "Please enter email or mobile number",
      emailOtpSent: "Email Sent With Varification OTP",
      mobileOtpSent: "Message Sent With Varification OTP",
      otpsent: "OTP Sent , Please Varify",
      otpFailed: "Opt generation fail",
      otpVerified: "OTP already verified  ",
      otpExpire: "Your OTP Expired , Please request for new OTP",
      updateOtpFail: "Fail to update Otp_Status",
      otpVerifiedTrue: "OTP Successfully Verified",
      otpVerifiedFalse: "OTP Verification Fail",
      checkInput: "Please, enter a correct 6-digit code",
      checkOtp: "Please check your Otp, and Try again",
      mobile_exit: "mobile number is already registered",
      email_exit: "email is already registered"
    },

    mockingConfig: {
      success: "Sandbox user fetched successfully",
      fail: "Fail to retrive Sandbox user",
      paymentDataSuccess: "Payment details fetched successfully",
      paymentDataFail: "Payment details not found",
      paymentDataError: "Error while fetching payment details"
    },

    kycEntry: {

      success: "Successfully stored",
      fail: "Failed to store",
      failcase: "No data found"

    },

    kyc: {
      operationError: `Update kyc failure `,
      serverResponseError: `No data response from muse `,
      noDataError: `No data found with selected user `,
      apiError: `Failure for api response `,
      inputError: `User invalid `,
      authError: `You are unauthorized`,
      headerError: `Please provide authorization header`
    },

    ident: {
      success: `IdentId already exit `,
      failure: `IdentId not exit `,
      error: `Failure for api response `
    },

    email: {
      success: ``,
      failure: `Problem while sending OTP through email `, messageInitiated: `Hi, Your Kyc Process Initiated`
    },

    mobile: {
      success: `Status send to mobile number `,
      failure: `Problem while sending OTP through mobile `

    },

    currency: {
      success: "Data found",
      fail: "No data found",
      success1: "record deleted successfully",
      fail1: "record not found",
      fail2: "Please send valid data",
      fail3: "No data found,Please add currency",
      fail4: "Please add another currency"
    },

    update: {
      success: `Updated successfully`,
      fail: `Unable to update`,
      error: `Record is not existed.unable to update`,
      info: `Please send valid data`

    },

    insert: {
      success: `Inserted successfully`,
      fail: `Unable to insert`,
      error: `record is already existed.unable to insert`,
      peer_contact: " record inserted",
      applicant_id_not_found: "application Id not found",
      error1: `Please send valid data`,
      error2: `Please,Enter contact details first`,
      error3: `Something went wrong`
    },
    get: {
      success: `Data found`,
      fail: `Data not found`,
      error: `Please give valid id`,
    },
    error: {
      error: `Connected Error`
    },

    businessOwner: {
      success: "Registered successfully.",
      fail: "BusinessOwner Registration failed.",
      dberror: "Error in connection",
      getDirectorError: "Unable to get director details ",
      recordNotFound: "no record found ",
      connectionError: 'Connection Error',
      getshareHolderError: "Unable to get shareholder details ",
      directorAdded: "director added ",
      businessOwner: "business owner  added ",
      updateError: "unable to update ",
      company_not_found: `company not found `,
      country_notfound: `country not found `,
      company_already_exist: `company already registered with applicant_id  `,
      deleteError: "unable to delete",
      deleteSuccessfully: "document deleted successfully",
      shareholderAdded: "shareholder added",
      deleted: " deleted successfully",
      emailExists: "An account with this email already exists",
      inputPercentageError: "shareholder percentage must be in integer ",
      errorShareholderRange: "percentage of shareholder could not greater than 100",
      already_added: 'business owner already added '
    },
    businessOwnerList: {
      success: "Fetched business owners",
      fail: "Fail to fetch business owners.",
      success1: "Business owners empty."
    },
    businessOwnerContact: {
      success: "Business owner contact",
      fail: "Fail to fetch business owner contact.",
      success1: "Business owner contact not exist."
    },
    businessApplicant: {
      fail: "Error While insert businessApplicant ."

    },
    businessContact: {
      fail: "Error While insert businessContact ."
    },
    address_type: {
      success: "address_type fetched successfully."
    },

    accountStatus: {
      success1: `Account Activated`,
      success2: `Account DeActivated`,
      getAccount: `Account detail fetch success`,
      fail: `Unable to fetch account`,
      error: `Error `,
      account_notfound: " account not found"
    },

  }
}