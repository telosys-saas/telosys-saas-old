import * as types from '../constants/ActionTypes'

export function refresh() {
	return {
		type: 'REFRESH',
	}
}

export function loginForm() {
	return {
		type: 'LOGIN_FORM',
	}
}

export function logout() {
	return {
		type: 'LOGOUT',
	}
}
