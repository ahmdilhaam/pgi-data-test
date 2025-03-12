package main

import (
	"boilerplate/database"
	"boilerplate/handlers"
	"boilerplate/middlewares"

	"flag"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/gofiber/fiber/v2/middleware/recover"
)

var (
	port = flag.String("port", ":3001", "Port to listen on")
	prod = flag.Bool("prod", false, "Enable prefork in Production")
)

func main() {
	// Parse command-line flags
	flag.Parse()

	// Connected with database
	database.Connect()

	// Create fiber app
	app := fiber.New(fiber.Config{
		Prefork: *prod, // go run app.go -prod
	})

	// Middleware
	app.Use(recover.New())
	app.Use(logger.New())
	app.Use(cors.New())

	// Create a /v1 endpoint
	v1 := app.Group("/v1")

	// Bind handlers
	v1.Post("/sign-in", handlers.SignIn)
	v1.Post("/sign-up", handlers.SignUp)

	// JWT Middleware
	app.Use(middlewares.WithAuth)
	v1.Get("/users", handlers.UserList)
	v1.Get("/user-count", handlers.UserCount)

	// Setup static files
	app.Static("/", "./static/public")

	// Handle not founds
	app.Use(handlers.NotFound)

	// Listen on port 3000
	log.Fatal(app.Listen(*port)) // go run app.go -port=:3000
}
