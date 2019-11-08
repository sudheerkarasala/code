/**
 * businessSignup Controller
 * businessSignup is used to store business related data in business details table. It also has the
 * service by usingwhich we can get the Business sector data and another API for Business type data.
 * Also an API for storing sector, Range of service , and website details of business in DB table called
 * business_sector_details.
 * data to register himself in the payvoo app.
 * @package businessSignup
 * @subpackage controller\businessSignup\businessSignup
 * @author SEPA Cyper Technologies, Sekhara Suman Sahu , Satyanarayana G
 */
"use strict";

import { BusinessSectorModel } from '../../model/businessRegisterModel';
const businessSectorModel = new BusinessSectorModel();


export class BusinessIndustryDetails {
    constructor(newBusinessDetails) {
        this.business_id = newBusinessDetails.business_id,
            this.business_sector = newBusinessDetails.business_sector,
            this.range_of_service = newBusinessDetails.range_of_service,
            this.website = newBusinessDetails.website,
            this.restricted_business = newBusinessDetails.restricted_business,
            this.selected_industries = newBusinessDetails.selected_industries,
            this.restricted_industries = newBusinessDetails.restricted_industries,
            this.column = newBusinessDetails.column,
            this.value = newBusinessDetails.value
    }
}


//for storing sector,website,industries and services related data. 
export const postSectorAndIndustries = (request, response) => {
    let newBusinessSectorDetails = new BusinessIndustryDetails(request.body);
    console.log("dfjhdkj",request.body);
    businessSectorModel.postSectorAndIndustries(newBusinessSectorDetails)
        .then(result => {
            response.json({ result });
        }).catch(error => {
            response.send(err);
        })
}

//for updating business sector details table data
export const patchSectorAndIndustries = function (request, response) {
     let newBusinessSectorDetails = new BusinessIndustryDetails(request.body);
        businessSectorModel.patchSectorAndIndustries(newBusinessSectorDetails)
            .then(res => {
                response.json({res});
            }).catch(err=>{
                response.send(err);
            })
    
}
