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
