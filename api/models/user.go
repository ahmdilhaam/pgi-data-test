package models

// User model
type User struct {
	ID        uint8   `json:"id"`
	Name      string  `json:"name"`
	Email     string  `json:"email"`
	Password  string  `json:"password"`
	Role      string  `json:"role"`
	CreatedAt string  `json:"created_at"`
	UpdatedAt *string `json:"updated_at"`
}
