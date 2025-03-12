package database

import (
	"boilerplate/models"
	"boilerplate/utils"
	"fmt"
	"sync"

	"database/sql"

	_ "github.com/go-sql-driver/mysql"
)

var (
	users []*models.User
	mu    sync.Mutex
)

// Connect with database
func Connect() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:@tcp(127.0.0.1:3306)/pgi_data_test")
	if err != nil {
		return nil, err
	}

	fmt.Println("Connected with Database")
	return db, nil
}

func Get() []models.User {
	db, err := Connect()
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	defer db.Close()

	rows, err := db.Query("select id, name, email, role, created_at, updated_at from users")
	if err != nil {
		fmt.Println(err.Error())
		return nil
	}
	defer rows.Close()

	var result []models.User
	for rows.Next() {
		var user = models.User{}
		var err = rows.Scan(&user.ID, &user.Name, &user.Email, &user.Role, &user.CreatedAt, &user.UpdatedAt)

		if err != nil {
			fmt.Println(err.Error())
			return nil
		}

		result = append(result, user)
	}

	return result
}

func SignIn(user *models.User) (bool, *string, string) {
	db, err := Connect()
	if err != nil {
		fmt.Println(err.Error())
		return false, nil, "error"
	}
	defer db.Close()

	var result = models.User{}
	err = db.
		QueryRow("select name, email, password, role from users where email = ?", &user.Email).
		Scan(&result.Name, &result.Email, &result.Password, &result.Role)

	if err != nil {
		fmt.Println(err.Error())
		return false, nil, "Email or password is invalid"
	}

	if !utils.CheckPasswordHash(user.Password, result.Password) {
		return false, nil, "Email or password is invalid"
	}

	token, err := utils.CreateToken(&result)
	if err != nil {
		fmt.Println(err.Error())
		return false, nil, "Email or password is invalid"

	}

	return true, &token, "Success"
}

func SignUp(user *models.User) (bool, string) {
	db, err := Connect()
	if err != nil {
		fmt.Println(err.Error())
		return false, "error"
	}
	defer db.Close()

	var password, error = utils.HashPassword(user.Password)
	if error != nil {
		fmt.Println(error.Error())
		return false, "Someting is wrong"
	}

	_, err = db.Exec("insert into users(name,email,password,role) values (?, ?, ?, ?)", &user.Name, &user.Email, password, 2)
	if err != nil {
		fmt.Println(err.Error())
		return false, "Someting is wrong"
	}

	return true, "Register is success"
}

func UserCount() (bool, int, string) {
	db, err := Connect()
	if err != nil {
		fmt.Println(err.Error())
		return false, 0, "failed"
	}
	defer db.Close()

	rows, err := db.Query("SELECT COUNT(*) FROM users")
	if err != nil {
		fmt.Println(err.Error())
		return false, 0, "failed"
	}
	defer rows.Close()

	var count int

	for rows.Next() {
		if err := rows.Scan(&count); err != nil {
			fmt.Println(err.Error())
			return false, 0, "failed"
		}
	}

	return true, count, "success"
}
