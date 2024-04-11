package main

import (
	"fmt"
	"ricardow/routes"

	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()

	r.LoadHTMLFiles("html/index.html") // load the HTML file

	routes.SetupRoutes(r)

	address := "0.0.0.0:8000"
	fmt.Printf("\nServer is running at http://%s\n\n", "localhost:8000")
	r.Run(address)
}
