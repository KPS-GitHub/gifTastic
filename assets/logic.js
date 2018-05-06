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

// create div for buttons and append buttons for array 'topics'
$("body").append("<div id='buttons'></div>");

for (var i = 0; i < topics.length; i++) {
    var button = $("<button>");
    button.attr("data-name", topics[i]);
    button.addClass("gifButton");
    button.text(topics[i]);
    $("#buttons").append(button);
}  


// create input form where user will type their topic and create a button for it
$("body").append('<br><br><form><input type="text" placeholder="Band/Musician..." name="input"><button type="submit" id="userInput"><i class="fa fa-search"></i>Create Button</button></form>');

// create div where gifs will show up
$("body").append("<div id='gifs-go-here'></div>")

// button functionality for gif buttons
$("body").on("click", ".gifButton", function() {
   
    var apiKey = "uH1A88RmqaHoHOXWGhBvp8HZ6k4529nS";
    var topic = $(this).attr("data-name");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";

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
            var gifDiv = $("<div>");
            // add a data attribute, rating, fixed_height_still image, and fixed_height_ to the div
            gifDiv.append("Rating: " + results[j].rating.toUpperCase());
            gifDiv.append("<img src='" + results[j].images.fixed_height_still.url + "'>");
            // append div to page
            $("#gifs-go-here").prepend(gifDiv);
        }
    })
})


// generate button from user input when user hits "create button" button
$("body").on("click", "#userInput", function() {
    // make sure input field is not blank, do something if it isn't blank, do nothing if it is
    if ($("input").val() !== "") {
        $("form").submit(function() {
            var input = $("input").val().trim();
            var newButton = $("<button>");
            newButton.attr("data-name", input);
            newButton.addClass("gifButton");
            newButton.text(input);
            $("#buttons").append(newButton);

            event.preventDefault();
        })
    }
})

// // ajax call
// var apiKey = "uH1A88RmqaHoHOXWGhBvp8HZ6k4529nS";
// var topic;
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=" + apiKey + "&limit=10";

// $.ajax({
//     url: queryURL,
//     method: "GET"
// }).then(function(response) {

// })

}) // end of docready