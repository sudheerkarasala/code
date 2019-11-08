export class Utils {
  static isEmptyObject(obj) {
    return (obj === undefined) || (obj === null) || (obj === '') || (Array.isArray(obj) && obj.length <= 0);
  }

  signUpResObject(data,applicantId,contact,address,applicant){
    return new Promise((resolve) => {
      data.userInfo = {
        applicant_id: applicantId, email:contact.email,
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
};