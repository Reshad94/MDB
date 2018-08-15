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
//-----------------------------------------------------------------
function two_dim_array_inisial_zero(arr, numRows, numColumns) {
	let arr = new Array(numRows); 

	for(let i = 0; i < numColumns; i++) {
		arr[i] = new Array(numColumns); 
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
today = yyyy + '-' + mm + '-' + dd;
  
  var parts = today.split('-');
var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
  return mydate;
}
//---------------------------------------------------
function date_t(d) {
  var dd = d.getDate();
var mm = d.getMonth()+1; //January is 0!
var yyyy = d.getFullYear();
if(dd<10) {
    dd = '0'+dd
} 
if(mm<10) {
    mm = '0'+mm
} 
var parts = (yyyy + '-' + mm + '-' + dd).split('-');
var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
  return mydate;
}
//----------------------------------------------------
function date_dif(date1, date2)
{
   //Get 1 day in milliseconds
  var one_day=1000*60*60*24;

  // Convert both dates to milliseconds
  var date1_ms = date1.valueOf();
  var date2_ms = date2.valueOf();

  // Calculate the difference in milliseconds
  var difference_ms = date2_ms - date1_ms;
    
  // Convert back to days and return
  return Math.round(difference_ms/one_day); 
}
//---------------------------------------
function sum_sync(arr1, arr2, arr3, arr4) {
for (var e = 0; e < arr1.length; e++) 
{
  if (arr1[e] > 34)
  {
  arr4[arr2[e] - 1] += parseFloat(arr3[e]);
  }
}
}
//---------------------------------------------
function sum(arr) {
var sum = 0.00;
for (var i = 0; i < arr.length; i++) {
  sum += arr[i];
}
return sum
}
//---------------------------------------------
function f_print_each(a1, a2, a3, a4, a5, a6, a7, a8, a9, str, dt)
{
  var divider = "-------------------------------------------------------";
  f = file("/sdcard/memento/compare-" + dt + " .txt");
  f.writeLine(str);
  f.writeLine(divider);
  for (var e = 0; e < a1.length; e++) 
{
f.writeLine(a1[e] + "@" + moment(a2[e]).format("DD-MM-YYYY") + "@" + a3[e].toFixed(2) + 
              "@" + moment(a4[e]).format("DD-MM-YYYY") +
"@" + a5[e].toFixed(2) +
"@" + a6[e] + "@" + a7[e] 
+  "@" + a8[e].toFixed(2) + "@" + a9[e].toFixed(2));
}
f.close();
}
//--------------------------------------
function quorter(d) {
  if ( moment(d).toDate() < ( new Date(d.getFullYear(), 03, 01) ) )
  {return 1;}
  else 
                 if ( moment(d).toDate() < ( new Date(d.getFullYear(), 06, 01) ) )
  {return 2;}
  else
    if ( moment(d).toDate() < ( new Date(d.getFullYear(), 09, 01) ) )
  {return 3;}
  else
  {
    return 4;
  }
}
//--------------------------------------
function dayp(d) {
  if ( d.getDate() <= 10 )
  {return 1;}
  else 
if ( d.getDate() <= 20 )
  {return 2;}
  else
  {
    return 3;
  }
}
//--------------------------------------
function pf(n)
{return parseFloat(n);}
function pi(n)
{return parseInt(n);}
function ps(n)
{return n.toString();}
function tp(n)
{return typeof n;}
function tf(n, c)
{return n.toFixed(c);}
