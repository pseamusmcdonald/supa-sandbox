import { supabase } from './supa'

export const loginWithEmail = (email, pass) => {
	return supabase.auth.signIn({
		email: email,
		password: pass,
	})
}

export const resetPassword = (email) => {
	return supabase.auth.resetPassword({
		email: email,
	})
}

export const signUp = (email, pass) => {
	return supabase.auth.signUp({
		email: email,
		password: pass,
	})
}

export const signOut = () => {
	return supabase.auth.signOut()
}