function goContent(content) {

// Store the original content length
var originalLength = content.length;

// ######### GOLANG BASIC RULES #########
// Match all lines of variable declarations of the same type if they are in the same block {} - RULE 0

// Split the content into blocks
var blocks = content.split(/(?<=\})/gm);

for (var b = 0; b < blocks.length; b++) {
    var block = blocks[b];
    var rule0 = /^(\s*)var (\w+) (int|string|float32|float64) = (\d+|".*")$/gm;
    var match;
    var lines = [];
    var types = {};
    while ((match = rule0.exec(block)) !== null) {
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
            block = block.replace(original, replacement);
        }
    }

    // Replace the original block with the modified block
    blocks[b] = block;
}

// Join the blocks back together for RULE 0
content = blocks.join('');

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

// Calculate the difference in character count
var difference = originalLength - content.length;
var calculate = (difference / originalLength) * 100;
var percentage = calculate.toFixed(2);

return {content: content, original: originalLength, difference: difference, percentage: percentage};
}