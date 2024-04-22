function updateValue() {
    var dropdown = document.getElementById('myDropdown');
    var currentValue = dropdown.value;
    // Create a new event with the new value as detail
    var event = new CustomEvent('valueUpdated', { detail: currentValue });
    // Dispatch the event
    window.dispatchEvent(event);
    // Call the function in js/example.js with the new value
    SelectedLanguage(currentValue);
}

window.onload = function() {
    var dropdown = document.getElementById('myDropdown');
    dropdown.onchange = function() {
        SelectedLanguage(this.value);
    };
    SelectedLanguage(dropdown.value);
    // Listen for the valueUpdated event
    window.addEventListener('valueUpdated', function(event) {
        // The new value is in event.detail
        console.log('New value:', event.detail);
    });
}

function SelectedLanguage(currentValue) {
    document.getElementById('resultTextarea').value = '';
    document.getElementById('output').value = '';
    document.getElementById('original').value = '';
    document.getElementById('reduction').value = '';
    document.getElementById('percentage').value = '';

    var input = document.getElementById('percentage');
    input.style.backgroundColor = 'white';
    input.style.color = 'black';

    var output = document.getElementById('output');
    output.style.color = 'black';

    if (currentValue === 'golang') {
        document.getElementById('myTextarea').value = `package main
import "fmt"

func main() {
    hello := "hello world"
    fmt.Println(hello)
}`;
    } else if (currentValue === 'python') {
        document.getElementById('myTextarea').value = `text = "Hello, world!"
print(text)`;
    }
}