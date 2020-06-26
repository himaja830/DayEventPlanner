$(document).ready(() => {

    displayEvents();

    //Date format have been set and displayed at the top of page.
    var now = moment().format("MM/DD/YYYY");
    var date = $("#currentDay");
    date.text(now);

    // Iterate through input elements and set the color based on event time
    var hour = moment().format("HH");
    var currentHour = Number.parseInt(hour);
    $(".event").each(function () {
        var eventHour = Number.parseInt(this.getAttribute('data-time'));
        if (eventHour === currentHour) {
            $(this).addClass('present');
        } else if (eventHour < currentHour) {
            $(this).addClass('past');
        } else {
            $(this).addClass('future');
        }
    });

    // Connecting input and save buttons to each other.
    $(".btn").on("click", function (event) {
        event.preventDefault();
        var hour = this.getAttribute('data-time');
        var data = $('#event'+hour).val();
        var index = $('#event'+hour).attr('data-index');
        setLocalStorage(index, data);
    });

    // get events from localstorage and set the data and push it to localstorage
    function setLocalStorage(index, data) {
        if (!getLocalStorage()) {
            localStorage.setItem("events", JSON.stringify([]));
        }
       var events = getLocalStorage();
       events[index] = data;
       localStorage.setItem("events", JSON.stringify(events));
    }

    // get the events from localstorage
    function getLocalStorage(){
      var events = localStorage.getItem('events');
      return JSON.parse(events);
    }
    
    //get events from locl storage and setting then to display on input fields
    function displayEvents(){
        var  events = getLocalStorage();
        for(var index in events){
            var i = Number.parseInt(index) + 9;
            $("#event" + i).val(events[index]);
        }
    }
});