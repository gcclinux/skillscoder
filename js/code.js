
// Add an event listener to the form to prevent the default form submission
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    var content = document.getElementById('myTextarea').value;
    var dropdown = document.getElementById('myDropdown').value;
    console.log("This is the content of the textarea:", content);
    console.log("This is the value of the dropdown:", dropdown);
    
    // Check and replace the content if necessary
    content = checkContent(content);

    // Send the content and dropdown value to a server-side script to save it to a file
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content, dropdown: dropdown}) // Include dropdown value
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('resultTextarea').value = content;

        // Fetch the output data
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: content, dropdown: dropdown}) // Include dropdown value
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').value = data.output;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

// Set the default content of the textarea
window.onload = function() {
    document.getElementById('myTextarea').value = `package main
import "fmt"

func main() {
    hello := "hello world"
    fmt.Println(hello)
}`;
};