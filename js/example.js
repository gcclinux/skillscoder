// Set the default content of the textarea
window.onload = function() {
    document.getElementById('myTextarea').value = `package main
import "fmt"

func main() {
    hello := "hello world"
    fmt.Println(hello)
}`;
};