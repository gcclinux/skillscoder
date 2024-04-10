document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); // prevent the form from being submitted normally
    var content = document.getElementById('myTextarea').value;
    console.log("This is the content of the textarea:", content);
    
    // Send the content to a server-side script to save it to a file
    fetch('/code/test.go', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({content: content})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        document.getElementById('resultTextarea').value = content;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});