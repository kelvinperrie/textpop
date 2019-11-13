
var Player = function(parts, element) {
    var self = this;

    self.parts = parts;
    self.elment = element;
    console.log(self.parts);

    self.play = function() {
        console.log("going to play");
        for(var i = 0 ; i < self.parts.length ; i ++) {
            var part = self.parts[i];
            console.log("setting timout for " + part.output);
            setTimeout(self.createPartHtml, part.delay, part);
        }
    }
    self.createPartHtml = function(part) {
        console.log("output "+part.output);
    }
}

var Recorder = function() {
    var self = this;

    self.status = "";
    self.parts = [];
    self.textForOutput = [];
    self.currentPartIndex = 0;
    self.startTime = null;

    self.startRecording = function() {
        self.clearOutput();
        self.textForOutput = $("#text-to-output").val().split(" ");
        self.currentPartIndex = 0;
        self.startTime = new Date();
        self.setStatus("recording");
    }
    self.stopRecording = function() {
        self.setStatus("stopped");
    }
    self.setStatus = function(newStatus) {
        self.status = newStatus;
        $(".status-display").text(newStatus);
    }
    self.processKey = function(event) {
        console.log(event);
        if ( event.which == 39 ) { // right arrow
            self.startRecording();
        } else if ( event.which == 37 ) { // left arrow
            self.stopRecording();
        } 
    }
    self.processClick = function(event) {
        if(self.status === "stopped") {

        } else {
            self.recordPart(event);
            self.currentPartIndex++;
            // run out of words then stop
            if(self.currentPartIndex >= self.textForOutput.length) {
                self.stopRecording();
            }
        }
    }
    self.clearOutput = function() {
        $("#output").html("");
    }
    self.recordPart = function(event) {
        var timeNow = new Date();
        var diffTime = Math.abs(timeNow - self.startTime);
        var posX = $('#output').position().left;
        var posY = $('#output').position().top;
        var position = { x : event.pageX - posX, y : event.pageY - posY - 10};
        var part = {
            delay : diffTime,
            output : self.textForOutput[self.currentPartIndex],
            position : position
        }
        self.parts.push(part);
        self.outputPart(part);
    }
    self.outputPart = function(part) {
        $('#output').append("<div id='part-output"+self.currentPartIndex+"' class='part-output' style='top: "+part.position.y+"px; left: "+part.position.x+"px'>"+part.output+"</div>");
    }

    // initialize
    self.stopRecording();

    $( "body" ).keydown(function(event ) {
        self.processKey(event);
    });
    $("#output").on("click", function(event) {
        self.processClick(event);
    });
}




