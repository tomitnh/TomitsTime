var rocky = require('rocky');

/**
 * Countdown until I'm 100 years old. All times are in SECONDS
 * referenced with my biological clock. Human life span in seconds
 * fit nicely in 10 digits. The first six digits correspond to
 * seconds, minutes, hours, day, and week. The last four digits
 * correspond to month and year.
 *
 * @return { Tomit's Time }
 *   -- today: Number of seconds I have remaining at the 
 *             start of the day.
 *   -- now: Number of seconds I have remaining at the moment
 */
var tomits = (function(){
  
  
  // Start counting Date 
  var start = { date: "June 7, 2017", seconds: 2324160000 };
  
  // End Time calculated from 365 days/year starting from start.date
  var endTime = new Date(2090,12,30);
  
  
  return {
    
    
    today: function() {
      // Calculating Today's Start Time
      var diffMiliSeconds = Date.now() - new Date(start.date);
      var diffSeconds = Math.floor(diffMiliSeconds/1000);
      
      // Rounded to today's start
      diffSeconds = diffSeconds - (diffSeconds % 86400); 
      
      var todayRemains = start.seconds - diffSeconds;
      
      return todayRemains;
    },
    
    
    now: function() {
      
      // Calculating life span's remaining seconds
      var remains = endTime-Date.now(); 
      
      // Convert to seconds
	    remains = Math.floor(remains/1000); 
      
      return remains;
    },
    
    daySpan: function(num) {
      return num % 1000000;
    },
    
    yearSpan: function(num) {
      return Math.floor(num / 1000000);
    }
    
    
  }; // Tomit's Time API


}()); // Ben Alman's IIEF

rocky.on('draw', function(event) {
  // Get the CanvasRenderingContext2D object
  var ctx = event.context;

  // Clear the screen
  ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);

  // Determine the width and height of the display
  var w = ctx.canvas.unobstructedWidth;
  var h = ctx.canvas.unobstructedHeight;

  // Current date/time
  var time = tomits.now();

  // Set text font
  ctx.font = '26px bold Leco-numbers-am-pm';
  
  // Center align the text
  //ctx.textAlign = 'center';

  // ============= Drawing ==============
  
  // Fill background
  ctx.fillStyle = 'white';
  ctx.fillRect(0,0,w,h);
  
  // Display the time, in the middle of the screen
  ctx.fillStyle = 'black';
  ctx.fillText(tomits.yearSpan(time), 5, h / 2 - 17, w);
  ctx.fillStyle = 'darkgreen';
  ctx.fillText(tomits.daySpan(time), 75, h / 2 - 17, w);
});

rocky.on('secondchange', function(event) {
  // Display a message in the system logs
  // console.log("Another minute with your Pebble!");
  
  rocky.requestDraw();
});