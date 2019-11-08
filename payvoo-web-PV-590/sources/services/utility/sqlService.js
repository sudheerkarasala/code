export const sqlConfig = {
    addressSql: {
       // select_address: `SELECT c.contact_id,ad.address_type FROM applicant a,contact c,address_type ad
       // WHERE a.applicant_id = c.applicant_id and a.applicant_id = ? and ad.address_type_id = ?`,
        update_address: "UPDATE address SET address_type_id = ?,country_id = ?,postal_code = ?,address_line1 = ?,address_line2 = ?,city = ?,region = ?,updated_on = ? WHERE applicant_id = ?",
        insert_address: "INSERT INTO address (contact_id,applicant_id,country_id,address_type_id,postal_code,address_line1,address_line2,city,region,created_on) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?)",        
        update_address_details: `UPDATE address SET country_id = ?,postal_code = ?,address_line1 = ?,address_line2 = ?,city = ?,region = ?,updated_on = ? WHERE applicant_id = ? AND address_type_id = ?`,
        get_address_details: `SELECT * FROM address WHERE applicant_id = ?`,
        get_address_type: `select address_type_id,address_type from address_type`,
        select_country: `SELECT country_name FROM country WHERE country_id = ?`,
        select_contactId:`select contact_id from contact where applicant_id=?`,
        select_address_type_id:`select address_type_id from address where applicant_id=? and contact_id =?`
    },
    contactSql: {
        select_contact: `SELECT applicant_id FROM contact WHERE applicant_id = ?`,
        update_contact: "UPDATE contact SET first_name = ?,middle_name = ?,last_name = ?,email = ?,gender = ?,dob = ?,telephone = ?,mobile = ? WHERE applicant_id = ?",
        insert_contact: "INSERT INTO contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        get_contact: `   SELECT * FROM contact WHERE applicant_id = ?`,
        get_all_contact: ` select first_name, last_name, mobile, phone, applicant_id from contact`,
        insert_peer_contact: "INSERT INTO peer_contact (applicant_id_from, applicant_id_to,contact_number,mobile_number,name) VALUES (?, ?, ?, ?,?)",
        get_peer_contact: "select applicant_id_from, applicant_id_to,contact_number,mobile_number,name from peer_contact WHERE applicant_id_from = ?",
        select_peer_contact: "select contact_number, mobile_number from peer_contact where applicant_id_from = ?"

    },
    accountSql: {
        update_account: `update accounts set status=?,role_id=?,balance=? where currency=? and applicant_id=?`,
        insert_account: 'insert into accounts (currency,status,applicant_id,role_id,balance) values(?,?,?,?,?)',
        get_account: 'select account_no,currency,status,applicant_id,role_id,balance from accounts',
        getAccountByApplicant_id: 'select account_no,currency,status,applicant_id,role_id,balance from accounts where applicant_id=? ',
        getByCurr_account: `select currency,applicant_id, balance from accounts where currency=? and applicant_id=?`,
        accontStatus: `update accounts set status=? where applicant_id=? and currency=?`,
    },
    paymentSql: {
        insert_payment_cards: "insert into payment_cards (applicant_id,card_type,name_on_card,card_number,card_cvv,card_month,card_year,status,default_card) values (?,?,?,?,?,?,?,?,?)",
        update_card_status: "update payment_cards set status = ? where payment_cards_id = ?",
        update_delete_card: `update payment_cards set status = ? , default_card = ? where payment_cards_id = ?`,
        get_card: "select payment_cards_id,card_type,name_on_card,card_number,card_cvv,card_month,card_year,status,default_card from payment_cards where applicant_id = ?",
        insert_transaction: `insert into transactions (applicant_id,transaction_number,from_account,to_account,opposite_account_owner,account_type,transaction_type,amount) values (?,?,?,?,?,?,?,?)`,
        Get_trans_details: `SELECT transaction_id,transaction_number, transaction_type, from_account ,to_account, opposite_account_owner , account_type, amount, created_on FROM transactions 
        WHERE applicant_id = ? ORDER BY created_on DESC`,
        get_minimum_balance: `select balance,status from accounts where account_no = ?`,
        deduct_balance: `update accounts set balance = ? where account_no = ?`,
        addBalance: `update accounts set balance = balance + ?  where account_no = ?`,
        getApplicantId: `select applicant_id,currency from accounts where account_no = ?`,
        getFullname: `select  contact.first_name,contact.last_name from contact JOIN  accounts on contact.applicant_id = accounts.applicant_id
        JOIN  applicant ON accounts.applicant_id = applicant.applicant_id where accounts.account_no = ?`,
        insert_check_rates: `insert into check_rates (applicant_id,from_currency,to_currency,isConvert,created_on) values (?,?,?,?,?)`,
        delete_check_rates: `delete from check_rates where check_rates_id = ?`,
        Get_trans_details_by_account_id: `select * from transactions where from_account = ? and transaction_type='DB'
        UNION
        select * from transactions where to_account = ? and transaction_type='CR' ORDER BY created_on DESC`,
        check_duplicate_card: `select payment_cards_id , status from payment_cards where card_number = ? and applicant_id = ?`,
        select_card_applicantid: `select count(payment_cards_id) as cards from payment_cards where applicant_id = ?`,
        select_currency_rate: `select check_rates_id from check_rates where applicant_id=? and from_currency=? and to_currency=? and isConvert=?`,
        select_currency_convertion: `select check_rates_id from check_rates where applicant_id=? and from_currency=? and isConvert=?`
    },
    paymentsSql: {
        join:
            `SELECT a.applicant_id, a.account_type, a.next_step,
        c.email, c.first_name, c.gender, c.last_name, c.mobile,c.middle_name,c.dob,
        ad.address_line1 , ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town,pc.card_number,pc.card_month, pc.card_year, pc.card_cvv, pc.name_on_card ,pc.card_type ,ct.currency ,ct.calling_code as telnocc, ct.country_code , ct.country_code as country_name
        FROM applicant a
        INNER JOIN contact c ON (a.applicant_id = c.applicant_id AND a.applicant_id = ?)
        INNER JOIN address ad ON (a.applicant_id = ad.applicant_id AND ad.address_type_id =1)
        INNER JOIN country ct ON (ad.country_id = ct.country_id)
        INNER JOIN payment_cards pc ON (a.applicant_id= pc.applicant_id) AND pc.payment_cards_id = ?`,

        insert_payments: `INSERT INTO payments (applicant_id,paymentsid,status,payment_Brand,payment_Mode,first_Name,last_Name,amount,currency,description,result,card,customer,transaction_details,created
            ,merchant_Transaction_Id,remark,trans_Status,tmpl_amount,tmpl_currency,eci,checksum,order_Description,company_Name,merchant_contact) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

        insert_account: `INSERT INTO accounts (applicant_id , currency , role_id , balance)
            VALUES (?, ?, ?, ?)`,

        Get_wallet_balance: `SELECT currency, SUM(balance) as total,COUNT(currency) as trans_count FROM accounts
        WHERE applicant_id = ? AND status = 1 GROUP BY currency;`,
        select_account: `SELECT paymentsid , applicant_id , status ,payment_Brand,  payment_Mode , amount, currency , transaction_details FROM payments WHERE  applicant_id = ? AND paymentsid = ? `,
        insert_transaction: `INSERT INTO transactions (applicant_id,transaction_number,from_account,to_account,opposite_account_owner,account_type,transaction_type,amount) VALUES (?,?,?,?,?,?,?,?)`,
        update_currency_exchange: `UPDATE  currency_exchange  SET applicant_id= ?,account_no =?,from_currency=?,to_currency=?,amount=?,target_amount=?,exchange_status=?,notify=? Where account_no= ?`,
        insert_currency_exchange: `INSERT INTO currency_exchange (applicant_id,account_no,from_currency,to_currency,amount,target_amount,exchange_status,notify) 
            VALUES (?,?,?,?,?,?,?,?)`,
        delete_currencyExchange: `DELETE from  currency_exchange where auto_exchange_id=?`,
        get_currencyExchange: "select auto_exchange_id,account_no,from_currency,to_currency,amount,target_amount,exchange_status,notify from currency_exchange where applicant_id = ?",
        update_currencyExchange: "UPDATE currency_exchange SET amount=?, target_amount=? WHERE auto_exchange_id=?",
        update_account: "UPDATE accounts SET balance = balance + ? WHERE applicant_id =? AND account_no =?"
    },
    businessSql: {
        insert_applicant: "insert into applicant (account_type) values (?)",
        insert_contact: "insert into contact (applicant_id,first_name,last_name,email,gender,dob,mobile) values (?,?,?,?,?,?,?)",
        insert_business_owner: "insert into business_owner (business_id ,contact_id ,business_owner_type,percentage) values(?,?,?,?)",
        select_business_owners: `SELECT bo.business_id , CONCAT_WS(' ',c.first_name,c.last_name) as fullName ,c.contact_id
                                 FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.business_id = ? ORDER BY c.contact_id`,
        select_business_owners_contact: `SELECT bo.business_id , bo.business_owner_type , c.first_name ,c.last_name ,c.contact_id ,c.applicant_id
                                      FROM business_owner bo JOIN contact c ON c.contact_id = bo.contact_id WHERE bo.contact_id = ?`,
        kyb_business_owner: "insert into kyb_business_owner (business_id,type,email,name,status,dob, percentage) values(?,?,?,?,?,?,?)",
        insert_kyc: "insert into kyc (applicant_id) values(?)"
    },
    signupSql: {
        insert_applicant: "insert into applicant (account_type,next_step) values (?,?)",
        insert_contact: "insert into contact (applicant_id,first_name,middle_name,last_name,email,gender,dob,telephone,mobile,phone) values (?,?,?,?,?,?,?,?,?,?)",
        insert_address: "insert into address (country_id,address_type_id,postal_code,address_line1,address_line2,applicant_id,city,town,region,contact_id) values (?,?,?,?,?,?,?,?,?,?)",
        insert_userLogin: "insert into user_login (user_id,applicant_id,password,passcode_pin,role_id,email_verified,mobile_verified) values (?,?,?,?,?,?,?)",
        insert_kyc: "insert into kyc (applicant_id) values(?)",
        insert_businessLogin: "insert into business_users (user_id,applicant_id,password,passcode_pin,role_id,email_verified,mobile_verified) values (?,?,?,?,?,?,?)",
        insert_business_details: "insert into business_details (applicant_id,country_of_incorporation,business_legal_name,trading_name,registration_number,incorporation_date,business_type) values(?,?,?,?,?,?,?)",
        insert_business_sector_details: "insert into business_sector_details (business_id,business_sector,range_of_service,website,restricted_business,selected_industries) values (?,?,?,?,?,?)",
        select_business_sector_details: "select business_id,business_sector,range_of_service,website,restricted_business,selected_industries from business_sector_details where business_id ",
        select_business_type: "select business_type_id,business_type_name from business_type",
        select_sector_type: "select business_sector_id,business_sector_name from business_sector_lov",
        select_industries_type: "select business_industry_id,business_industry_name,restricted from business_industry_lov",
        select_status: "select isRestricted,type_of_business,personal_profile,business_owner_details,business_address from kyb_business where business_id",
        insert_status_kyb_business: "insert into kyb_business (business_id,type_of_business,personal_profile,business_owner_details,business_address) values (?,?,?,?,?)",
        insertSelectedIndustries: "INSERT INTO business_industries (business_id,industry_id) VALUES (?,?)",
        select_selectedIndustries: "SELECT industry_id FROM  business_industries WHERE business_id = ? ",
        kyb_business_owner: "insert into kyb_business_owner (business_id,type,email,name,status,dob, percentage) values(?,?,?,?,?,?,?)",
        update_restricted_business: `UPDATE business_sector_details SET restricted_industries = ? WHERE business_id = ?`,
        kyb_company_details: "insert into kyb_company_details (kyb_business_id,company_details) values(?,?)",
        get_country: `select country_id, country_name, calling_code, country_code, currency, currency_symbol, status from country ORDER BY country_name ASC`,
        get_country_byId: `select country_id, country_name, calling_code, country_code, currency from country where country_name= ?`,
        insert_sandbox: `insert into sandbox (applicant_id,memberId,api_key,url,api_doc_url,redirect_url) values (?,?,?,?,?,?)`,
        select_sandbox: `select sandbox_id,applicant_id,memberId,api_key,url,api_doc_url,redirect_url from sandbox where applicant_id = ?`,
        get_country_status: `select country_id, country_name, currency, currency_symbol  from country where status = 1 ORDER BY country_name ASC`,
        get_currency: `SELECT country_id, country_name, currency, country_name, currency_symbol, country_flag_img_path  from country GROUP BY currency ORDER by country_name`,
        insert_account: 'insert into accounts (applicant_id,role_id,currency,status,balance) values(?,?,?,?,?)',
        update_business_restricted: `update  kyb_business set isRestricted = 1 where business_id = ?`,
        select_docs: "select count(*) as count from kyb_business_docs  where business_id",
        insert_currency: `insert check_rates (applicant_id,from_currency,isConvert,created_on) values(?,?,?,?)`


    },
    currencyRateSql: {
        selectQuery: `select from_currency,to_currency,check_rates_id from check_rates where applicant_id = ? and isConvert=?`,
        deleteQuery: 'DELETE from  check_rates where check_rates_id=?',
        selctConvertQuery: `select from_currency,check_rates_id from check_rates where applicant_id = ? and isConvert=?`
    },
    kycStatusSql: {
        join: `SELECT k.kyc_status, k.kyc_transaction_id, c.applicant_id,c.email, c.mobile
        FROM kyc k
        INNER JOIN contact c
        ON k.applicant_id = c.applicant_id AND c.applicant_id =?`,

        update1: `UPDATE kyc SET kyc_status = ? WHERE kyc_transaction_id = ? `,

        update2: `UPDATE kyc SET kyc_status = ? WHERE  applicant_id = ? `,

        select: `SELECT kyc_status FROM kyc WHERE applicant_id = ? `
    },
    kycEntrySql: {
        insert_query: 'insert into kyc(applicant_id) values(?)'
    },
    loginSql: {
        select_sandbox_info: `SELECT ps.memberId, ps.api_key, ps.url,bu.user_id
        FROM sandbox ps
        INNER JOIN business_users bu
        ON ps.applicant_id = bu.applicant_id AND bu.applicant_id = ?`
    },
    mockSql: {
        select_mock_user: `SELECT applicant_id,paymentsid,status,payment_Brand,payment_Mode,first_Name,last_Name,amount,currency,description,result,card,customer,transaction_details,created
            ,merchant_Transaction_Id,remark,trans_Status,tmpl_amount,tmpl_currency,eci,checksum,order_Description,company_Name,merchant_contact FROM payments WHERE applicant_id = ?`
    },
    payVooSql: {
        join:
            `SELECT a.applicant_id, a.account_type, a.next_step,
        c.email, c.first_name, c.gender, c.last_name, c.mobile,c.middle_name,c.dob,
        ad.address_line1 , ad.address_line2, ad.city, ad.country_id, ad.postal_code, ad.region, ad.town,k.kyc_status,k.kyc_transaction_id, k.kyc_vendor_id,ct.country_code as country_name
        FROM applicant a
        INNER JOIN contact c ON (a.applicant_id = c.applicant_id AND a.applicant_id = ?)
        INNER JOIN address ad ON (a.applicant_id = ad.applicant_id AND ad.address_type_id =1)
        INNER JOIN country ct ON (ad.country_id = ct.country_id)
        INNER JOIN kyc k ON (a.applicant_id= k.applicant_id)`,

        update: `UPDATE kyc SET kyc_transaction_id = ? , kyc_vendor_id = ?  WHERE applicant_id = ? `,

        select: `SELECT kyc_vendor_id as id , kyc_transaction_id as TransactionNumber   FROM kyc WHERE applicant_id = ? `
    },
    transactionSql: {
        insertCountry: `INSERT INTO business_transaction_countries (business_id,country_id,business_description,transaction_type) VALUES (?,?,?,?)`,
        insertQuery: `INSERT INTO business_transactions (business_id,monthly_transfer_amount,no_payments_per_month,max_value_of_payments) VALUES ('%s', '%s', '%s', '%s')`,
        select_transaction_volume: "select business_id,monthly_transfer_amount,no_payments_per_month,max_value_of_payments from business_transactions where business_id = '%s'",
        select_transaction_country: "select business_id,country_id,business_description,transaction_type from business_transaction_countries where business_id = '%s'"
    },
    uploadSql: {
        insert: {
            insert_sql1: `INSERT INTO kyb_business_docs (business_id, kyb_doc_type,kyb_doc_file_type,kyb_doc_base64,created_on) VALUES (?, ?, ?, ?, ?)`
        },
        update: {
            update_sql1: `UPDATE kyb_business_docs SET kyb_doc_file_type=?,kyb_doc_base64= ?,updated_on=? where business_id =? and kyb_doc_type =?`,
        },
        select: {
            select_id: `SELECT * FROM kyb_business_docs WHERE business_id = ?`,
            select_doc: `SELECT kyb_doc_type FROM kyb_business_docs WHERE business_id=? AND kyb_doc_type = ?`

        }
    },
    userDetailsSql: {
        sql: `select a.applicant_id,c.first_name,c.middle_name,c.last_name,c.gender,c.email,c.mobile, ad.postal_code,ad.address_line1,ad.address_line2,ad.country_id,ad.city,ad.region, u.user_id, role.role_name
        from applicant a, user_login u, contact c, address ad, kyc, role where a.applicant_id = u.applicant_id and a.applicant_id = c.applicant_id and ad.applicant_id = a.applicant_id	  and a.applicant_id = kyc.applicant_id and role.role_id = u.role_id and u.user_id= ?`,
        index: `SELECT applicant_id, first_name, last_name, email, mobile, phone  FROM contact`
    }
}