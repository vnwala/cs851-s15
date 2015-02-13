/*
 * cmcustom.js for IBM Websphere Commerce
 * $Id: cmcustom_websphere_commerce.js 153071 2010-08-02 21:51:32Z wbird $
 * $Revision: 153071 $
 *
 * Version 4.2.0
 *
 * Coremetrics Tag v4.0, 8/7/2006
 * COPYRIGHT 1999-2002 COREMETRICS, INC. 
 * ALL RIGHTS RESERVED. U.S.PATENT PENDING
 *
 * The following functions aid in the creation of Coremetrics data tags.
 *	08/05/2012	catIDoverride moved in the Shop 5 and Shop 9 tags to end of function	RJONES
 *  20/06/2012  Explore attribute 1 used for Base Price in Shop 5						RJONES
 *  15/10/2012	10257422 - Override product id with PLU - to be passed in explore attribute 5		ASTOCKTON
 */

var cm_exAttr=new Array();  
var cmCheckCMEMFlag = true;	
var cmSendOSLinkClickTag = true;
var cmAutoCopyAttributesToExtraFields = false;


function cmCreatePageviewTag(__pi,__cg, blah1, blah2, store_id, __se, __sr, attributes, extraFields) {	
	cmMakeTag(["tid","1","pi",__pi,"cg",__cg, blah1, "", blah2, "","pc","Y","pv11",store_id,"se",__se,"sr",__sr,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateDefaultPageviewTag(__cg) {
	cmCreatePageviewTag(cmGetDefaultPageID(),__cg);
}

function cmCreateProductviewTag(__pi,__pr,__pm,__cg,store_id,pageCount,masterItemCategory,catIDoverride,attributes,cm_vc) {
	/*Customisation (10257422: Override product id with PLU - to be passed in explore attribute 5*/
	var __a = attributes.split("-_-");	
	if(__a[4]){
		__pr = prefix_plu(__a[4]);
	}	
	if (catIDoverride)	{
		if (catIDoverride != "0") {	// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}
	if ((pageCount == null) || pageCount == "") {
		pageCount = 'Y';
	}
	if ((__pi == null) || (__pi == "") || (pageCount == "N")) {
		__pi = cG7.cM0[cm_ClientID];
	}
	cmMakeTag(["tid","5","pi",__pi,"pr",__pr,"pm",__pm,"cg",__cg,"pc",pageCount,"pv11",store_id,"cm_vc",cm_vc ? cm_vc : cmExtractParameter("cm_vc",document.location.href),"cmAttributes",attributes]);
}

function cmCreateShopAction5Tag(__pr,__pm,__qt,__bp,__cg,store_id,currency,masterItemCategory,attributes,extraFields,catIDoverride) {
    /*Customisation (10257422: Override product id with PLU - to be passed in explore attribute 5*/
	var __a = attributes.split("-_-");	
	if(__a[4]){
		__pr = prefix_plu(__a[4]);
	}
	__bp = __bp.toString().replace(cmPricePattern, "");
	__pr = __pr.toString().replace(cmSpacePattern, "");
	if (catIDoverride)	{
		if (catIDoverride != "0") {		// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	} 
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	if (attributes) {
		var tempArray = attributes.split("-_-");
		for (i=0;i<tempArray.length;++i){
			if (i==0)
			{
				if (tempArray[i])
				{
					//assign Cat ID Override to Category ID of tag
					__bp = tempArray[i];
				}

			}
		}
	}
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"at","5","tid","4","pc","N","sx11",store_id,"cc",currency]);
}

function cmCreateShopAction9Tag(__pr,__pm,__qt,__bp,__cd,__on,__tr,__cg,store_id,currency,account_name,contract_name,masterItemCategory,attributes,extraFields,catIDoverride) {
    /*Customisation (10257422: Override product id with PLU - to be passed in explore attribute 5*/
	var __a = attributes.split("-_-");	
	if(__a[4]){
		__pr = prefix_plu(__a[4]);
	}
	__bp = __bp.toString().replace(cmPricePattern, "");
	__tr = __tr.toString().replace(cmPricePattern, "");
	__pr = __pr.toString().replace(cmSpacePattern, "");
	if (catIDoverride)	{
		if (catIDoverride != "0") {				// allows client to override WSC auto-catID value if catIDoverride is not null or "0"
			__cg = catIDoverride;
		}
	}	  
	var hashValue = "" + (attributes ? attributes + "|||" : "") + (extraFields ? "extra" + extraFields : "");
	cmAddShop(["pr",__pr,"pm",__pm,"qt",__qt,"bp",__bp,"cg",__cg,"cd",__cd,"cmAttributes",attributes,"cmExtraFields",extraFields,"ha1",cm_hex_sha1(hashValue),"on",__on,"tr",__tr,"at","9","tid","4","pc","N","sx11",store_id,"cc",currency,"sx13",account_name,"sx14",contract_name]);
	cmCalcSKUString();
}

function cmCreateOrderTag(__on,__tr,__sg,__cd,__ct,__sa,__zp, store_id, currency, promotion_name, promotion_discount, promotion_code,attributes,extraFields) {
	if (((promotion_code == null) || (promotion_code == "")) && promotion_name) { promotion_code = "No Code"; } 
    __sg = __sg.toString().replace(cmPricePattern, "");
	__tr = __tr.toString().replace(cmPricePattern, "");
	cmMakeTag(["tid","3","osk",cmCalcSKUString(),"on",__on,"tr",__tr,"sg",__sg,"cd",__cd,"ct",__ct,"sa",__sa,"zp",__zp,"or11",store_id,"cc",currency,"or13",promotion_name,"or14",promotion_discount,"or15",promotion_code,"cmAttributes",attributes,"cmExtraFields",extraFields]);
}

function cmCreateRegistrationTag(__cd,__em,__ct,__sa,__zp,__nl,__sd, store_id, customer_country, age, gender, marital_status, num_children, num_in_household, company_name, hobbies, income,attributes) {
	 if (attributes){
		var cm_exAttr=new Array();
		cm_exAttr=attributes.split("-_-");
	}
	cmMakeTag(["tid","2","cd",__cd,"em",__em,"ct",__ct,"sa",__sa,"zp",__zp,"nl",__nl,"sd",__sd,
	"cy",customer_country,"ag",age,"gd",gender,"ml",income,"cm_exAttr",cm_exAttr]);
}

/*Customisation (10257422): Function to prefix PLU with leading zero(s) where necessary*/
function prefix_plu(plu){
	if(plu.length < 6){
		var _pre = 6 - plu.length;
		for(i=0; i<_pre; i++){
			plu = 0 + plu;
		}
	}
	return plu;	
}