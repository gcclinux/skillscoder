package routes

import (
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

// SetupRoutes	sets up the routes for the application
func SetupRoutes(r *gin.Engine) {

	// Set the global variable
	r.Use(func(c *gin.Context) {
		c.Set("globalVar", "GlobalValueKeyNotSetYet")
		c.Next()
	})

	r.GET("/", func(c *gin.Context) {
		// Get the global variable
		globalVar := c.MustGet("globalVar").(string)

		c.HTML(200, "index.html", gin.H{
			"Title":     "SkillsCoder",
			"SubTitle":  "Welcome to SkillsCoder! (Concept - build 006)",
			"GlobalVar": globalVar, // use the global variable
		}) // render the HTML file with data
	})

	r.Static("/js", "js")       // serve the js folder
	r.Static("/css", "css")     // serve the css folder
	r.Static("/img", "img")     // serve the images folder
	r.Static("/repo", "repo")   // serve the repo folder
	r.Static("/rules", "rules") // serve the rules folder

	// Handle the POST request to save the code and run the command
	r.POST("/submit", func(c *gin.Context) {
		var json struct {
			Content  string `json:"content"`
			Dropdown string `json:"dropdown"` // Add this line
		}

		if err := c.BindJSON(&json); err == nil {

			outputStr := ""

			if json.Dropdown == "golang" {
				path := "./repo/test.go"
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
				outputStr = string(output) // convert output to string
			} else if json.Dropdown == "python" {
				path := "./repo/test.py"
				err := os.WriteFile(path, []byte(json.Content), 0644)
				if err != nil {
					log.Printf("Error writing file: %v", err)
					c.JSON(500, gin.H{"status": "unable to save file"})
					return
				}
				// Run the command after the file is saved
				cmd := exec.Command("python", path)
				output, err := cmd.CombinedOutput()
				if err != nil {
					log.Printf("Error running command: %v", err)
					c.JSON(500, gin.H{"status": "unable to run command", "error": err.Error()})
					return
				}
				outputStr = string(output) // convert output to string
			}

			c.JSON(200, gin.H{"status": "file saved and command run", "output": outputStr})
		} else {
			c.JSON(400, gin.H{"status": "unable to bind JSON"})
		}
	})

	r.POST("/personalGlobalKey", func(c *gin.Context) {
		var json struct {
			GlobalVar string `json:"globalVar"`
		}
		if err := c.ShouldBindJSON(&json); err == nil {
			//log.Println("New globalVar:", json.GlobalVar)
		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})
}
