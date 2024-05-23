package routes

import (
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/gin-gonic/gin"
)

var GlobalVar string
var RetrieveCode string

// SetupRoutes	sets up the routes for the application
func SetupRoutes(r *gin.Engine) {
	presetCode := `package main
import "fmt"

func main() {
	var num1 int = 10
	var num2 int = 20
	var num3 int = 30
	var total int = (num1 + num2 - num3)

	fmt.Println("Total: ",total)
}`

	// Set the global variable
	r.Use(func(c *gin.Context) {
		c.Set("globalVar", "GlobalValueKeyNotSetYet")
		c.Set("retrieveCode", "RetrieveCodeNotSetYet")
		c.Next()
	})

	r.GET("/", func(c *gin.Context) {
		// Get the global variable
		globalVar := c.MustGet("globalVar").(string)
		retrieveCode := c.MustGet("retrieveCode").(string)

		if retrieveCode == "RetrieveCodeNotSetYet" {
			retrieveCode = presetCode
			RetrieveCode = retrieveCode
		}

		c.HTML(200, "index.html", gin.H{
			"Title":        "SkillsCoder",
			"SubTitle":     "Welcome to SkillsCoder! (Concept - build 006)",
			"GlobalVar":    globalVar,
			"RetrieveCode": retrieveCode,
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
			Dropdown string `json:"dropdown"`
		}

		if err := c.ShouldBindJSON(&json); err == nil {

			outputStr := ""
			personalKey := GlobalVar
			workDir := "./repo/" + personalKey

			if _, err := os.Stat(workDir); os.IsNotExist(err) {
				err := os.MkdirAll(workDir, 0755)
				if err != nil {
					log.Fatal(err)
				}
			}

			if json.Dropdown == "golang" {
				path := workDir + "/main.go"
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
				path := workDir + "/test.py"
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
			GlobalVar = json.GlobalVar
			workDir := "./repo/" + GlobalVar
			file := workDir + "/main.go"
			if _, err := os.Stat(file); err == nil {
				content, err := os.ReadFile(file)
				if err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
				RetrieveCode = string(content)
			} else {
				RetrieveCode = presetCode
			}

		} else {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		}
	})

	r.GET("/getRetrieveCode", func(c *gin.Context) {
		c.String(http.StatusOK, RetrieveCode)
	})
}
