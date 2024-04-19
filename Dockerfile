# Use golang:latest as the base image
FROM golang:latest

# Install net-tools for netstat command
RUN apt-get update && apt-get install -y net-tools
RUN ln -s /usr/bin/python3 /usr/bin/python

# Set the working directory in the container
WORKDIR /app

# Set the app name and version
LABEL app.name="SkillsCoder" app.version="003"

# Copy the local package files to the container's workspace.
ADD README.md /app/README.md
ADD go.mod /app/go.mod
ADD go.sum /app/go.sum
ADD code/ /app/code
ADD css/ /app/css
ADD html/ /app/html
ADD js/ /app/js
ADD img/ /app/img
ADD routes/ /app/routes
ADD main.go /app/main.go

# Expose port 8000
EXPOSE 8000

# Build the Go app
RUN go build -o skills .

# Run the Go app
CMD ["./skills"]