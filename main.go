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

	port := "8003"
	address := "0.0.0.0:" + port
	fmt.Printf("\nServer is running at http://%s\n\n", "localhost:"+port)
	r.Run(address)
}
