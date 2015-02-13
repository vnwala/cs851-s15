/*
 * Copyright (c) contentmetrics GmbH, 2008
 * THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY
 * APPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT
 * HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY
 * OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM
 * IS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF
 * ALL NECESSARY SERVICING, REPAIR OR CORRECTION.
 *
 * Autor: Frank Räther, 10-20-2008
 * Code: JavaScript Library zum Tracken von Conversion Types in Abhängigkeit von Events
 * Kunde: Stepstone
 * Version: V1.1, last changed 20.10.2008, F.Raether
 */
function getfunnel(i){
	var fun=s.c_r('funnel');
	if(i=='all')return fun;
	if(fun && fun[i])return fun[i];
	return '';
}
function setfunnel(i,v){
	var fun=getfunnel(i);
	if(fun<v){
		fun=getfunnel('all');
		while(fun.length<i){
			fun+=' ';
		}//while	
		var front=fun.substr(0,i);
		var heck=fun.substr(i+1);
		fun=front+v+heck;
		s.c_w('funnel',fun,0);
	}//if
}
function funnelize(allevents){
	var evl=allevents.split(',');
	var funevents=new Array(2);
	funevents[0]=new Array('event11','event12','event14','event15','event16','event28','event29');
	//resultSearch,companypresentationsview,ListingView,ListingPrint,ListingSave,OAFClicked,OAFsent
	funevents[1]=new Array('event3','event2','event5','event6','event21','event20','event24');
	//Register,LoginB2C,JAcreated,JAactivate,CVrefresh,CVcreate,CVactivate
	var funnames=new Array(2);
	funnames[0]=new Array('A','B','C','D','E','F','G','H','I','J','K');
	funnames[1]=new Array('1','2','3','4','5','6','7','8','9');
	for(var i=0;i<funevents.length;i++){
		for(var j=0;j<funevents[i].length;j++){
			for(var k=0;k<evl.length;k++){
				if(evl[k]==funevents[i][j]){
					setfunnel(i,funnames[i][j]);	
				}//if	
			}//for k
		}//for j
	}//for i
}