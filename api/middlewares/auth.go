package middlewares

import (
	"boilerplate/utils"

	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/gofiber/fiber/v2"
)

func WithAuth(c *fiber.Ctx) error {
	tokenString := c.Get("Authorization")
	if tokenString == "" {
		return c.JSON(fiber.Map{
			"acknowledge": false,
			"data":        nil,
			"message":     "Token is Empty",
		})
	}
	if !strings.Contains(tokenString, "Bearer") {
		return c.JSON(fiber.Map{
			"acknowledge": false,
			"data":        nil,
			"message":     "Invalid Token",
		})
	}
	tokenString = tokenString[len("Bearer "):]

	err := utils.VerifyToken(tokenString)
	if err != nil {
		return c.JSON(fiber.Map{
			"acknowledge": false,
			"data":        nil,
			"message":     "Invalid Token",
		})
	}

	c.Next()
	return nil
}
