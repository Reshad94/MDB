function array_sort_desc(name,amount) {
  var tempVar, tempVar1
for (var i = 0; i < amount.length - 1; i++)
{
       for(var j = 0; j < amount.length - i - 1; j++)
       {
                if(parseFloat(amount[j]) < parseFloat(amount[j + 1]))
                {
                            tempVar = amount[j];
                            amount[j]= amount[j + 1];
                            amount[j + 1] = tempVar;
//
                            tempVar1 = name[j];
                            name[j]= name[j + 1];
                            name[j + 1] = tempVar1;
                }
       }
}
}
//-----------------------------------------------------------------
function array_inisial_zero(arr, l) {
for(var i = 0; i < l; i++)
{
arr.push(0.00);
}
}
//------------------------------------------------------------------
function date_now() {
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
today = dd + '.' + mm + '.' + yyyy;
  return today;
}
//----------------------------------------------------
function date_dif(date1, date2)
{
   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  //var date1_ms = date1.getMilliseconds();
  //var date2_ms = date2.getMilliseconds();

  // Calculate the difference in milliseconds
  var difference_ms = date2 - date1;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
