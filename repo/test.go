package main
import "fmt"

func main() {
    var num1, num2, num3, num4 int = 51, 45, 28, 78
    var num5 int = (((num1 + num2) * num3) / num4)
    fmt.Println("Result 1: ", num5)

    secondFunction()  
}

func secondFunction() {
    var num1, num2, num3, num4 int = 73, 16, 31, 98
    var num5 int = (((num1 + num2) * num3) / num4)
    fmt.Println("Result 2: ", num5)
}