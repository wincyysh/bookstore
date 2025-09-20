/**
 * @fileoverview Handle users book search requirement and turn string into machine reable query parameter
 * @author Yingshi Huang <wincyysh@gmail.com>
 * @version 1.0.0
 * @license MIT
 */

//write functions for searching books
//searchBooks()
//getBookByContent()
//transformBookData()
//handleAPIerror()
//handleInput()

/**
 *
 * A brief, high-level description of what the function does.
 *  @name handleInput(searchInput)
 * @param {Type} paramName - A short explanation of the parameter's purpose.
 * @returns {Type} A description of the return value.
 */
function handleInput(searchInput){
    const inputWords = searchInput.value.trim().replace(/[\s\t]+/g, '+');
    try{
        if(!inputWords){
            throw new Error("Input Element with ID 'searchInput' not found");
        }
        if(inputWords ===""){
            console.error("Error: Search cannot be empty.");
            alert("Please enter a book to search for");
            return;
        }
    }catch(error){
        console.error("An error occurred: ", error.message);
    }
    console.log(`Searching for ${inputWords}`);
    return inputWords
}

/**
 *
 * A brief, high-level description of what the function does.
 *  @name handleInput(searchInput)
 * @param {Type} paramName - A short explanation of the parameter's purpose.
 * @returns {Type} A description of the return value.
 */
async function fetchDataAndUpdateHtml(getBook) {
    const container = document.getElementById('message-container');
    try{
        const response = await fetch(getBook);
        if(!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        container.innerHTML = `
            <h3> Title: ${data.title}<\h3>
            <p> Body: ${data.description} <\p>
        `;
    }catch(error){
        console.error('Fetch operation failed: ', error);
        container.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`
    }
}

function getBookByContent() {
    const searchInput = document.getElementById("searchInput");
    // const searchSubmit = document.getElementById("searchSubmit");
    const api = '';
    const basicUrl = 'https://www.googleapis.com/books/v1/volumes?q=';
    searchSubmit.addEventListener("submit", function(event){
        event.preventDefault();
        const list = handleInput(searchInput);
        const getBook = basicUrl+list+api;
        // Get the response data (as a JSON object)
        document.addEventListener('DOMContentLoaded', fetchDataAndUpdateHtml(getBook));
    });
}