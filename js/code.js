// document.getElementById('myForm').addEventListener('submit', function(e) {
//     e.preventDefault(); 
//     var content = document.getElementById('myTextarea').value;
//     console.log("This is the content of the textarea:", content);
    
//     // Send the content to a server-side script to save it to a file
//     fetch('/code/test.go', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({content: content})
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         document.getElementById('resultTextarea').value = content;
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
// });

document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault(); 
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

        // Fetch the output data
        fetch('/code/test.go', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({content: content})
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