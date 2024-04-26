function pythonContent(content) {

// ######### PYTHON RULES IDEAS #########

// Store the original content length
var originalLength = content.length;

//Example 1: Replace the print function with the new format - RULE 1
let lines = content.split('\n');
let newContent = '';
let nums = [];
for (let line of lines) {
    if (line.includes('=')) {
        let parts = line.split('=');
        let varName = parts[0].trim();
        let value = parts[1].trim();
        if (varName.startsWith('num')) {
            nums.push(value);
            if (nums.length === 4) {
                newContent += `num1, num2, num3, num4 = ${nums.join(', ')}\n`;
                nums = [];
            }
        } else {
            newContent += line + '\n';
        }
    } else {
        newContent += line + '\n';
    }
}
content = newContent;

// Example 2: Remove the requirement for variable and print it directly - RULE 0
var linez = content.split('\n');
for (var i = 0; i < linez.length; i++) {
    var line = linez[i];
    var match = line.match(/^(\w+) = "(.+)"$/);
    if (match) {
        var variable = match[1];
        var value = match[2];
        for (var j = i + 1; j < linez.length; j++) {
            linez[j] = linez[j].replace(new RegExp('\\b' + variable + '\\b', 'g'), '"' + value + '"');
        }
        linez.splice(i, 1);
        i--;
    }
}
content = linez.join('\n');

// Calculate the difference in character count
var difference = originalLength - content.length;
var calculate = (difference / originalLength) * 100;
var percentage = calculate.toFixed(2);

return {content: content, original: originalLength, difference: difference, percentage: percentage};
}