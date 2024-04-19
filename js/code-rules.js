function checkContent(content) {

// Store the original content length
var originalLength = content.length;

// ######### GOLANG BASIC RULES #########

// Match all lines of variable declarations of the same type RULE 0
var rule0 = /^(\s*)var (\w+) (int|string|float32|float64) = (\d+|".*")$/gm;
var match;
var lines = [];
var types = {};
while ((match = rule0.exec(content)) !== null) {
    var type = match[3];
    if (!types[type]) {
        types[type] = [];
    }
    types[type].push(match);
}

for (var type in types) {
    var lines = types[type];
    if (lines.length > 1) {
        var replacement = lines[0][1] + 'var ';
        var names = [];
        var values = [];
        for (var i = 0; i < lines.length; i++) {
            names.push(lines[i][2]);
            values.push(lines[i][4]);
        }
        replacement += names.join(', ') + ' ' + type + ' = ' + values.join(', ');

        var original = lines.map(function(line) {
            return line[0];
        }).join('\n');
        content = content.replace(original, replacement);
    }
}

// Go Regular expression to match the pattern string variable RULE 1
var rule1 = /^(\s*)var (\w+) string = "(.*)"$/gm;
// Replace the line with the new format
if (rule1.test(content)) {
    content = content.replace(rule1, '$1$2 := "$3"');
}

// Go Regular expression to match the pattern integer variable RULE 2
var rule2 = /^(\s*)var (\w+) int = (\d+)$/gm;
// Replace the line with the new format
if (rule2.test(content)) {
    content = content.replace(rule2, '$1$2 := $3');
}

// Go Regular expression to match the pattern float32|float64 variable RULE 3
var rule3 = /^(\s*)var (\w+) float(32|64) = ([\d\.]+)$/gm;
// Replace the line with the new format
if (rule3.test(content)) {
    content = content.replace(rule3, '$1$2 := $4');
}

// Go Regular expression to match the pattern for an expression with variables and operators RULE 4
var rule4 = /^(\s*)var (\w+) (int|float32|float64) = ((\w+ [\+\-\/\*] )+\w+)$/gm;
// Replace the line with the new format
if (rule4.test(content)) {
    content = content.replace(rule4, '$1$2 := $4');
}

// ######### PYTHON RULES IDEAS #########
// Check if the Python content is equal to the example code
var example3 = `message = "Hello, world!"
print(message)`;

var example4 = `text = "Hello, world!"
print(message)`;

var example5 = `msg = "Hello, world!"
print(message)`;

if (content.trim() === example3 || 
    content.trim() === example4 || 
    content.trim() === example5) {
    content = `print("Hello, world!")`;
}

// Calculate the difference in character count
// Calculate the difference in character count
var difference = originalLength - content.length;
var calculate = (difference / originalLength) * 100;
var percentage = calculate.toFixed(2);

return {content: content, original: originalLength, difference: difference, percentage: percentage};
}