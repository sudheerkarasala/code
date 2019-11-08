export class Utils {
  static isEmptyObject(obj) {
    return (obj === undefined) || (obj === null) || (obj === '') || (Array.isArray(obj) && obj.length <= 0);
  }
  //Method to create response onject during user signup.
  signUpResObject(data,applicantId,contact,address,applicant){
    return new Promise((resolve) => {
      data.userInfo = {
       // applicant_id: applicantId, email:contact.email,
        gender:contact.gender, mobile:contact.mobile,
        phone:contact.phone, account_type: applicant.account_type, kycStatus: "PENDING",
        initialPayment: false
      }
      if (_.toLower(applicant.account_type) === "personal") {
        data.userInfo.first_name = contact.first_name, data.userInfo.last_name = contact.last_name,
          data.userInfo.next_step = applicant.next_step, data.userInfo.address_line1 = address.address_line1,
          data.userInfo.address_line2 = address.address_line2,
          data.userInfo.phone = contact.phone,
          data.userInfo.city = address.city, data.userInfo.country_id = address.country_id,
          data.userInfo.postal_code = address.postal_code,
          data.userInfo.region = address.region, data.userInfo.town = address.town
      }
        resolve(data);
    })
  }

  //Method to validate card data.
  isValidCard (transferDetails) {
    return new Promise((resolve) => {
        if (transferDetails.applicant_id && transferDetails.card_month && transferDetails.name_on_card && transferDetails.card_number && transferDetails.card_type && transferDetails.card_year) {
            resolve({ status: true });
        } else if (!transferDetails.applicant_id) {
            resolve({ status: false, message: "applicant id is required" })
        } else if (!transferDetails.card_month) {
            resolve({ status: false, message: "card month is required" })
        } else if (!transferDetails.name_on_card) {
            resolve({ status: false, message: "card name is required" })
        } else if (!transferDetails.card_number) {
            resolve({ status: false, message: "card number is  required" })
        } else if (!transferDetails.card_type) {
            resolve({ status: false, message: "card type is  required" })
        } else if (!transferDetails.card_year) {
            resolve({ status: false, message: "card year is  required" })
        } else {
            resolve({ status: false, message: "something went wrong please try later" })
        }
    })
  }

  //Method to check valic account to account money transfer request
  isValidMoneyTransferRequest (transferDetails) {
    return new Promise((resolve) => {
      if (transferDetails.applicant_id && transferDetails.from_account && transferDetails.to_account && transferDetails.account_type && transferDetails.from_currency && transferDetails.from_amount && transferDetails.to_amount) {
          resolve({ status: true });
      } else if (!transferDetails.applicant_id) {
          resolve({ status: false, message: "applicant id is required" })
      } else if (!transferDetails.from_account) {
          resolve({ status: false, message: "from acccount is required" })
      } else if (!transferDetails.to_account) {
          resolve({ status: false, message: "to account is required" })
      } else if (!transferDetails.account_type) {
          resolve({ status: false, message: "account type is  required" })
      } else if (!transferDetails.from_currency) {
          resolve({ status: false, message: "from currency is  required" })
      } else if (!transferDetails.from_amount) {
          resolve({ status: false, message: "from amount is  required" })
      } else if(!transferDetails.to_amount) {
          resolve({ status: false, message: "to amount is  required" })
      } else {
          resolve({ status: false, message: "something went wrong please try later" })
    }
    })
  }
  //Method for generating unique transaction number
    generateTransNum(){
    return Math.floor(Math.random() * 10000000000);
  }

};