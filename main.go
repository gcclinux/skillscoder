package main

import (
	"html/template"
	"log"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {

	gin.SetMode(gin.ReleaseMode)
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

	r.Static("/js", "js")     // serve the js folder
	r.Static("/code", "code") // serve the js folder

	r.POST("/code/test.go", func(c *gin.Context) {
		var json struct {
			Content string `json:"content"`
		}

		if err := c.BindJSON(&json); err == nil {
			path := "./code/test.go"
			err := os.WriteFile(path, []byte(json.Content), 0644)
			if err != nil {
				c.JSON(500, gin.H{"status": "unable to save file"})
				return
			}
			c.JSON(200, gin.H{"status": "file saved"})
		} else {
			c.JSON(400, gin.H{"status": "unable to bind JSON"})
		}
	})

	r.Run("localhost:2000") // listen and serve on localhost:2000
}
