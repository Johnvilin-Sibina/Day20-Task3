//The name of a disney character is given by the user and that name is used to fetch data about the given character from 
//the Disney API

//Function to create section
function create_section(){
    let res =document.createElement("section")
    return res;
}
//This function is to create a h1 tag
function create_h1(tagname, attrname, attrvalue, content) {
    let res = document.createElement(tagname);
    res.setAttribute(attrname, attrvalue);
    res.innerHTML = content;
    return res;
}

//This function is to create a label
function create_label(tagname, attr1name, attr1value, attr2name, attr2value, content) {
    let res = document.createElement(tagname);
    res.setAttribute(attr1name, attr1value);
    res.setAttribute(attr2name, attr2value);
    res.innerHTML = content;
    return res;
}

//This function is to create a input field
function create_input(tagname, attr1name, attr1value, attr2name, attr2value, attr3name, attr3value, attr4name, attr4value) {
    let res = document.createElement(tagname);
    res.setAttribute(attr1name, attr1value);
    res.setAttribute(attr2name, attr2value);
    res.setAttribute(attr3name, attr3value);
    res.setAttribute(attr4name, attr4value);
    return res;
}


//This function is to create a button
function create_button(tagname, attr1name, attr1value, attr2name, attr2value, attr3name, attr3value, content) {
    let res = document.createElement(tagname);
    res.setAttribute(attr1name, attr1value);
    res.setAttribute(attr2name, attr2value);
    res.setAttribute(attr3name, attr3value);
    res.innerHTML = content;
    return res;
}

//This function is to create a break tag
function create_break() {
    let res = document.createElement("br");
    return res;
}

//This function is to create a div tag
function create_div(tagname, attrname, attrvalue) {
    let res = document.createElement(tagname);
    res.setAttribute(attrname, attrvalue);
    return res;
}

//This function is to create an anchor tag
function create_anchor(tagname, attr1name, attr1value, attr2name, attr2value, content) {
    var res = document.createElement(tagname);
    res.setAttribute(attr1name, attr1value);
    res.setAttribute(attr2name, attr2value);
    res.innerHTML = content;
    return res;
}

//This function is to create a div tag
function create_div_main(tagname, attrname, attrvalue, content) {
    var res = document.createElement(tagname);
    res.setAttribute(attrname, attrvalue);
    res.innerHTML = content;
    return res;
}

let section = create_section();
section.className = "section";

//The function create_h1 is called here and the values for the parameters are passed
var heading1 = create_h1("h1", "class", "head", "Disney Land")

//The function create_label is called here and the values for the parameters are passed
var label = create_label("label", "for", "search", "class", "main",
    `Character Name: <i>(Enter the name of the character you want to search in the below field</i>)`)

//The function create_break is called here twice and two break tags are created
var br1 = create_break();
var br2 = create_break();

//The function create_input is called here and the values for the parameters are passed
var input = create_input("input", "id", "search", "class", "main1", "type", "text", "placeholder", "Your favourite Disney character here")

//The function create_break is called here twice and two break tags are created
var br3 = create_break();
var br4 = create_break();

//The function create_button is called here and the values for the parameters are passed
var button = create_button("button", "type", "button", "onclick", "button_click()", "class", "browse", "Search");



