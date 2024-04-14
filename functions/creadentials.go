package functions

import "errors"

func GetUserFromDatabase(s string) (value string, err error) {

	user := "ricardo"
	pass := "password"

	if s == user && user != "" {
		value = pass
	} else {
		err = errors.New("user not found")
	}

	return value, err
}
