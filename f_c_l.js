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

for (var e = 0; e < ent.length; e++) 
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
if (moment(dates[e]).toDate() > moment(begin_now).toDate())
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
    //@@@@@@@@@@@@@@@@@@@@@@@@@@
  }

sum_sync(ids, cids, credits, c_ccredits);

for (var e = 0; e < ent.length; e++) 
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
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
}
}

    var sumccredits = sum(ccredits), sumanpmts = sum(anpmts), sumamountdifs = sum(amountdifs);
    
    return sumccredits.toFixed(2) + "@" + sumanpmts.toFixed(2) + "@" + sumamountdifs.toFixed(2);
  }
//credit end
