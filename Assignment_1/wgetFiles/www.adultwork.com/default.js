if (top != self) { top.location.href = self.location.href }
function tC(id) {
	var dI = false
	if(cC > 0) { var nC = cC; cC = 0; tC(nC) }	
	if(document.all) { var dT = document.all['tbl_' + id]; dI = true }
	else if (document.getElementById) { var dT = document.getElementById('tbl_' + id); dI = true	}
	if(dI) { switch (dT.className) { case 'Hidden' : dT.className = 'Visible'; document.images['img_' + id].src = 'images/minus.gif'; break; case 'Visible' : dT.className = 'Hidden'; document.images['img_' + id].src = 'images/plus.gif'; break; } }
	else { alert('Your browser is too old to use this function.') }
	cC = id
}
function showCountry() {
	var dI = false; tC(c1)
	if(document.all) { var dT1 = document.all['pm_' + c1]; var dT2 = document.all['c_' + c2]; var s1 = document.all['s_' + c2]; dI = true }
	else if (document.getElementById) { var dT1 = document.getElementById('pm_' + c1); var dT2 = document.getElementById('c_' + c2); var s1 = document.getElementById('s_' + c2); dI = true }
	if(dI) { dT1.innerHTML = dT2.innerHTML.replace('Visible', 'Available'); dT2.innerHTML = ''; dT1.className = 'Label'; dT2.className = 'Hidden' }
}
function checkScreenSize() { }
function enterSite() { checkScreenSize(); var d = new Date(); document.forms[0].GMTOffset.value = d.getTimezoneOffset(); document.forms[0].submit() }
function leaveSite() { self.location.href = 'http://www.google.com/' }
function sC(c) { document.forms[0].CurCountryID.value = c; enterSite() }
