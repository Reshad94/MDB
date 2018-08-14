function f_all()
{
//reporting begin
var ent = libByName("Reporting").entries(); 
var acs = [], ams = [], inc_n = [], inc_a = [], exp_n = [], exp_a = [], mon_n = [], mon_a = [], op_n = [], op_a = [],
    inc_n_f = [], exp_n_f = [], mon_n_f = [];
var min_date = new Date(2017, 04, 01), max_date = new Date(2017, 04, 01);
var inc_a_f_year = new Array(2), inc_a_f_quorter = new Array(2), inc_a_f_month = new Array(2), inc_a_f_dpart = new Array(2),
    exp_a_f_year = new Array(2), exp_a_f_quorter = new Array(2), exp_a_f_month = new Array(2), exp_a_f_dpart = new Array(2),
    mon_a_f_year = new Array(2), mon_a_f_quorter = new Array(2), mon_a_f_month = new Array(2), mon_a_f_dpart = new Array(2);
var years = [], quorters = [], months = [], dparts = [];
var a_sum = 0, i_sum = 0, e_sum = 0, m_sum = 0, o_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//----------@
if ( moment(date_t(ent[e].field("Date"))).toDate() < moment(min_date).toDate() )
{ min_date = date_t(ent[e].field("Date"));  }
  if ( moment(date_t(ent[e].field("Date"))).toDate() > moment(max_date).toDate() )
{ max_date = date_t(ent[e].field("Date"));  }
//----------@
if (ent[e].field("transactionType") == 3)
{
acs.push(ent[e].field("Account"));
o_sum += pf(ent[e].field("Sum"));
op_n.push(ent[e].field("Account"));
op_a.push(ent[e].field("Sum"));
}
//----------@
if (ent[e].field("Category_Income") != "" && inc_n.indexOf(ent[e].field("Category_Income")) == -1)
{
inc_n.push(ent[e].field("Category_Income"));
}
//----------@
if (ent[e].field("Category_Expense") != "" && exp_n.indexOf(ent[e].field("Category_Expense")) == -1)
{
exp_n.push(ent[e].field("Category_Expense"));
}
//----------@
if (ent[e].field("transactionType") == 1 && mon_n.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account")) == -1)
{
mon_n.push(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"));
}
//----------@
}
//--------------------------
    inc_n_f = inc_n;
    exp_n_f = exp_n;
    mon_n_f = mon_n;
//--------------------------    
//-----------------------@@@
array_inisial_zero(ams, acs.length);
array_inisial_zero(inc_a, inc_n.length);
array_inisial_zero(exp_a, exp_n.length);
array_inisial_zero(mon_a, mon_n.length);
//----------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//---------------
a_sum += pf(ent[e].field("Signed_Sum"));
//---------------
if (pf(ent[e].field("Signed_Sum")) == 0)
{m_sum += pf(ent[e].field("Sum"));}
//------------------
if (pf(ent[e].field("Signed_Sum")) < 0)
{e_sum += -1 * pf(ent[e].field("Signed_Sum"));}
else
{i_sum +=  pf(ent[e].field("Signed_Sum"));}
//----------------
if (ent[e].field("transactionType") <= 1)
{
ams[acs.indexOf(ent[e].field("Account"))] -= pf(ent[e].field("Sum"));
}
else
{
ams[acs.indexOf(ent[e].field("Account"))] += pf(ent[e].field("Sum"));
}
//--------------
if (ent[e].field("_Account") != "")
{
//-------------
if (ent[e].field("transactionType") <= 1)
{
ams[acs.indexOf(ent[e].field("_Account"))] += pf(ent[e].field("Sum"));
}
else
{
ams[acs.indexOf(ent[e].field("_Account"))] -= pf(ent[e].field("Sum"));
}
//------------
}
//---------------
if (ent[e].field("Category_Income") != "")
{
inc_a[inc_n.indexOf(ent[e].field("Category_Income"))] += pf(ent[e].field("Sum"));
}
//---------------
if (ent[e].field("Category_Expense") != "")
{
exp_a[exp_n.indexOf(ent[e].field("Category_Expense"))] += pf(ent[e].field("Sum"));
}
//---------------
if (ent[e].field("transactionType") == 1)
{
mon_a[mon_n.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))] += pf(ent[e].field("Sum"));
}
//---------------
}
//-------------------@@@
array_sort_desc(inc_n, inc_a);
array_sort_desc(exp_n, exp_a);
array_sort_desc(mon_n, mon_a);
array_sort_desc(acs, ams);
array_sort_desc(op_n, op_a);
//-------------------@@@
var divider = "-------------------------------------------------------";
f = file("/sdcard/memento/reporting.txt");
f.writeLine("Assets:     " + tf(a_sum, 2));
f.writeLine(divider);
for (var j = 0; j < acs.length; j++) 
{
if (pf(ams[j]) > 0)
{
f.writeLine(acs[j] + ":     " + tf(ams[j], 2));

}
}
f.writeLine(divider);
f.writeLine("Incomes:     " + tf(i_sum, 2));
f.writeLine(divider);
for (var j = 0; j < inc_n.length; j++) 
{
if (pf(inc_a[j]) > 0)
{
f.writeLine(inc_n[j] + ":     " + tf(inc_a[j], 2));

}
}
f.writeLine(divider);
f.writeLine("Expenses:     " + tf(e_sum, 2));
f.writeLine(divider);
for (var j = 0; j < exp_n.length; j++) 
{
if (pf(exp_a[j]) > 0)
{
f.writeLine(exp_n[j] + ":     " + tf(exp_a[j], 2));

}
}
f.writeLine(divider);
f.writeLine("Money Transfer:     " + tf(m_sum, 2));
f.writeLine(divider);
for (var j = 0; j < mon_n.length; j++) 
{
if (pf(mon_a[j]) > 0)
{
f.writeLine(mon_n[j] + "     " + tf(mon_a[j], 2));

}
}
f.writeLine(divider);
f.writeLine("Opening Balance:     " + tf(o_sum, 2));
f.writeLine(divider);
for (var j = 0; j < op_n.length; j++)
{
if (pf(op_a[j]) > 0)
{
f.writeLine(op_n[j] + "     " + tf(op_a[j], 2));

}
}
f.writeLine(divider);
f.close();
//-------------------@@@
f = file("/sdcard/memento/frequently.txt");
f.writeLine("min:     " + moment(min_date).format("DD-MM-YYYY"));
f.writeLine(divider);
    f.writeLine("max:     " + moment(max_date).format("DD-MM-YYYY"));
    f.writeLine(divider);
        f.writeLine("inc_n_f:     " + inc_n_f);
    f.close();
