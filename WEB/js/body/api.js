const json_location = `../../languages/code.json`;

const data = load_JSON(json_location);

/**********************
****    STATICS    ****
**********************/

// MAIN
const statics = document.getElementById("statics");

// TYPES
const statics_request = statics.querySelector(".request");
const statics_response = statics.querySelector(".response");

// FORMS
const statics_request_selector = statics_request.querySelector(".selector ul");
const statics_response_selector = statics_response.querySelector(".selector ul");

/**********************
****    QUERY      ****
**********************/

// MAIN
const query = document.getElementById("query");

// TYPES
const query_request = query.querySelector(".request");
const query_response = query.querySelector(".response");

// FORMS
const query_request_selector = query_request.querySelector(".selector ul");
const query_response_selector = query_response.querySelector(".selector ul");

/**********************
****    UTILS     *****
**********************/

// Fills with the selected language the code block
function fill_code(item, code, language) {
    let code_block = item.querySelector("#code"); // Get code block

    code_block.textContent = "\n" + code; // Fill with code
    if (language != "json"){
        code_block.setAttribute("class", language); // Set language
    }
}

// Gets the currently selected language
function get_selected(item, selector) {
    let name = selector.split("-")[0]; // Get name of selector
    let type = selector.split("-")[1]; // Get type of selector

    // Get selected language
    let language = item.querySelector(".highlight").getAttribute("id");
    // Get code from data dictionary
    let code = data[name][type][language].join('\n')

    fill_code(item, code, language); // Fill with the extracted code
}

// Changes the selected langauge
function change_selected(item, target) {
    // Remove highlight from old selection
    item.querySelector(".highlight").classList.remove("highlight");
    // Add highlight to new selection
    target.classList.add("highlight");
}

/**********************
****    FORMS      ****
**********************/

// Checks if statics request has been changed
statics_request_selector.addEventListener("click", (event) => {
    let selector = "statics-request";
    let item = statics_request;

    change_selected(item, event.target);
    get_selected(item, selector);
});

// Checks if statics response has been changed
statics_response_selector.addEventListener("click", (event) => {
    let selector = "statics-response";
    let item = statics_response;

    change_selected(item, event.target);
    get_selected(item, selector);
});

// Checks if query request has been changed
query_request_selector.addEventListener("click", (event) => {
    let selector = "query-request";
    let item = query_request;

    change_selected(item, event.target);
    get_selected(item, selector);
});

// Checks if query response has been changed
query_response_selector.addEventListener("click", (event) => {
    let selector = "query-response";
    let item = query_response;

    change_selected(item, event.target);
    get_selected(item, selector);
});

get_selected(statics_request, "statics-request");
get_selected(statics_response, "statics-response");
get_selected(query_request, "query-request");
get_selected(query_response, "query-response");
