// perdayhr = 1

// daysperweek = 2

// diff (from, to) = 28/7 = 4

// 2 * 3 * 1 = 6

// from date
// to date
// timestart
// timeend

let perdayhr, daysperweek, fromdate, todate, timestart, timeend, afterweektotalwork;

perdayhr = 3;
daysperweek = 7;
fromdate = new Date("1/1/2022");
todate = new Date("1/31/2022");

console.log((todate - fromdate) / (1000 * 60 * 60 * 24));

totalDays = parseInt(Math.abs((todate - fromdate) / (1000 * 60 * 60 * 24)))+1;
totalweeks = parseInt(Math.abs(totalDays/7));
daysAfterWeek = parseInt(Math.floor(totalDays%7));
afterweektotalwork = Math.min(daysperweek, daysAfterWeek);

console.log(`totalhr : ${totalweeks * Math.min(daysperweek,totalDays) * perdayhr + (afterweektotalwork * perdayhr)}, totalweeks : ${totalweeks},daysafterweek : ${daysAfterWeek}, afterweektotalwork : ${afterweektotalwork} mindaysperweek-totaldays : ${Math.min(daysperweek,totalDays)}, totaldays : ${totalDays}, perhr : ${perdayhr}` );
