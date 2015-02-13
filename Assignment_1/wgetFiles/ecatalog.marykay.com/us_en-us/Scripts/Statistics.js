// JScript File

var sGeneralGAAccount = "UA-15878639-2";

var myArray=new Array();

function Statistics()
{
   this.DocID            = "";
   this.URL              = "";
   this.Publisher        = "";
   this.Publication      = "";
   this.Issue            = "";
   this.PageLabel        = "";
   this.PageNumber       = "";
   this.ActionName       = "";
   this.ActionParam      = "";                  //Search term,link Click
   this.PubGAAccount     = "";
   this.PageTitle        = "";
   this.PubGAAccount     = "";
   //methods
   

   //For now use only GA
}

function reportStatsData(oStats) 
{
    var oStatistics         = new Statistics();
    oStatistics.Publisher   = oStats[0];
    oStatistics.Publication = oStats[1];
    oStatistics.Issue       = oStats[2];
    oStatistics.PageLabel   = oStats[3];
    oStatistics.DocID       = oStats[4];
    oStatistics.PageNumber  = oStats[5];
    oStatistics.ActionName  = oStats[6]; 
    oStatistics.ActionParam   = oStats[7];
    if(oStatistics.ActionName == "pageview")
    {
        if(oStatistics.PageLabel != "null" && oStatistics.PageLabel)
            oStatistics.ActionParam = oStatistics.PageLabel;
        else
            oStatistics.ActionParam = oStatistics.PageNumber;
    
    }  
    //Todo add array of statistic engines for now support only Google Analytics
    oStatistics.PubGAAccount = oStats[8];
    myArray.push(oStatistics);
	//debugger;
	ChangeAddthisValue(oStatistics.PageNumber);
    setTimeout("callGAServer()",0); 
}

function callGAServer()
{
    
    oStatistics = myArray.pop(); 
    var sURL        = "";    // The URL of the statistic that we will send Google Analytics
    var sTitle      = "";    // Set the title before calling GA         
    var sPage       = "";   
    //Build the URL int the following format Publication\Title\Action\Action_Param   
    document.title = "Mary Kay eCatalog";
    if(oStatistics.ActionParam.replace) 
        oStatistics.ActionParam = oStatistics.ActionParam.replace(/\//g,'|');
	//sGeneralGAAccount
    sURL = sURL.concat("en_US",'/',oStatistics.Issue,'/',oStatistics.ActionName,'/',oStatistics.ActionParam);   
    var firstTracker = _gat._getTracker(sGeneralGAAccount); 
    firstTracker._initData(); 
    firstTracker._trackPageview(oStatistics.Publisher+ '/' + sURL); 
    if(oStatistics.PubGAAccount != "null" && oStatistics.PubGAAccount)
    {
        var secondTracker = _gat._getTracker(oStatistics.PubGAAccount); 
        secondTracker._initData(); 
        secondTracker._trackPageview(sURL); 
    }
    //document.title = sDocTitle;
}

