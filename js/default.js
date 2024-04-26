document.getElementById('sizeSelect').addEventListener('change', function() {
    var textarea = document.getElementById('myTextarea');
    var resultTextarea = document.getElementById('resultTextarea');
    var outTextarea = document.getElementById('output');
    var textareaContainer = document.getElementById('textareaContainer');
    var inputarea = document.getElementById('inputarea');
    switch (this.value) {
        case 'hori':
            textarea.style.width = '99.3%';
            textarea.style.height = '300px';
            resultTextarea.style.width = '99.3%';
            resultTextarea.style.height = '300px';
            outTextarea.style.width = '90.45%';
            outTextarea.style.marginLeft = '0.4%';
            outTextarea.style.height = '200px';
            textareaContainer.style.flexDirection = 'column';
            break;
        case 'vert':
            textarea.style.marginLeft = '-0.1%';
            textarea.style.width = '50%';
            resultTextarea.style.width = '50%';
            textarea.style.height = '750px';
            resultTextarea.style.height = '750px';
            outTextarea.style.width = '90.2%';
            outTextarea.style.marginLeft = '-0.1%';
            outTextarea.style.height = '200px';
            textareaContainer.style.flexDirection = 'row';
            inputarea.style.width = '30%';
            break;
        case 'default':
            location.reload();
            break;
    }
    // Force a reflow by accessing offsetHeight
    textareaContainer.offsetHeight;
});

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