$(document).ready(function() {

var topics = [
    "Modest Mouse", 
    "Death Cab for Cutie",
    "Queens of the Stone Age", 
    "The White Stripes", 
    "Alkaline Trio",
    "Blink-182",
    "The Smashing Pumpkins",
    "Chevelle",
    "The Mighty Mighty Bosstones",
    "Harvey Danger",
    "311",
    "Audioslave",
    "Rage Against the Machine",
    "Nine Inch Nails",
    "Beck",
    "The Offspring",
    "The Jurassic 5",
    "A Tribe Called Quest",
    "The Pharcyde",
    "Nas",
    "Lupe Fiasco",
    "Atmosphere",
    "Led Zeppelin",
    "Creedence Clearwater Revival",
    "Jimmy Hendrix",
    "The Grateful Dead",
    "Lou Reed",
    "The Temptations",
    "The Supremes",
    "Roy Orbison",
    ];

// create input form where user will type their topic and create a button for it
$("#content").append('<br><br><form><input type="text" placeholder="Band/Musician..." name="input"><button type="submit" id="userInput" style="border-radius:4px; background:white;"><i class="fa fa-search"></i>Create Button</button></form>');

// create div for buttons and append buttons for array 'topics'
$("#content").append("<div id='buttons'></div>");

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.attr("data-name", topics[i]);
    button.addClass("gifButton btn btn-dark");
    button.text(topics[i]);
    $("#buttons").append(button);
}  

// create div where gifs will show up
$("#content").append("<div id='gifs-go-here'></div>")



// button functionality for gif buttons
$("#content").on("click", ".gifButton", function() {

    // clear #gifs-go-here div
    $("#gifs-go-here").empty();
   
    var apiKey = "uH1A88RmqaHoHOXWGhBvp8HZ6k4529nS";
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        // store response data in array 'results'
        var results = response.data;
        console.log(results);
        // loop over each returned result, access the relevant info, add it to page
        for (var j = 0; j < results.length; j++) {
            // make a div for each gif
            var gifDiv = $("<div class='gif col-sm-12'>");
            // give gifDiv attributes for pause/play functionality
            gifDiv.attr("state", "still");
            gifDiv.attr("paused", results[j].images.fixed_height_still.url);
            gifDiv.attr("playing", results[j].images.fixed_height.url);
            // add a data attribute, rating, fixed_height_still image, and fixed_height_ to the div
            gifDiv.append("Rating: " + results[j].rating.toUpperCase() + "<br>");
            gifDiv.append("<img src='" + results[j].images.fixed_height_still.url + "'><br><br>");
            // append div to page
            $("#gifs-go-here").append(gifDiv);
        }
    })
})


// generate button from user input when user hits "create button" button
$("#content").on("click", "#userInput", function() {
    // make sure input field is not blank, do something if it isn't blank, do nothing if it is
    if ($("input").val() !== "") {
        // take user input and create a related button
        $("form").submit(function() {
            var input = $("input").val().trim();
            var newButton = $("<button>");
            newButton.attr("data-name", input);
            newButton.addClass("gifButton btn btn-dark");
            newButton.text(input);
            $("#buttons").append(newButton);
            
            event.preventDefault();
        })
    }
})

// pause/play functionality
$("#content").on("click", "div .gif", function() {
    // if clicked div has state="still", it is a paused gif so change state to "animated" and change the src of the img to unpaused version
    if ($(this).attr("state") == "still") {
        $(this).attr("state", "animated");
        $(this).children("img").attr("src", $(this).attr("playing"));
    // if clicked div has state="animated" (the only other possibilty), it is an animated gif so change state to "still" and change the src of the img to paused version
    } else {
        $(this).attr("state", "still");
        $(this).children("img").attr("src", $(this).attr("paused"));
    }
})

}) // end of docready