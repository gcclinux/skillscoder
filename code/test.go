package main
import "fmt"

func main() {
    var num1, num2, num3, num4 int = 51, 45, 28, 78
    var num5 int = (((num1 + num2) * num3) / num4)
    fmt.Println(num5)
}
