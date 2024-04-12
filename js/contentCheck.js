function checkContent(content) {

// Check if the Go content is equal to the example code
var example1 = `package main
import "fmt"

func main() {
    hello := "hello world"
    fmt.Println(hello)
}`;

var example2 = `package main
import "fmt"

func main() {
    var hello string = "hello world"
    fmt.Println(hello)
}`;

var newContent = `package main
import "fmt"

func main() {
    fmt.Println("hello world")
}`;

if (content.trim() === example1 || content.trim() === example2) {
    content = newContent;
}

// Check if the Python content is equal to the example code

var example3 = `message = "Hello, world!"
print(message)`;

if (content.trim() === example3) {
    content = `print("Hello, world!")`;
}

return content;
}