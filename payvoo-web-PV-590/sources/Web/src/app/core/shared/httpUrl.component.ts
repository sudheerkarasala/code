/**
* http urls
* Collection of the API linked with environments and allow to use in services
* @package HttpUrl
* @subpackage app\core\shared\httpurl
* @author SEPA Cyber Technologies, Sayyad M.
*/

import { environment } from '../../../environments/environment';
export class HttpUrl {

  //personal
  public static Login_PayVoo = `${environment.serviceUrl}service/login`;  //login to the payvoo application

  public static Countries_Details = `${environment.serviceUrl}service/country`;  // get coutnry details for singup process
  public static SignUp = `${environment.serviceUrl}service/userRegistration`; //save singup user data
  public static IdentId = `${environment.serviceUrl}service/identId`; //submit profile for kyc varification
  //public static Email_OTP = `${environment.serviceUrl}service/generateOtp`; //create email otp
  public static Email_OTP_Code = `${environment.serviceUrl}service/verifyOtp`; //email otp varification
  public static OTP = `${environment.serviceUrl}service/generateOtp`; // create mobile otp
  public static OTP_Code = `${environment.serviceUrl}service/varifyOtp`; //mobile otp varification
  public static KYCStatus = `${environment.serviceUrl}service/kycStatus`//get kyc status
  public static KycLinktoMobile = `${environment.serviceUrl}service/downloadKycLink`//send kyc link to mobile
  public static DuplicateEmailMObile = `${environment.serviceUrl}service/user/isUserExists`//send kyc link to mobile
  public static checkRate=`${environment.serviceUrl}service/v1/checkRate`; // create checkrate record 
  public static currencyRate=`${environment.serviceUrl}service/v1/currencyRate`;
  //public static  Business_OTP_Email= `${environment.serviceUrl}service/generateOtp`; //create email otp (business)
  //public static  Business_OTP_Email_Value= `${environment.serviceUrl}service/varifyOtp`; //email otp varification (business)
  //public static  Business_OTP_Mobile=`${environment.serviceUrl}service/generateOtp`; // create mobile otp (business)
  //public static  Business_OTP_Mobile_value=`${environment.serviceUrl}service/varifyOtp`; //mobile otp varification (business)
  public static own_company = `${environment.serviceUrl}service/businessRegistrationWithOutKyb`;//business registration own company
  //public static Business_Get_Countries = `${environment.serviceUrl}service/country`;  // get coutnry details for singup process (business)
  //public static Business_Personal_SignUp = `${environment.serviceUrl}service/userRegistration`; //save singup user data (business)
  public static Business_Type = `${environment.serviceUrl}service/businessType`; //business type(business)
  public static Register_Business = `${environment.serviceUrl}service/businessRegistration`; //save singup user data (business)
  // public static Save_Company_Without_KYB = `${environment.serviceUrl}service/businessRegistrationWithOutKyb`; //save company without kyb
  public static Bus_Addr_Reg = `${environment.serviceUrl}service/address`; //all types of address save
  public static Bus_Sectors_Types = `${environment.serviceUrl}service/sectorType`;//get business sectortype
  public static Save_Bus_Types = `${environment.serviceUrl}service/businessSectorIndustriesDetails`;//submit businesstypes data
  public static Trnascation_Volume = `${environment.serviceUrl}service/transactionVolume`;//transcation volume
  public static KYB_Status = `${environment.serviceUrl}service/status`;//get dashbaord kyb status
  public static Insert_KYB = `${environment.serviceUrl}service/statusInsert`;//insert kyb status initially
  // public static Update_KYB_Status = `${environment.serviceUrl}service/status`;//update kyb dashboard status
  public static Business_Industries = `${environment.serviceUrl}service/businessIndustries`;//get business industries
  public static Update_Contact = `${environment.serviceUrl}service/contact`;//update contact
  //public static Delete_Owner = `${environment.serviceUrl}service/businessOwners`;//delete owner

  public static Verify_Login_OTP = `${environment.serviceUrl}service/mobile/generateOtp`;//delete owner


  public static  Send_Receive_Payment=`${environment.serviceUrl}service/countryTransaction`;//send/receive payments
  public static  Get_DirectorsShareHolder=`${environment.serviceUrl}service/businessOwners`;//get direcotrs details
  //public static  Add_DirectorsShareHolder=`${environment.serviceUrl}service/businessOwners`;//add directors list
  public static  PersonalDetails=`${environment.serviceUrl}service/businessOwner`;//add personal details
  //public static  IsVerified=`${environment.serviceUrl}service/businessOwners`;//get verified status

  public static Get_Doc_Status = `${environment.serviceUrl}service/uploadstatus`;//status of supporting documenets
      
  //public static send_Registered_Address_Document = `${environment.serviceUrl}service/upload`; // supporting documentation
  public static get_Registered_Address_Document = `${environment.serviceUrl}service/upload`; // supporting  documentation
  // public static get_Registered_Address = `${environment.serviceUrl}service/address`; //get Registered Details 
  public static send_sandbox_email = `${environment.serviceUrl}service/v1/sandBoxDetailsEmail`; //get email detail


  public static forgot_password_business = `${environment.serviceUrl}service/user/forgotPassword`; //get forgot password
  public static change_password_business = `${environment.serviceUrl}service/changePassword`; //get forgot password
  public static resetPassword = `${environment.serviceUrl}service/user/resetPassword`; //get forgot password
  public static sendInvitation = `${environment.serviceUrl}service/sendInvitation`; //send invitation link
  public static businessOwnerDetails = `${environment.serviceUrl}service/businessOwnerDetails`; //business owner details send invitaion link
  //public static SavecardDetails = `${environment.serviceUrl}service/v1/card`; //save/update card details
  public static getCardsDetails = `${environment.serviceUrl}service/v1/card`; //get card details
  public static addMoney = `${environment.serviceUrl}service/v1/payments`; //get card details
  public static autoCurrencyExchange = `${environment.serviceUrl}service/v1/currencyExchange`; //save/update card details
  //public static getAutoCurrency= `${environment.serviceUrl}service/v1/currencyExchange`;

  public static storeAppIdForKYC = `${environment.serviceUrl}service/kycEntry`; //stored applicant id for kyc
  public static getAccounts = `${environment.serviceUrl}service/v1/account`; //get currency
  public static Gettransaction = `${environment.serviceUrl}service/v1/webTransaction`; //get currency
  public static statusCurrency = `${environment.serviceUrl}service/v1/statusCurrency`; //status currecy
  // public static createAccount = `${environment.serviceUrl}service/v1/account`; //status currecy
  // public static ActiveDeactiveacocunt  = `${environment.serviceUrl}service/v1/account`; //status currecy

  public static transactionDetails = `${environment.serviceUrl}service/v1/transaction`; 
  // public static insdustryStatus = `${environment.serviceUrl}service/status`; //industry status
  
  // public static getCurrency=`${environment.serviceUrl}service/v1/account`; // get currency by applicant-id
  // public static currentRate=`${environment.serviceUrl}service/v1/currencyExchange`; //Current currency rate
  // public static getAccountsCurrency=`${environment.serviceUrl}service/v1/currency`; // get currency by applicant-id
  public static getValidateCard=`${environment.serviceUrl}service/v1/validateCard`; // get validate card type
  public static getCurrencyList =`${environment.serviceUrl}service/v1/currency`;
  // public static deleteAutoExchangeAlert=`${environment.serviceUrl}service/v1/currencyExchange`; // delete auto_exchange alert
}

