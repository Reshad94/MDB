function f_all()
{
//reporting begin
var ent = libByName("Reporting").entries(); 
var acs = [], ams = [], inc_n = [], inc_a = [], exp_n = [], exp_a = [], mon_n = [], mon_a = [], op_n = [], op_a = [],
    inc_n_f = [], exp_n_f = [], mon_n_f = [];
var min_date = new Date(2017, 04, 01), max_date = date_now();
var years = [], quorters = [], months = [], dparts = [];
var a_sum = 0, i_sum = 0, e_sum = 0, m_sum = 0, o_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//----------@
if ( moment(date_t(ent[e].field("Date"))).toDate() < moment(min_date).toDate() )
{ min_date = date_t(ent[e].field("Date"));  }
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
    array_copy(inc_n, inc_n_f);
    array_copy(exp_n, exp_n_f);
    array_copy(mon_n, mon_n_f);
//--------------------------    
    for (var i = min_date.getFullYear(); i <= max_date.getFullYear(); i++)
    {
        years.push(i);
    if ( i == min_date.getFullYear() )
    {
        for(var k = quorter(min_date); k <= 4; k++)
            {
             quorters.push(k + "_" + i);   
            }
        for(var k = min_date.getMonth()+1; k <= 12; k++)
            {
             months.push(k + "_" + i);   
                for(var n = 1; n <= 3; n++)
                {
                    dparts.push(n + "_" + k + "_" + i);
                }
            }
    }
        else
    if ( i == max_date.getFullYear() )   
    {
        for(var t = 1; t <= quorter(max_date); t++)
            {
             quorters.push(t + "_" + i);   
            }
        for(var t = 1; t <= max_date.getMonth()+1; t++)
            {
             months.push(t + "_" + i);   
                for(var n = 1; n <= 3; n++)
                {
                    dparts.push(n + "_" + t + "_" + i);
                }
            }
    }
        else
        {
            for(var j = 1; j <= 4; j++)
            {
             quorters.push(j + "_" + i);   
            }
            for(var j = 1; j <= 12; j++)
            {
             months.push(j + "_" + i);   
                for(var n = 1; n <= 3; n++)
                {
                    dparts.push(n + "_" + j + "_" + i);
                }
            }
        }
    }
//-------------------------- 
    var inc_a_f_year = [], inc_a_f_quorter = [], inc_a_f_month = [], inc_a_f_dpart = [],
    exp_a_f_year = [], exp_a_f_quorter = [], exp_a_f_month = [], exp_a_f_dpart = [],
    mon_a_f_year =  [], 
    mon_a_f_quorter = [], 
    mon_a_f_month = [], 
    mon_a_f_dpart = [];
    
    two_dim_array_inisial_zero(inc_a_f_year, inc_n_f.length, years.length);
    two_dim_array_inisial_zero(inc_a_f_quorter, inc_n_f.length, quorters.length);
    two_dim_array_inisial_zero(inc_a_f_month, inc_n_f.length, months.length);
    two_dim_array_inisial_zero(inc_a_f_dpart, inc_n_f.length, dparts.length);
    
    two_dim_array_inisial_zero(exp_a_f_year, exp_n_f.length, years.length);
    two_dim_array_inisial_zero(exp_a_f_quorter, exp_n_f.length, quorters.length);
    two_dim_array_inisial_zero(exp_a_f_month, exp_n_f.length, months.length);
    two_dim_array_inisial_zero(exp_a_f_dpart, exp_n_f.length, dparts.length);
    
    two_dim_array_inisial_zero(mon_a_f_year, mon_n_f.length, years.length);
    two_dim_array_inisial_zero(mon_a_f_quorter, mon_n_f.length, quorters.length);
    two_dim_array_inisial_zero(mon_a_f_month, mon_n_f.length, months.length);
    two_dim_array_inisial_zero(mon_a_f_dpart, mon_n_f.length, dparts.length);
//-----------------------@@@
array_inisial_zero(ams, acs.length);
array_inisial_zero(inc_a, inc_n.length);
array_inisial_zero(exp_a, exp_n.length);
array_inisial_zero(mon_a, mon_n.length);
    //f = file("/sdcard/memento/test.txt");
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
    
    
    
    
    inc_a_f_year[inc_n_f.indexOf(ent[e].field("Category_Income"))]
    [years.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    inc_a_f_quorter[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[quorters.indexOf(quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        inc_a_f_month[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[months.indexOf((ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            inc_a_f_dpart[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[dparts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
    
    
}
//---------------
if (ent[e].field("Category_Expense") != "")
{
exp_a[exp_n.indexOf(ent[e].field("Category_Expense"))] += pf(ent[e].field("Sum"));
    
    
    
    
        exp_a_f_year[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
    [years.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    exp_a_f_quorter[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[quorters.indexOf(quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        exp_a_f_month[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[months.indexOf((ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            exp_a_f_dpart[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[dparts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
    
    
    
    
}
//---------------
if (ent[e].field("transactionType") == 1)
{
mon_a[mon_n.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))] += pf(ent[e].field("Sum"));
    
mon_a_f_year[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
    [years.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    mon_a_f_quorter[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[quorters.indexOf(quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        mon_a_f_month[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[months.indexOf((ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            mon_a_f_dpart[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[dparts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
//    f.writeLine("id = " + ent[e].field("ID") + " " + ent[e].field("Account") + "   ==>   " + ent[e].field("_Account") + " " + 
//               moment(date_t(ent[e].field("Date"))).toDate().getFullYear() + " sum = " + tf(pf(ent[e].field("Sum")), 2) +
//         " mon_n_f.index: " +  mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account")) +
 //               " years.indexof: " + years.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear()) +
//                " res: " + tf(mon_a_f_year[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
//    [years.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())], 2)
 //               );
}
//---------------
}
//-------------------@@@
array_sort_desc(inc_n, inc_a);
    //f.close();
array_sort_desc(exp_n, exp_a);
array_sort_desc(mon_n, mon_a);
array_sort_desc(acs, ams);
array_sort_desc(op_n, op_a);
//-------------------@@@
var divider = "-------------------------------------------------------";
f = file("/sdcard/memento/report.csv");
    f.writeLine('"Name", "Sum"');
f.writeLine('"Assets", "' + tf(a_sum, 2) + '"');
f.writeLine('"' + divider + '",');
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
    var s = "";
    f.writeLine("Money Transfer");
    f.writeLine(divider);
        for (var i = 0; i < mon_n_f.length; i++)
{
    s = mon_n_f[i] + ":";
    for (var j = 0; j < years.length; j++)
{
       s += "    (" + years[j] + ") = " + tf(mon_a_f_year[i][j], 2);
}
     f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < mon_n_f.length; i++)
{
    s = mon_n_f[i] + ":";
    for (var j = 0; j < quorters.length; j++)
{
    s += "    (" + quorters[j] + ") = " + tf(mon_a_f_quorter[i][j], 2);
}
         f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < mon_n_f.length; i++)
{
    s = mon_n_f[i] + ":";
    for (var j = 0; j < months.length; j++)
{
    s += "    (" + months[j] + ") = " + tf(mon_a_f_month[i][j], 2);
}
             f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < mon_n_f.length; i++)
{
     s = mon_n_f[i] + ":";
    for (var j = 0; j < dparts.length; j++)
{
    s += "    (" + dparts[j] + ") = " + tf(mon_a_f_dpart[i][j], 2);
}
                 f.writeLine(s);
    s = "";
}
    
    f.writeLine(divider);
    f.writeLine("Incomes");
    f.writeLine(divider);
            for (var i = 0; i < inc_n_f.length; i++)
{
         s = inc_n_f[i] + ":";
    for (var j = 0; j < years.length; j++)
{
        s += "    (" + years[j] + ") = " + tf(inc_a_f_year[i][j], 2);
}
                     f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < inc_n_f.length; i++)
{
             s = inc_n_f[i] + ":";
    for (var j = 0; j < quorters.length; j++)
{
            s += "    (" + quorters[j] + ") = " + tf(inc_a_f_quorter[i][j], 2);
}
                         f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < inc_n_f.length; i++)
{
                 s = inc_n_f[i] + ":";
    for (var j = 0; j < months.length; j++)
{
                s += "    (" + months[j] + ") = " + tf(inc_a_f_month[i][j], 2);
}
                             f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < inc_n_f.length; i++)
{
                     s = inc_n_f[i] + ":";
    for (var j = 0; j < dparts.length; j++)
{
                    s += "    (" + dparts[j] + ") = " + tf(inc_a_f_dpart[i][j], 2);
}
                                 f.writeLine(s);
    s = "";
}
    
    
        f.writeLine(divider);
    f.writeLine("Expenses");
    f.writeLine(divider);
    
                for (var i = 0; i < exp_n_f.length; i++)
{
                         s = exp_n_f[i] + ":";
    for (var j = 0; j < years.length; j++)
{
                        s += "    (" + years[j] + ") = " + tf(exp_a_f_year[i][j], 2);
}
                                     f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < exp_n_f.length; i++)
{
                             s = exp_n_f[i] + ":";
    for (var j = 0; j < quorters.length; j++)
{
                            s += "    (" + quorters[j] + ") = " + tf(exp_a_f_quorter[i][j], 2);
}
                                         f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < exp_n_f.length; i++)
{
                                 s = exp_n_f[i] + ":";
    for (var j = 0; j < months.length; j++)
{
                                s += "    (" + months[j] + ") = " + tf(exp_a_f_month[i][j], 2);
}
                                             f.writeLine(s);
    s = "";
}
            f.writeLine(divider);
            for (var i = 0; i < exp_n_f.length; i++)
{
                                     s = exp_n_f[i] + ":";
    for (var j = 0; j < dparts.length; j++)
{
                                    s += "    (" + dparts[j] + ") = " + tf(exp_a_f_dpart[i][j], 2);
}
                                                 f.writeLine(s);
    s = "";
}
    
    
    
    

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
