 function f_c_l(begin_now)
  {
//credit begin
var ent = libByName("Credit").entries();
var enddates = new Date(2020, 10, 30);
var x = new Date(2018, 03, 23);
var y = new Date(2018, 05, 14);
var f125 = 12.5/36000, f13 = 13/36000, new_datedifs = parseInt(0);
var ids = [], dates = [], cids = [], credits = [], ccredits = [], c_ccredits = [], cdates = [], datedifs = [], anpmts = [], amountdifs = [];
array_inisial_zero(c_ccredits, 34);

   var iii = 0;
for (var e = 0; e < ent.length; e++) 
{
  if (
    (
      moment(date_t(ent[e].field("Date"))).toDate() <= moment(begin_now).toDate()
     &&
      ent[e].field("Id") > 34
     )
    ||
    (
    ent[e].field("Id") <= 34
    )
     )
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  {

ids.push(parseInt(ent[e].field("Id")));
dates.push(date_t(ent[e].field("Date")));
cids.push(parseInt(ent[e].field("c_id")));
credits.push(parseFloat(ent[e].field("Credit")));
ccredits.push(0.00);
anpmts.push(0.00);
amountdifs.push(0.00);
datedifs.push(0);
if (ids[iii] <= 34)
{
if (moment(dates[iii]).toDate() > moment(begin_now).toDate())
{
cdates.push(dates[iii]);
}
else
{
cdates.push(begin_now);
}
}
else
{
cdates.push(dates[iii]);
}
datedifs[iii] = date_dif(cdates[iii], enddates);
   iii += 1;
}
    //@@@@@@@@@@@@@@@@@@@@@@@@@@
  }

sum_sync(ids, cids, credits, c_ccredits);

   var jjj = 0;
for (var e = 0; e < ent.length; e++) 
{
    if (
    (
      moment(date_t(ent[e].field("Date"))).toDate() <= moment(begin_now).toDate()
     &&
      ent[e].field("Id") > 34
     )
    ||
    (
    ent[e].field("Id") <= 34
    )
     )
    //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  {

if (ent[e].field("Id") <= 34)
{
ccredits[jjj] = parseFloat(ent[e].field("Credit")) - parseFloat(c_ccredits[parseInt(ent[e].field("c_id")) - 1]);
}
else
{
ccredits[jjj] = ent[e].field("Credit");
}

if (moment(dates[jjj]).toDate() > moment(x).toDate())
{
anpmts[jjj] = Math.pow(1 + f13, datedifs[jjj]) * ccredits[jjj];
}
else
{
new_datedifs = date_dif(cdates[jjj], y);
anpmts[jjj] = (Math.pow(1 + f125, new_datedifs + 1) + Math.pow(1 + f13, datedifs[jjj] - new_datedifs - 1) ) * ccredits[jjj];
}
amountdifs[jjj] = anpmts[jjj] - ccredits[jjj];
   jjj += 1;
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
}
}


//   f_print_each(ids, dates, credits, cdates, ccredits, cids, datedifs, anpmts, amountdifs, 
// "Id     Dates     Credit     cDate     cCredit     cid     DateDif     a(n)*PMT     AmountDif",
 //               moment(begin_now).format("DD-MM-YYYY")
 //              );
   
   
   
    var sumccredits = sum(ccredits), sumanpmts = sum(anpmts), sumamountdifs = sum(amountdifs), sumiamount = sum_with_date(ccredits, cdates, begin_now);
    
    return sumccredits.toFixed(2) + "@" + sumanpmts.toFixed(2) + "@" + sumamountdifs.toFixed(2) + "@" + sumiamount.toFixed(2);
  }
//credit end
