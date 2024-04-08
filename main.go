package main

import (
	"html/template"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.LoadHTMLFiles("html/index.html") // load the HTML file

	r.GET("/", func(c *gin.Context) {
		content, err := os.ReadFile("html/body.html") // read the body content from a file
		if err != nil {
			log.Fatal(err)
		}

		c.HTML(200, "index.html", gin.H{
			"Title": "Welcome to OnlineDev!",
			"Body":  template.HTML(content), // convert the content to HTML
		}) // render the HTML file with data
	})

	r.Run("localhost:2000") // listen and serve on localhost:2000
}
