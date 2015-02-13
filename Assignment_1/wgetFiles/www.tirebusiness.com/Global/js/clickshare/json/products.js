var CCI = CCI || {};

CCI.SubscriptionsMap = {
    Products: 
    {

        CA: 
        {
            "autonews"                  : "an_",
            "autonews-premium"          : "an_premium_",
            "autonews-ane"              : "an_ane_",
            "autonews-dc"               : "an_data_",
            "autonews-anm"              : "an_anm_",
            "autonews-ipad"             : "an_ipad_",
            "ane-global"                : "an_aneglobal_",
            "autonews-store"            : "an_store_",
            "anic"                      : "an_anic_",
            "anic-sub"                  : "an_anicsub_"
        },

        CW:
        {
            "autoweek"                  : "aw_",
            "autoweek-premium"          : "aw_premium_",
            "autoweek-special"          : "aw_special_",
            "autoweek-forum"            : "aw_forum_"
        },

        CB:
        {
            "bi"                        : "bi_",
            "bi-event"                  : "bi_event_",
            "bi-comments"               : "bi_comments_",
            "bi-web"                    : "bi_web_",
            "bi-sub"                    : "bi_sub_",
            "bi-digital"                : "bi_digital_",
            "bi-special"                : "bi_special_",
            "bi-dc"                     : "bi_dc_",
            "bi-forum"                  : "bi_forum_",
            "bi-print"                  : "bi_print_",
            "bi-pd"                     : "bi_pd_",
            "bi-reg-metered"            : "bi_metered_"
        },

        CT:
        {
            "btobonline"                : "btob_",
            "btobonline-comments"       : "btob_comments_",
            "btobonline-event"          : "btob_event_",
            "btobonline-metered"        : "btob_metered_",
            "btobonline-sub"            : "btob_sub_",
            "btobonline-special"        : "btob_special_",
            "btobonline-research"       : "btob_research_"
        },

        CG:
        {
            "crainschicago"             : "ccb_",
            "crainschicago-event"       : "ccb_event_",
            "crainschicago-metered"     : "ccb_metered_",
            "crainschicago-web"         : "ccb_web_",
            "crainschicago-dc"          : "ccb_dc_",
            "crainschicago-ccm"         : "ccb_ccm_"
        },

        CC:
        {
            "crainscleveland"           : "ccl_",
            "crainscleveland-event"     : "ccl_event_",
            "crainscleveland-premium"   : "ccl_premium_",
            "crainscleveland-special"   : "ccl_special_",
            "crainscleveland-forum"     : "ccl_forum_",
            "crainscleveland-metered"   : "ccl_metered_"
        },

        CD:
        {
            "crainsdetroit"             : "cdb_",
            "crainsdetroit-metered"     : "cdb_metered_",
            "crainsdetroit-premium"     : "cdb_premium_",
            "crainsdetroit-forum"       : "cdb_forum_",
            "crainsdetroit-nxt"         : "cdb_nxt_",
            "crainsdetroit-college"     : "cdb_college_"
        },

        CI:
        {
            "investmentnews"            : "in_",
            "investmentnews-sub"        : "in_sub_",
            "investmentnews-special"    : "in_special_",
            "investmentnews-store"      : "in_store_",
            "investmentnews-event"      : "in_event_",
            "investmentnews-member"     : "in_member_",
            "investmentnews-broker"     : "in_broker_"
        },

        CH:
        {
            "modernhealthcare"          : "mh_",
            "modernhealthcare-event"    : "mh_event_",
            "modernhealthcare-comments" : "mh_comments_",
            "modernhealthcare-sub"      : "mh_sub_",
            "mh-sub"                    : "mh_sub_",
            "modernhealthcare-web"      : "mh_web_",
            "modernhealthcare-metered"  : "mh_metered_",
            "modernhealthcare-digital"  : "mh_digital_",
            "mh-digital"                : "mh_digital_",
            "modernhealthcare-special"  : "mh_special_",
            "mh-dc"                     : "mh_dc_",
            "modernhealthcare-dose"     : "mh_dose_",
            "mh-dosenewsletter"         : "mh_dosenewsletter_",
            "modernphysician"           : "mp_",
            "modernphysician-comments"  : "mp_comments_",
            "modernphysician-metered"   : "mp_metered_"
        },

        CN:
        {
            "newyorkbusiness"           : "cnyb_",
            "newyorkbusiness-metered"   : "cnyb_metered_",
            "newyorkbusiness-sub"       : "cnyb_sub_",
            "newyorkbusiness-web"       : "cnyb_web_",
            "newyorkbusiness-digital"   : "cnyb_digital_",
            "newyorkbusiness-pulse"     : "cnyb_pulse_",
            "newyorkbusiness-forum"     : "cnyb_forum_",
            "newyorkbusiness-special"   : "cnyb_special_",
            "newyorkbusiness-evtlist"   : "cnyb_evtlist_",
            "newyorkbusiness-dc"        : "cnyb_dc_",
            "newyorkbusiness-event"     : "cnyb_event_"
        },

        CO:
        {
            "pionline"                  : "pi_",
            "pionline-sub"              : "pi_sub_",
            "pionline-daily"            : "pi_daily_",
            "pionline-special"          : "pi_special_",
            "pionline-digital"          : "pi_digital_",
            "pionline-rc"               : "pi_rc_",
            "pionline-metered"          : "pi_metered_"
        },

        PN:
        {
            "plasticsnews"              : "pn_",
            "plasticsnews-comments"     : "pn_comments_",
            "plasticsnews-metered"      : "pn_metered_",
            "plasticsnews-sub"          : "pn_sub_",
            "plasticsnews-special"      : "pn_special_",
            "plasticsnews-premium"      : "pn_premium_"
        },

        RN:
        {
            "rpn"                       : "rpn_",
            "rpn-comments"              : "rpn_comments_",
            "rpn-metered"               : "rpn_metered_",
            "rpn-sub-non-paid"          : "rpn_subnonpaid_",
            "rpn-sub-paid"              : "rpn_subpaid_",
            "rpn-special"               : "rpn_special_",
            "rpn-premium"               : "rpn_premium_"
        },

        TB:
        {
            "tb"                       : "tb_",
            "tb-comments"              : "tb_comments_",
            "tb-metered"               : "tb_metered_",
            "tb-sub-non-paid"          : "tb_subnonpaid_",
            "tb-sub-paid"              : "tb_subpaid_",
            "tb-special"               : "tb_special_",
            "tb-premium"               : "tb_premium_"
        }

    }
};