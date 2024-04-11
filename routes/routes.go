package routes

import (
	"html/template"
	"log"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

func SetupRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		content, err := os.ReadFile("html/body.html") // read the body content from a file
		if err != nil {
			log.Fatal(err)
		}

		c.HTML(200, "index.html", gin.H{
			"Title": "Welcome to SkillsCoder!",
			"Body":  template.HTML(content), // convert the content to HTML
		}) // render the HTML file with data
	})

	r.Static("/js", "js")     // serve the js folder
	r.Static("/code", "code") // serve the code folder
	r.Static("/css", "css")   // serve the css folder
	r.Static("/img", "img")   // serve the images folder

	r.POST("/code/test.go", func(c *gin.Context) {
		var json struct {
			Content string `json:"content"`
		}

		if err := c.BindJSON(&json); err == nil {
			path := "./code/test.go"
			err := os.WriteFile(path, []byte(json.Content), 0644)
			if err != nil {
				log.Printf("Error writing file: %v", err)
				c.JSON(500, gin.H{"status": "unable to save file"})
				return
			}
			// Run the command after the file is saved
			cmd := exec.Command("go", "run", path)
			output, err := cmd.CombinedOutput()
			if err != nil {
				log.Printf("Error running command: %v", err)
				c.JSON(500, gin.H{"status": "unable to run command", "error": err.Error()})
				return
			}

			outputStr := string(output) // convert output to string
			c.JSON(200, gin.H{"status": "file saved and command run", "output": outputStr})
		} else {
			c.JSON(400, gin.H{"status": "unable to bind JSON"})
		}
	})
}
