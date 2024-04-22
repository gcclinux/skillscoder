window.addEventListener('valueUpdated', function(event) {
    // The new value is in event.detail
    var currentValue = event.detail;
    SelectedLanguage(currentValue);
    document.getElementById('myDropdown').value = currentValue;
});

// Add an event listener to the form to prevent the default form submission
document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
    var content = document.getElementById('myTextarea').value;
    var dropdown = document.getElementById('myDropdown').value;
    
    // Check and replace the content if necessary
    if (dropdown === 'golang') {
        var result = goContent(content);
    } else if (dropdown === 'python') {
        var result = pythonContent(content);
    }
    
    content = result.content;

    // Send the content and dropdown value to a server-side script to save it to a file
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content, dropdown: dropdown, original: result.originalLength, difference: result.difference, percentage: result.percentage})
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
        body: JSON.stringify({content: content, dropdown: dropdown, original: result.originalLength, difference: result.difference, percentage: result.percentage})
    })
    .then(response => response.json())
    .then(data => {
        if (!content.startsWith('package') && dropdown == 'golang') {
            document.getElementById('output').value = 'Your code should always start with package name. Example: \n\npackage main';
            output.style.color = 'red';
        } else if (content.includes('fmt.') && !content.includes('import "fmt"') && dropdown == 'golang') {
            document.getElementById('output').value = 'Your code is missing [import "fmt"] after package name, Example: \n\npackage main \nimport "fmt"';
            output.style.color = 'red';
        } else if (!data.output) {
            document.getElementById('output').value = 'Incorrect syntax detected. Please check your code & language then try again.';
            output.style.color = 'red';
        } else {
            document.getElementById('output').value = data.output;
            output.style.color = 'black';
        }
    })

    // Fetch the originalLength data
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content, dropdown: dropdown, original: result.originalLength, difference: result.difference, percentage: result.percentage})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Character count reduced by: ", result.original + " bytes");
        document.getElementById('original').value = result.original + " bytes";
    })

    // Fetch the difference data
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content, dropdown: dropdown, original: result.originalLength, difference: result.difference, percentage: result.percentage})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Character count reduced by: ", result.difference + " bytes");
        document.getElementById('reduction').value = result.difference + " bytes";
    })

    // Fetch the percentage data
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content, dropdown: dropdown, original: result.originalLength, difference: result.difference, percentage: result.percentage})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log("Character count reduced by: ", result.percentage + "%");
        document.getElementById('percentage').value = result.percentage + "%";

        // Get the input element
        var input = document.getElementById('percentage');

        // Check if the value is more than 0
        if (parseFloat(input.value) > 0) {
            // If it is, set the background color to green
            input.style.backgroundColor = 'green';
            input.style.color = 'white';
        }
    })
        
    .catch((error) => {
        console.error('Error:', error);
    });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});