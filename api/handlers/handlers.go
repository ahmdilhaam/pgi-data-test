package handlers

import (
	"boilerplate/database"
	"boilerplate/models"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/utils"
)

func UserList(c *fiber.Ctx) error {
	users := database.Get()

	return c.JSON(fiber.Map{
		"acknowledge": true,
		"result":      users,
	})
}

func SignIn(c *fiber.Ctx) error {
	p := new(models.User)
	if err := c.BodyParser(p); err != nil {
		return err
	}

	user := &models.User{
		Email:    utils.CopyString(p.Email),
		Password: utils.CopyString(p.Password),
	}

	ok, token, message := database.SignIn(user)

	return c.JSON(fiber.Map{
		"acknowledge": ok,
		"result":      token,
		"message":     message,
	})
}

func SignUp(c *fiber.Ctx) error {
	p := new(models.User)
	if err := c.BodyParser(p); err != nil {
		return err
	}

	user := &models.User{
		Name:     utils.CopyString(p.Name),
		Email:    utils.CopyString(p.Email),
		Password: utils.CopyString(p.Password),
	}

	ok, message := database.SignUp(user)

	return c.JSON(fiber.Map{
		"acknowledge": ok,
		"result":      nil,
		"message":     message,
	})
}

func UserCount(c *fiber.Ctx) error {
	ok, result, message := database.UserCount()

	return c.JSON(fiber.Map{
		"acknowledge": ok,
		"result":      result,
		"message":     message,
	})
}

// NotFound returns custom 404 page
func NotFound(c *fiber.Ctx) error {
	return c.Status(404).JSON(fiber.Map{
		"acknowledge": false,
		"result":      nil,
		"message":     nil,
	})
}
