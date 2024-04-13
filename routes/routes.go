package routes

import (
	"html/template"
	"log"
	"os"
	"os/exec"
	"ricardow/functions"

	"github.com/gin-gonic/gin"
)

// SetupRoutes	sets up the routes for the application
func SetupRoutes(r *gin.Engine) {
	r.GET("/", func(c *gin.Context) {
		content, err := os.ReadFile("html/body.html") // read the body content from a file
		if err != nil {
			log.Fatal(err)
		}

		c.HTML(200, "index.html", gin.H{
			"Title": "Welcome to SkillsCoder! (Concept)",
			"Body":  template.HTML(content), // convert the content to HTML
		}) // render the HTML file with data
	})

	r.Static("/js", "js")     // serve the js folder
	r.Static("/code", "code") // serve the code folder
	r.Static("/css", "css")   // serve the css folder
	r.Static("/img", "img")   // serve the images folder

	// Handle the POST request with username & password to login
	r.POST("/login", func(c *gin.Context) {
		var json struct {
			Username string `json:"username"`
			Password string `json:"password"`
		}

		if err := c.BindJSON(&json); err == nil {
			// Look up the user in the database
			user, err := functions.GetUserFromDatabase(json.Username)
			if err != nil {
				c.JSON(500, gin.H{"status": "error", "message": "Failed to get user"})
				return
			}

			// Check the password
			if user == "" {
				c.JSON(401, gin.H{"status": "error", "message": "User not found"})
			} else if user.Password != json.Password {
				c.JSON(401, gin.H{"status": "error", "message": "Incorrect password"})
			} else {
				c.JSON(200, gin.H{"status": "success", "message": "Logged in successfully"})
			}
		} else {
			c.JSON(400, gin.H{"status": "unable to bind JSON"})
		}
	})

	// Handle the POST request to save the code and run the command
	r.POST("/submit", func(c *gin.Context) {
		var json struct {
			Content  string `json:"content"`
			Dropdown string `json:"dropdown"` // Add this line
		}

		if err := c.BindJSON(&json); err == nil {

			outputStr := ""

			if json.Dropdown == "golang" {
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
				outputStr = string(output) // convert output to string
			} else if json.Dropdown == "python" {
				path := "./code/test.py"
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
}
