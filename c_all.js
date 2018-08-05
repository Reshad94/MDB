function c_all()
{
var begin_date =  new Date(2018, 07, 01);
 var now = date_now();
var n = date_dif(begin_date, now);
  message (n);
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
  var divider = "-------------------------------------------------------";
f = file("/sdcard/memento/compare.txt");
  for (var i = n; i >= 0; i--)
  {
  f.writeLine(f_c_l(moment(begin_date).add(i, "days")));
    f.writeLine(divider);
  }
  //main loop end
  
  
  
}
 
