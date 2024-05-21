document.getElementById('sizeSelect').addEventListener('change', function() {
    var textarea = document.getElementById('myTextarea');
    var resultTextarea = document.getElementById('resultTextarea');
    var outTextarea = document.getElementById('output');
    var textareaContainer = document.getElementById('textareaContainer');
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


    var globalVar = document.getElementById("globalVar").textContent;
    globalVar = globalVar.replace('PersonalGlobalKey: ', '');

    var input = document.getElementById('percentage');
    input.style.backgroundColor = 'white';
    input.style.color = 'black';

    console.log('Selected GlobalVar: ' + globalVar);

    var output = document.getElementById('output');
    output.style.color = 'black';
}