//When the search button is clicked this function gets called and the input given by the user is retrived
//and the retrived data is passed to the api url and then the necessary data is fetched and displayed
async function button_click() {
    try {

        //The input given by the user is retrived and if there are any space it is replaced by "%20"
        var input_field = document.querySelector(".main1")
        var role = input_field.value.trim().replace(/\s/g, "%20");

        //Clears the input field after the button is clicked
        var refresh = document.querySelector(".main1").value = ""


        var prev_res1 = document.querySelector(".container");
        //Removes the previous search result of class container from the body if any
        if (prev_res1) {
            prev_res1.remove();
        }

        var two_res = document.querySelector(".two_data")
        //Removes the previous search result of class two_data from the body if any
        if (two_res) {
            two_res.remove();
        }

        var prev_res2 = document.querySelector(".no_data");
        //Removes the catch block statement from the body if any
        if (prev_res2) {
            prev_res2.remove();
        }

        var one_res = document.querySelector(".single");
        //Removes the previous search result of class single from the body if any
        if (one_res) {
            one_res.remove();
        }

        //If the input field is left empty and the search button is clicked this if conditions checks it and 
        //throws an error which enables the statement in the catch block to be displayed.
        if (role === "") {
            throw new Error();
        }

        var res = await fetch(`https://api.disneyapi.dev/character?name=${role}`);
        var final_res = await res.json();

        //In this Disney API if no data is found it will return an empty array so, I use this if conditon to 
        //check if the returned array is empty and if it is, it will throw an erray so that the statement in 
        //catch block is executed 
        if (final_res.data.length === 0) {
            throw new Error();
        }

        var detail = final_res.data


        //The function create div is called here thrice and three div tags are creted, each with differrent class name
        var container = create_div("div", "class", "container")
        var row = create_div("div", "class", "row")
        //If the  length of the array "detail" in which the data retrived from the API is stored is
        //more than 2 the staments inside this if condition will be executed. I have used separate coditions for the 
        //alignment purpose. I have given separate alignment for each condition
        if (detail.length > 2) {
            for (var i = 0; i < detail.length; i++) {
                var col = create_div("div", "class", "col-md-4")

                var movie = detail[i].films.length > 0 ? detail[i].films[0] : "No films";
                var tv = detail[i].tvShows.length > 0 ? detail[i].tvShows[0] : "No TV Shows";
                var play = detail[i].videoGames.length > 0 ? detail[i].videoGames[0] : "No Video Games";
                var source = detail[i].sourceUrl;

                var content = document.createElement("div");
                content.className = "content";
                content.innerHTML = `<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header"><b>${detail[i].name}</b></div>
  <img src= ${detail[i].imageUrl} class="card-img-top picture"></img>
  <div class="card-body text-success">
    <p class="card-text"><b>Film:</b> ${movie}</p>
    <p class="card-text"><b>TV Show:</b> ${tv}</p>
    <p class="card-text"><b>Video Game:</b> ${play}</p>
    <div class="link"><a href= ${source} target = "blank"class="btn btn-primary">More Details</a></div>
  </div>
</div>`
                col.append(content)
                row.append(col);
            }
            container.append(row);
            document.body.append(container);
        }
        //If the  length of the array "detail" in which the data retrived from the API is stored is
        //equal to 2 the staments inside this else if condition will be executed. I have used separate coditions for the 
        //alignment purpose. I have given separate alignment for each condition
        else if (detail.length == 2) {

            var prev_res1 = document.querySelector(".container");
            //Removes the previous search result of class container from the body if any
            if (prev_res1) {
                prev_res1.remove();
            }

            var two_res = document.querySelector(".two_data")
            //Removes the previous search result of class two_data from the body if any
            if (two_res) {
                two_res.remove();
            }
            var prev_res2 = document.querySelector(".no_data");
            //Removes the catch block statement from the body if any
            if (prev_res2) {
                prev_res2.remove();
            }

            var one_res = document.querySelector(".single");
            //Removes the previous search result of class single from the body if any
            if (one_res) {
                one_res.remove();
            }

            for (var j = 0; j < detail.length; j++) {

                var movie = detail[j].films.length > 0 ? detail[j].films[0] : "No films";
                var tv = detail[j].tvShows.length > 0 ? detail[j].tvShows[0] : "No TV Shows";
                var play = detail[j].videoGames.length > 0 ? detail[j].videoGames[0] : "No Video Games";
                var source = detail[j].sourceUrl;

                var content = document.createElement("div");
                content.className = "content two_data";
                content.innerHTML = `<div class="card border-success mb-3" style="max-width: 18rem;">
  <div class="card-header"><b>${detail[j].name}</b></div>
  <img src= ${detail[j].imageUrl} class="card-img-top picture"></img>
  <div class="card-body text-success">
    <p class="card-text"><b>Film:</b> ${movie}</p>
    <p class="card-text"><b>TV Show:</b> ${tv}</p>
    <p class="card-text"><b>Video Game:</b> ${play}</p>
    <div class="link"><a href= ${source} target = "blank"class="btn btn-primary">More Details</a></div>
  </div>
</div>`
                document.body.append(content);
            }

        }
        //If "detail" is retured as an object with data about only one character
        //the staments inside this else if condition will be executed. I have used separate coditions for the 
        //alignment purpose. I have given separate alignment for each condition
        else if (detail.name) {
            var one_res = document.querySelector(".single");
            //Removes the previous search result of class single from the body if any
            if (one_res) {
                one_res.remove();
            }

            var prev_res1 = document.querySelector(".container");
            //Removes the previous search result of class container from the body if any
            if (prev_res1) {
                prev_res1.remove();
            }

            var two_res = document.querySelector(".two_data")
            //Removes the previous search result of class two_data from the body if any
            if (two_res) {
                two_res.remove();
            }
            var prev_res2 = document.querySelector(".no_data");
            //Removes the catch block statement from the body if any
            if (prev_res2) {
                prev_res2.remove();
            }
            var movie = detail.films.length > 0 ? detail.films[0] : "No films";
            var tv = detail.tvShows.length > 0 ? detail.tvShows[0] : "No TV Shows";
            var play = detail.videoGames.length > 0 ? detail.videoGames[0] : "No Video Games";
            var source = detail.sourceUrl;

            var content = document.createElement("div");
            content.className = "content single";
            content.innerHTML = `<div class="card border-success mb-3" style="max-width: 18rem;">
            <div class="card-header"><b>${detail.name}</b></div>
            <img src= ${detail.imageUrl} class="card-img-top picture"></img>
            <div class="card-body text-success">
              <p class="card-text"><b>Film:</b> ${movie}</p>
              <p class="card-text"><b>TV Show:</b> ${tv}</p>
              <p class="card-text"><b>Video Game:</b> ${play}</p>
              <div class="link"><a href= ${source} target = "blank"class="btn btn-primary">More Details</a></div>
            </div>
          </div>`

            document.body.append(content);
        }
    }
    catch (error) {

        var prev_res2 = document.querySelector(".no_data");
        //Removes the catch block statement from the body if any
        if (prev_res2) {
            prev_res2.remove();
        }
        var one_res = document.querySelector(".single");
        //Removes the previous search result of class single from the body if any
        if (one_res) {
            one_res.remove();
        }

        var prev_res1 = document.querySelector(".container");
        //Removes the previous search result of class container from the body if any
        if (prev_res1) {
            prev_res1.remove();
        }

        var two_res = document.querySelector(".two_data")
        //Removes the previous search result of class two_data from the body if any
        if (two_res) {
            two_res.remove();
        }
        //The function create_div_main is called here and values for the parameters are passed to create a div tag
        let div = create_div_main("div", "class", "no_data", "Oops! Data Not Found....")
        document.body.append(div);
    }
}

section.append(heading1, label, br1, br2, input, br3, br4, button)
document.body.append(section)