function c_all()
{
var begin_date =  new Date(2018, 07, 01);
 var now = date_now();
var n = date_dif(begin_date, now);
 var ccc = [], aaa = [], amamam = [];
 var temp;
//  message (n);
var divider = "-------------------------------------------------------";
//insurance begin
var ent = libByName("Insurance").entries(); 
var sm_sum = 0;
for (var e = 0; e < ent.length; e++) 
{
sm_sum += parseFloat(ent[e].field("Sum"));
}
//insurance end

  //main loop begin
  for (var i = n; i >= 0; i--)
  {
  temp = f_c_l(moment(begin_date).add(i, "days"));
   var parts = temp.split('@');
ccc.push(parseFloat(parts[0]));
   aaa.push(parseFloat(parts[1]));
   amamam.push(parseFloat(parts[2]));
  }
  //main loop end
  
   var divider = "-------------------------------------------------------";
f = file("/sdcard/memento/compare.txt");
  for (var i = 0; i <= n - 1; i++)
  {
   f.writeLine("(" + (i + 1).toFixed() + ") - " + moment(begin_date).add(i, "days").format("DD-MM-YYYY")   );
   f.writeLine("Credit     " + ccc[i + 1].toFixed(2) + "  =>  " + ccc[i].toFixed(2) +
               "  (" + (ccc[i] - ccc[i + 1]).toFixed(2) );
  }
 

  
}
 
