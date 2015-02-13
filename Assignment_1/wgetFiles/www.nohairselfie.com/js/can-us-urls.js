var cad_url = (isMobile.any() ? 'https://m.nohairselfie.ca':'https://fundraising.nohairselfie.ca');
var us_url = (isMobile.any() ? 'https://m.nohairselfie.com':'https://fundraising.nohairselfie.com');

var cad_participant_seid = '9601';
var cad_challenger_seid = '9659';
var us_participant_seid = '9673';
var us_challenger_seid = '9674';

var login_url = (isMobile.any() ? '/loginToPC':'/Common/Login/login.aspx?seid=');
var register_url = (isMobile.any() ? '/pledge/registration':'/pledge/Event/Registration.aspx?seid=');
var donate_url = (isMobile.any() ? '/pledge/sponsor/event/':'/pledge/Event/Donation.aspx?seid=');

function gotoDonateCAD () {
    location.href = buildURL(cad_url,donate_url,cad_participant_seid);
}

function gotoDonateUSD () {
    location.href = buildURL(us_url, donate_url, us_participant_seid);
}

function gotoLoginParticipantCAD () {
    location.href = buildURL(cad_url, login_url, cad_participant_seid);
}

function gotoLoginParticipantUSD () {
    location.href = buildURL(us_url, login_url, us_participant_seid);
}

function gotoLoginChallengerCAD () {
    location.href = buildURL(cad_url, login_url, cad_challenger_seid);
}

function gotoLoginChallengerUSD () {
    location.href = buildURL(us_url, login_url, us_challenger_seid);
}

function gotoRegisterParticipantCAD () {
    location.href = buildURL(cad_url, register_url, cad_participant_seid);
}

function gotoRegisterParticipantUSD () {
    location.href = buildURL(us_url, register_url, us_participant_seid);
}

function gotoRegisterChallengerCAD () {
    location.href = buildURL(cad_url, register_url, cad_challenger_seid);
}

function gotoRegisterChallengerUSD () {
    location.href = buildURL(us_url, register_url, us_challenger_seid);
}

function buildURL(domain, url, seid) {
    if(isMobile.any()) {
        // i.e. https://m.nohairselfie.ca/9601/pledge/sponsor/event/
        return domain + '/' + seid + url;
    } else {
        return domain + url + seid;
    }
}

function buildProfileURL(url, subeventID, participantID){
    if(isMobile.any())
    {
        return 'http://m.nohairselfie.ca/' + subeventID + '/participant/' +  participantID;
    } else {
        return url;
    }
}
