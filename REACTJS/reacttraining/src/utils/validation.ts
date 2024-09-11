export const validateForm = function(username: string, password: string) {
	const errors = {
		username: '',
		password: ''
	}

	if(!username) {
		errors.username = 'Username is required'
	}
	if(!password) {
		errors.password = 'Password is required'	
		return errors
	}

	if(password.length < 8) {
		errors.password = 'Password is at least 8 letters'		
	}

	return errors
}