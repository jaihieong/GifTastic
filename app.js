// console.log("working");
var countryList = ["Albania", "Italy", "India", "Wales", "Nepal", "Korea", "Russia", "Morocco", "Spain", ];
// countryList = countryList.toUpperCase();
function makeUpperCase(arr){
    var newArr = [];
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].toUpperCase();
        newArr.push(arr[i]);
    }
    return newArr;
};
countryList = makeUpperCase(countryList);

function renderButton(){
    //this function will create buttons of countries listed in countryList array.
    $("#country-list").empty();
    for (var i = 0; i < countryList.length; i++) {
        var a = $("<button>");
        // Adding a class
        a.addClass("country-name");
        // Adding a data-attribute with a value of the movie at index i
        a.attr("data-name", countryList[i]);
        // Providing the button's text with a value of the movie at index i
        a.text(countryList[i]);
        // Adding the button to the HTML
        $("#country-list").append(a);
    }
};

function displayGiphy() {
    var country = $(this).attr("data-name");
    // Storing our giphy API URL for a random cat image
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + country + "&api_key=MKMFp7sVG3Zejezk3plJEM5ugJUR6G6r&limit=10";

    // Perfoming an AJAX GET request to our queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    // After the data from the AJAX request comes back
    .then(function(response) {
        // console.log(queryURL);
        // console.log(country);
        // console.log(response);
        // $("#giphies-here").empty();
        // var imageURL = response.data[0].images.fixed_height_still.url;
        // console.log(imageURL);
        $("#giphies-here").empty();
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var newDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var p = $("<p>").text("Rating: " + results[i].rating);

            // Creating and storing an image tag
            var giphyImage = $("<img>");
            // Setting the src attribute of the image to a property pulled off the result item
            giphyImage.attr("src", results[i].images.fixed_height_still.url);
            giphyImage.addClass("giphy");
            giphyImage.attr("data-state", "still");
            giphyImage.attr("data-number", i);
            // Instead

            // Appending the paragraph and image tag to the newDiv
            newDiv.append(p);
            newDiv.append(giphyImage);

            // Prependng the newDiv to the HTML page in the "#gifs-appear-here" div
            $("#giphies-here").prepend(newDiv);
        }

        $(".giphy").on("click", function() {
            // alert("clicked");
            var state = $(this).attr("data-state");
            var imageNumber = $(this).attr("data-number");
            
            var imageStill = response.data[imageNumber].images.fixed_height_still.url;
            var giphyAnimate = response.data[imageNumber].images.fixed_height.url;
            
            if (state === "still") {
                $(this).attr("src", giphyAnimate);
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", imageStill);
                $(this).attr("data-state", "still");
            }
        });
    });
};

$(document).on("click", ".country-name", displayGiphy);

renderButton();

$(".country-name").on("click", function(event) {
    event.preventDefault();
    var countrySelected = $(this).attr("data-name");
    $("#selected-country").text(countrySelected);
    $("#selected-country").css('color', 'red');
    console.log(countrySelected);
});

$("#add-country").on("click", function(event) {
    // Preventing the buttons default behavior when clicked (which is submitting a form)
    event.preventDefault();
    // This line grabs the input from the textbox
    var newCountry = $("#country-input").val().trim().toUpperCase();
    
    if (!countryList.includes(newCountry)){
        countryList.push(newCountry);
    } else {
        alert("Duplicate country name. Try a new country =)");
    }
    
    renderButton();
});