//reporting end

//insurance begin
var ent = libByName("Insurance").entries(); 
var sm_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
sm_sum += pf(ent[e].field("Sum"));
}
//-------------------@@@
f = file("/sdcard/memento/insurance.txt");
f.writeLine("Insurance Amount:     " + tf(sm_sum, 2));
  f.writeLine(divider);
  for (var e = ent.length - 1; e > -1 ; e--) 
{
f.writeLine(ent[e].field("Id") + "    -    " + moment(ent[e].field("Date")).format("DD-MM-YYYY") + "    -    "  + pf(ent[e].field("Sum")).toFixed(2));
}
f.close();
//insurance end

//credit begin
var ent = libByName("Credit").entries();
var enddates = new Date(2020, 10, 30);
var x = new Date(2018, 03, 23);
var y = new Date(2018, 05, 14);
var f125 = 12.5/36000, f13 = 13/36000, new_datedifs = parseInt(0);
var ids = [], dates = [], cids = [], credits = [], ccredits = [], c_ccredits = [], cdates = [], datedifs = [], anpmts = [], amountdifs = [];
array_inisial_zero(c_ccredits, 34);

for (var e = 0; e < ent.length; e++) 
{
ids.push(parseInt(ent[e].field("Id")));
dates.push(date_t(ent[e].field("Date")));
cids.push(parseInt(ent[e].field("c_id")));
credits.push(pf(ent[e].field("Credit")));
ccredits.push(0.00);
anpmts.push(0.00);
amountdifs.push(0.00);
datedifs.push(0);
if (ids[e] <= 34)
{
if (moment(dates[e]).toDate() > moment(date_now()).toDate())
{
cdates.push(dates[e]);
}
else
{
cdates.push(date_now());
}
}
else
{
cdates.push(dates[e]);
}
datedifs[e] = date_dif(cdates[e], enddates);
}

sum_sync(ids, cids, credits, c_ccredits);

for (var e = 0; e < ent.length; e++) 
{
if (ent[e].field("Id") <= 34)
{
ccredits[e] = pf(ent[e].field("Credit")) - pf(c_ccredits[parseInt(ent[e].field("c_id")) - 1]);
}
else
{
ccredits[e] = ent[e].field("Credit");
}

if (moment(dates[e]).toDate() > moment(x).toDate())
{
anpmts[e] = Math.pow(1 + f13, datedifs[e]) * ccredits[e];
}
else
{
new_datedifs = date_dif(cdates[e], y);
anpmts[e] = (Math.pow(1 + f125, new_datedifs + 1) + Math.pow(1 + f13, datedifs[e] - new_datedifs - 1) ) * ccredits[e];
}
amountdifs[e] = anpmts[e] - ccredits[e];

}

f = file("/sdcard/memento/credit.txt");
  var sumccredits = sum(ccredits), sumanpmts = sum(anpmts), sumamountdifs = sum(amountdifs);
f.writeLine("Sum of cCredit = " + tf(sumccredits, 2));
f.writeLine("Sum of a(n)*PMT = " + tf(sumanpmts, 2));
f.writeLine("Sum of AmountDif = " + tf(sumamountdifs, 2));
f.writeLine("Result = " + tf((sm_sum - sumanpmts), 2));
  f.writeLine(divider);
f.writeLine("Id     --     Date     --     Credit     --     cCredit     --     cDate     --     c_id     --     DateDif     --     EndDate     --     a(n)*PMT     --     AmountDif");
  f.writeLine(divider);
  for (var e = 0; e < ent.length; e++) 
{
f.writeLine(ids[e] + "     --     " + moment(dates[e]).format("DD-MM-YYYY") + "     --     " + tf(credits[e], 2) +  
"     --     " + tf(ccredits[e], 2) + "     --     " + moment(date_t(cdates[e])).format("DD-MM-YYYY") +  
"     --     " + cids[e] + "     --     " + datedifs[e] 
+ "     --     " + moment(date_t(enddates)).format("DD-MM-YYYY") + "     --     " + tf(anpmts[e], 2) + "     --     " + tf(amountdifs[e], 2));
}
f.close();
//credit end

  //genaral begin
  f = file("/sdcard/memento/general.txt");
  f.writeLine("Assets:     " + tf(a_sum, 2));
f.writeLine(divider);
  f.writeLine("Sum of cCredit = " + tf(sumccredits, 2));
  f.writeLine(divider);
f.writeLine("Sum of a(n)*PMT = " + tf(sumanpmts, 2));
  f.writeLine(divider);
f.writeLine("Sum of AmountDif = " + tf(sumamountdifs, 2));
  f.writeLine(divider);
  f.writeLine("SM:     " + tf(sm_sum, 2));
    f.writeLine(divider);
  f.writeLine("Result = " + tf((sm_sum - sumanpmts), 2));
  f.close();
  //general end

}
