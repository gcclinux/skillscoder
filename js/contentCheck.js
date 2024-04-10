function checkContent(content) {
    var type1 = `package main
import "fmt"

func main() {
    hello := "hello world"
    fmt.Println(hello)
}`;

    var type2 = `package main
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

    if (content.trim() === type1 || content.trim() === type2) {
        content = newContent;
    }

    return content;
}