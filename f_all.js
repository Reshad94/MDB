function f_all()
{
//reporting begin
var ent = libByName("Reporting").entries(); 
var ac_n = [], ac_a = [], inc_n = [], inc_a = [], exp_n = [], exp_a = [], mon_n = [], mon_a = [], op_n = [], op_a = [],
    ag_n = [], ag_a = [],
    inc_n_f = [], exp_n_f = [], mon_n_f = [];
var min_date = new Date(2021, 12, 01), max_date = date_now();
var all_parts = [];
var a_sum = 0, i_sum = 0, e_sum = 0, m_sum = 0, o_sum = 0, ag_sum = 0;
//------------------------@@@
for (var e = 0; e < ent.length; e++) 
{
//----------@
if ( moment(date_t(ent[e].field("Date"))).toDate() < moment(min_date).toDate() )
{ min_date = date_t(ent[e].field("Date"));  }
//----------@
if (ent[e].field("transactionType") == 3)
{
ac_n.push(ent[e].field("Account"));
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
if (ent[e].field("Agent") != "" && ag_n.indexOf(ent[e].field("Agent")) == -1)
{
ag_n.push(ent[e].field("Agent"));
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
    if ( i == min_date.getFullYear() )
    {
        for(var k = min_date.getMonth()+1; k <= 12; k++)
            { 
                for(var n = 1; n <= 3; n++)
                {
                    all_parts.push(n + "_" + k + "_" + i);//dpart
                }
                all_parts.push("m_" + k + "_" + i);//month   
                if(k % 3 == 0)//quorter  
                {all_parts.push("q_" + (k / 3) + "_" + i);}             
            }
    }
        else
    if ( i == max_date.getFullYear() )   
    {
        for(var t = 1; t <= max_date.getMonth()+1; t++)
            {
                for(var n = 1; n <= 3; n++)
                {
                    all_parts.push(n + "_" + t + "_" + i);//dpart
                }
                all_parts.push("m_" + t + "_" + i);//month   
                if(t == max_date.getMonth()+1)
                {
                    if(t % 3 == 0)
                    {all_parts.push("q_" + (t / 3) + "_" + i);} 
                    else
                    {
                        all_parts.push("q_" + (pi(t / 3) + 1) + "_" + i);
                    }
                }
                else
                    if(t % 3 == 0)//quorter 
                {all_parts.push("q_" + (t / 3) + "_" + i);} 
            }
    }
        else
        {
            for(var j = 1; j <= 12; j++)
            {  
                for(var n = 1; n <= 3; n++)
                {
                      all_parts.push(n + "_" + j + "_" + i);//dpart
                }
                all_parts.push("m_" + j + "_" + i);//month 
                if(j % 3 == 0)//quorter  
                {all_parts.push("q_" + (j / 3) + "_" + i);}
            }
        }
        all_parts.push(i);//year
    }
    all_parts.push("All");//all
//-------------------------- 
    var inc_a_f_all = [], exp_a_f_all = [], mon_a_f_all =  [];   
    two_dim_array_inisial_zero(inc_a_f_all, inc_n_f.length, all_parts.length);  
    two_dim_array_inisial_zero(exp_a_f_all, exp_n_f.length, all_parts.length); 
    two_dim_array_inisial_zero(mon_a_f_all, mon_n_f.length, all_parts.length);
//-----------------------@@@
array_inisial_zero(ac_a, ac_n.length);
array_inisial_zero(inc_a, inc_n.length);
array_inisial_zero(exp_a, exp_n.length);
array_inisial_zero(mon_a, mon_n.length);
array_inisial_zero(ag_a, ag_n.length);
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
if (ent[e].field("Agent") != "")
{
ag_a[ag_n.indexOf(ent[e].field("Agent"))] += pf(ent[e].field("Sum"));
ag_sum += pf(ent[e].field("Sum"));
}
//----------------
if (ent[e].field("transactionType") <= 1)
{
ac_a[ac_n.indexOf(ent[e].field("Account"))] -= pf(ent[e].field("Sum"));
}
else
{
ac_a[ac_n.indexOf(ent[e].field("Account"))] += pf(ent[e].field("Sum"));
}
//--------------
if (ent[e].field("_Account") != "")
{
//-------------
if (ent[e].field("transactionType") <= 1)
{
ac_a[ac_n.indexOf(ent[e].field("_Account"))] += pf(ent[e].field("Sum"));
}
else
{
ac_a[ac_n.indexOf(ent[e].field("_Account"))] -= pf(ent[e].field("Sum"));
}
//------------
}
//---------------
if (ent[e].field("Category_Income") != "")
{
inc_a[inc_n.indexOf(ent[e].field("Category_Income"))] += pf(ent[e].field("Sum"));
    
    
    
    
    inc_a_f_all[inc_n_f.indexOf(ent[e].field("Category_Income"))]
    [all_parts.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    inc_a_f_all[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[all_parts.indexOf("q_" + quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        inc_a_f_all[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[all_parts.indexOf("m_" + (ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            inc_a_f_all[inc_n_f.indexOf(ent[e].field("Category_Income"))]
[all_parts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
    
    
}
//---------------
if (ent[e].field("Category_Expense") != "")
{
exp_a[exp_n.indexOf(ent[e].field("Category_Expense"))] += pf(ent[e].field("Sum"));
    
    
    
    
        exp_a_f_all[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
    [all_parts.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    exp_a_f_all[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[all_parts.indexOf("q_" + quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        exp_a_f_all[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[all_parts.indexOf("m_" + (ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            exp_a_f_all[exp_n_f.indexOf(ent[e].field("Category_Expense"))]
[all_parts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
    
    
    
    
}
//---------------
if (ent[e].field("transactionType") == 1)
{
mon_a[mon_n.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))] += pf(ent[e].field("Sum"));
    
mon_a_f_all[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
    [all_parts.indexOf(moment(date_t(ent[e].field("Date"))).toDate().getFullYear())] += pf(ent[e].field("Sum"));
    
    mon_a_f_all[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[all_parts.indexOf("q_" + quorter(ent[e].field("Date")) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
        mon_a_f_all[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[all_parts.indexOf("m_" + (ent[e].field("Date").getMonth() + 1) + "_" + moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    
            mon_a_f_all[mon_n_f.indexOf(ent[e].field("Account") + "   ==>   " + ent[e].field("_Account"))]
[all_parts.indexOf(dayp(ent[e].field("Date")) + "_" + (ent[e].field("Date").getMonth() + 1) + "_" +
                moment(date_t(ent[e].field("Date"))).toDate().getFullYear())]
        += pf(ent[e].field("Sum"));
    

}
//---------------
}
//-------------------@@@
    for(var i = 0; i < mon_n.length; i++)
    {
     mon_a_f_all[i][all_parts.length - 1] = mon_a[i];   
    }
        for(var i = 0; i < inc_n.length; i++)
    {
     inc_a_f_all[i][all_parts.length - 1] = inc_a[i];   
    }
        for(var i = 0; i < exp_n.length; i++)
    {
     exp_a_f_all[i][all_parts.length - 1] = exp_a[i];   
    }
//-------------------@@@
array_sort_desc(inc_n, inc_a);
    //f.close();
array_sort_desc(exp_n, exp_a);
array_sort_desc(mon_n, mon_a);
array_sort_desc(ac_n, ac_a);
array_sort_desc(op_n, op_a);
array_sort_desc(ag_n, ag_a);
//-------------------@@@
var divider = "-------------------------------------------------------";
    var divs = "----------------";
f = file("/storage/emulated/0/com.luckydroid.droidbase/files/files/report.csv");
    f.writeLine('"Name","Sum"');
f.writeLine('"Assets","' + tf(a_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < ac_n.length; j++) 
{
//if (pf(ac_a[j]) > 0.005)
{
f.writeLine('"' + ac_n[j] + '","' + tf(ac_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
    f.writeLine('"Incomes","' + tf(i_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < inc_n.length; j++) 
{
//if (pf(inc_a[j]) > 0.005)
{
    f.writeLine('"' + inc_n[j] + '","' + tf(inc_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
        f.writeLine('"Expenses","' + tf(e_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < exp_n.length; j++) 
{
//if (pf(exp_a[j]) > 0.005)
{
    f.writeLine('"' + exp_n[j] + '","' + tf(exp_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
            f.writeLine('"Money Transfer","' + tf(m_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < mon_n.length; j++) 
{
//if (pf(mon_a[j]) > 0.005)
{
        f.writeLine('"' + mon_n[j] + '","' + tf(mon_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
                f.writeLine('"Opening Balance","' + tf(o_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < op_n.length; j++)
{
//if (pf(op_a[j]) > 0.005)
{
        f.writeLine('"' + op_n[j] + '","' + tf(op_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
                    f.writeLine('"Agent","' + tf(ag_sum, 2) + '"');
f.writeLine('"' + divider + '","' + divs + '"');
for (var j = 0; j < ag_n.length; j++)
{
//if (pf(ag_a[j]) > 0.005)
{
        f.writeLine('"' + ag_n[j] + '","' + tf(ag_a[j], 2) + '"');
}
}
f.writeLine('"' + divider + '","' + divs + '"');
f.close();
//-------------------@@@
f = file("/storage/emulated/0/com.luckydroid.droidbase/files/files/frequently.csv");
    var s = "";
    var divid = "----------";
    var title = '"Name"';
    var divider_new = '"' + divid + '"';
    var word_m_t = '"Money Transfer"';
    var word_inc = '"Incomes"';
        var word_exp = '"Expenses"';
    //all basladi
    for(var i = 0; i < all_parts.length; i++)
    {
     title += ',"' + all_parts[i] + '"';   
        divider_new += ',"' + divid + '"';
        word_m_t += ',""';
        word_inc += ',""';
         word_exp += ',""';
    }
    f.writeLine(title);
             f.writeLine(word_m_t);
    f.writeLine(divider_new);
        for (var i = 0; i < mon_n_f.length; i++)
{
    s = '"' + mon_n_f[i] + '"';
    for (var j = 0; j < all_parts.length; j++)
{
       s += ',"' + tf(mon_a_f_all[i][j], 2) + '"';
}
     f.writeLine(s);
    s = "";
}
            f.writeLine(divider_new);
f.writeLine(word_inc);
    f.writeLine(divider_new);
            for (var i = 0; i < inc_n_f.length; i++)
{
        s = '"' + inc_n_f[i] + '"';
    for (var j = 0; j < all_parts.length; j++)
{
           s += ',"' + tf(inc_a_f_all[i][j], 2) + '"';
}
                     f.writeLine(s);
    s = "";
}
            f.writeLine(divider_new);
f.writeLine(word_exp);
            f.writeLine(divider_new); 
                for (var i = 0; i < exp_n_f.length; i++)
{
            s = '"' + exp_n_f[i] + '"';
    for (var j = 0; j < all_parts.length; j++)
{
               s += ',"' + tf(exp_a_f_all[i][j], 2) + '"';
}
                                     f.writeLine(s);
    s = "";
}
            f.writeLine(divider_new); 
        f.close();
 //al bitdi.     
    
//reporting end


}
