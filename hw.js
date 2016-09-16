window.onload = function(){
  /// DO NOT EDIT ABOVE THIS LINE ///

  /// Application Logic ///
  var Stopwatch = {
    advanceTheClock: function(){ // Provided Code : DO NOT EDIT THIS FUNCTION
      if (Stopwatch.isRunning) {
        Stopwatch.updateTimeValues();
        setTimeout(Stopwatch.advanceTheClock, 10);
      }
    },
    isRunning: false,
    mins: 0,
    secs: 0,
    millisecs: 0,
    laps: [],
    updateTimeValues: function(){
      this.millisecs += 10;
      if (this.millisecs >= 1000) {
        this.millisecs -= 1000;
        this.secs++;
      }
      if (this.secs >= 60) {
        this.secs -= 60;
        this.mins++;
      }
      Display.updateTimeDisplay();
    },
    reset: function(){
      this.mins = 0;
      this.secs = 0;
      this.millisecs = 0;
      this.laps = [];
    },
    start: function(){
      if (!this.isRunning) {
        this.isRunning = true;
        this.advanceTheClock(); // start the clock ticking
      }
    },
    stop: function(){
      this.isRunning = false;
    },
    lap: function(){
      if (this.isRunning) {
        this.laps.push({
          mins: this.mins,
          secs: this.secs,
          millisecs: this.millisecs
        });
        // A shorter way is to use the `Object.assign` method
        // this.laps.push(Object.assign({}, this.timeValues));
      }
    }
  };

  /// User Interface ///
  var Display = {
    zeroFill: function(number, length){
      var str = number.toString();
      if (str.length < length) {
        for( var i = 0; i < (length - str.length); i++){
          str = '0' + str;
        }
      }
      return str;
    },
    updateTimeDisplay: function(){
      document.getElementById('mins').innerHTML = this.zeroFill(Stopwatch.mins, 2);
      document.getElementById('secs').innerHTML = this.zeroFill(Stopwatch.secs, 2);
      document.getElementById('millisecs').innerHTML = this.zeroFill(Stopwatch.millisecs/10, 2);
    },
    updateLapList: function(){
      var laps = Stopwatch.laps;
      var lapList = document.getElementById('lap-list');
      lapList.innerHTML = '';
      for (var i = 0; i < laps.length; i++) {
        lapList.innerHTML += "\
        <li>" +
          this.zeroFill(laps[i].mins, 2) + ":" +
          this.zeroFill(laps[i].secs, 2) + ":" +
          this.zeroFill(laps[i].millisecs/10, 2) +
        "</li>";
      }
    },
  };
  var EventHandlers = {
    onClickStart: function() {
      debugger;
      Stopwatch.start();
    },
    onClickLap: function(){
      if (Stopwatch.isRunning) {
        Stopwatch.lap();
        Display.updateLapList();
      }
    },
    onClickStopReset: function(){
      if (Stopwatch.isRunning) {
        Stopwatch.stop();
      } else {
        Stopwatch.reset();
        Display.updateTimeDisplay();
        Display.updateLapList();
      }
    }
  };
  // Set your event handlers in the lines below.
  document.getElementById('start').onclick = EventHandlers.onClickStart;
  document.getElementById('lap').onclick = EventHandlers.onClickLap;
  document.getElementById('stop').onclick = EventHandlers.onClickStopReset;
};
