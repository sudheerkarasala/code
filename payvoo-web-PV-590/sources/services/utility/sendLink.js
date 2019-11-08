/**
 * sendlink config
 * This is a config file, where send deep-link from web to mobile app functionality related properties, messgaes and
 * urls are configured. 
 * @package sendLink
 * @subpackage sources\services\utility\sendLink
 * @author SEPA Cyper Technologies, Sujit Kumar.
 */

var config = module.exports = {
    link: {
        android: "http://www.sepamuse.payvooapp/launch?id=",
        ios: "http://payvoo://?id="
    },
    sendLink: {
        android: " http://www.sepamuse.payvoobusiness/invitation?",
        ios: process.env.WEBADDRESS + "verifyPerDetails?",
        web: process.env.WEBADDRESS + "verifyPerDetails?"
    },
    mail: {
        subject: "Welcome to PayVoo Kyc Upload",
        resolve: "'Email sent",
        linkSendMessage: "Link sent to email",
        linkSendError: "Problem While Sending link to email",
        verifySubject: "Verify your identity",
        welcome: "Welcome to PayVoo ",
    }

}
