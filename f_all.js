function f_all()
{
//reporting begin
var ent = libByName("Balance").entries(); 
var acs = [], ams = [], inc_n = [], inc_a = [], exp_n = [], exp_a = [], mon_n = [], mon_a = [], op_n = [], op_a = [];
var a_sum = 0, i_sum = 0, e_sum = 0, m_sum = 0, o_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//----------@
if (ent[e].field("transactionType") == 3)
{
acs.push(ent[e].field("Account"));
o_sum += parseFloat(ent[e].field("Sum"));
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
//-----------------------@@@
array_inisial_zero(ams, acs.length);
array_inisial_zero(inc_a, inc_n.length);
array_inisial_zero(exp_a, exp_n.length);
array_inisial_zero(mon_a, mon_n.length);
//----------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//---------------
a_sum += parseFloat(ent[e].field("Signed_Sum"));
//---------------
if (parseFloat(ent[e].field("Signed_Sum")) == 0)
{m_sum += parseFloat(ent[e].field("Sum"));}
//------------------
if (parseFloat(ent[e].field("Signed_Sum")) < 0)
{e_sum += -1 * parseFloat(ent[e].field("Signed_Sum"));}
else
{i_sum +=  parseFloat(ent[e].field("Signed_Sum"));}
//----------------
if (ent[e].field("transactionType") <= 1)
{
ams[acs.indexOf(ent[e].field("Account"))] -= parseFloat(ent[e].field("Sum"));
}
else
{
ams[acs.indexOf(ent[e].field("Account"))] += parseFloat(ent[e].field("Sum"));
}
//--------------
if (ent[e].field("_Account") != "")
{
//-------------
if (ent[e].field("transactionType") <= 1)
{
ams[acs.indexOf(ent[e].field("_Account"))] += parseFloat(ent[e].field("Sum"));
}
else
{
ams[acs.indexOf(ent[e].field("_Account"))] -= parseFloat(ent[e].field("Sum"));
}
//------------
}
//---------------
if (ent[e].field("Category_Income") != "")
{
inc_a[inc_n.indexOf(ent[e].field("Category_Income"))] += parseFloat(ent[e].field("Sum"));
}
//---------------
if (ent[e].field("Category_Expense") != "")
{
exp_a[exp_n.indexOf(ent[e].field("Category_Expense"))] += parseFloat(ent[e].field("Sum"));
}
//---------------
if (ent[e].field("transactionType") == 1)
{
mon_a[mon_n.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))] += parseFloat(ent[e].field("Sum"));
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
f.writeLine("Assets:     " + a_sum.toFixed(2));
f.writeLine(divider);
for (var j = 0; j < acs.length; j++) 
{
if (parseFloat(ams[j]) > 0)
{
f.writeLine(acs[j] + ":     " + ams[j].toFixed(2));

}
}
f.writeLine(divider);
f.writeLine("Incomes:     " + i_sum.toFixed(2));
f.writeLine(divider);
for (var j = 0; j < inc_n.length; j++) 
{
if (parseFloat(inc_a[j]) > 0)
{
f.writeLine(inc_n[j] + ":     " + inc_a[j].toFixed(2));

}
}
f.writeLine(divider);
f.writeLine("Expenses:     " + e_sum.toFixed(2));
f.writeLine(divider);
for (var j = 0; j < exp_n.length; j++) 
{
if (parseFloat(exp_a[j]) > 0)
{
f.writeLine(exp_n[j] + ":     " + exp_a[j].toFixed(2));

}
}
f.writeLine(divider);
f.writeLine("Money Transfer:     " + m_sum.toFixed(2));
f.writeLine(divider);
for (var j = 0; j < mon_n.length; j++) 
{
if (parseFloat(mon_a[j]) > 0)
{
f.writeLine(mon_n[j] + "     " + mon_a[j].toFixed(2));

}
}
f.writeLine(divider);
f.writeLine("Opening Balance:     " + o_sum.toFixed(2));
f.writeLine(divider);
for (var j = 0; j < op_n.length; j++)
{
if (parseFloat(op_a[j]) > 0)
{
f.writeLine(op_n[j] + "     " + op_a[j].toFixed(2));

}
}
f.writeLine(divider);
f.close();
//reporting end

//insurance begin
var ent = libByName('Insurance").entries(); 
var a_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//---------------
a_sum += parseFloat(ent[e].field("Sum"));
//---------------
}
//-------------------@@@
f = file("/sdcard/memento/insurance.txt");
f.writeLine("SM:     " + a_sum.toFixed(2));
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
credits.push(parseFloat(ent[e].field("Credit")));
ccredits.push(0.00);
anpmts.push(0.00);
amountdifs.push(0.00);
datedifs.push(0);
if (ids[e] < 34)
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
ccredits[e] = parseFloat(ent[e].field("Credit")) - parseFloat(c_ccredits[parseInt(ent[e].field("c_id")) - 1]);
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
f.writeLine("Id     --     Date     --     Credit     --     cCredit     --     cDate     --     c_id     --     DateDif     --     EndDate     --     a(n)*PMT     --     AmountDif");
for (var e = 0; e < ent.length; e++) 
{
f.writeLine(ids[e] + "     --     " + moment(dates[e]).format("DD-MM-YYYY") + "     --     " + credits[e].toFixed(2) +  
"     --     " + ccredits[e].toFixed(2) + "     --     " + moment(date_t(cdates[e])).format("DD-MM-YYYY") +  
"     --     " + cids[e] + "     --     " + datedifs[e] 
+ "     --     " + moment(date_t(enddates)).format("DD-MM-YYYY") + "     --     " + anpmts[e].toFixed(2) + "     --     " + amountdifs[e].toFixed(2));
}

var sumccredits = sum(ccredits), sumanpmts = sum(anpmts), , sumamountdifs = sum(amountdifs);
f.writeLine("Sum of cCredit = " + sumccredits.toFixed(2));
f.writeLine("Sum of a(n)*PMT = " + sumanpmts.toFixed(2));
f.writeLine("Sum of AmountDif = " + sumamountdifs.toFixed(2));
f.close();
//credit end


}
