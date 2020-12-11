
$("#searchbtn").on("click", function () {
    let city = $("#searchbox").val()
    searchWeather(city)
});

// Here we run our AJAX call to the OpenWeatherMap API
function searchWeather(city) {
    let ApiKey = "05aafbc48261dc001ef1d83cf18fb2a3";
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${ApiKey}`;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        let icon = response.weather[0].icon
        let displayDate = $("#currentDay")

        let time = moment()
        time = time.format("MM/DD/YYYY")
        displayDate.text(time)

        $(".city").html(`<h1>${response.name}</h1>`);
        $(".temp").text(`Temperature: ${response.main.temp} F`)
        $(".humidity").text(`Humidity: ${response.main.humidity} %`);
        $(".wind").text(`Wind Speed: ${response.wind.speed} MPH`);
        $(".weather-icon").attr("src", `http://openweathermap.org/img/w/${icon}.png`)

        var lat = response.coord.lat
        var lon = response.coord.lon
        console.log(lat, lon)




        // });

        let queryURLUvindex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${ApiKey}`;


        $.ajax({
            url: queryURLUvindex,
            method: "GET"
        }).then(function (response) {
            console.log(response)
            $(".uv-index").text(`UV Index: ${response.value}`)
        })

        // document.getElementById("city").onclick = function () {
        //     document.getElementById("outputCity").innerHTML = city;
        // }

        $("#searchhistory input-group-append").val(localStorage.getItem(city))
        console.log(city)

    });

    // let queryURL5day`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Apikey}`;

}