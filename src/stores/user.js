import { writable } from 'svelte/store'

const createUserStore = () => {
	const { subscribe, set } = writable(null)
	return {
		set,
		subscribe,
		signIn: user => set(user),
		signOut: () => set(null),
	}
}

export const user = createUserStore()
export const loadingAuth = writable(true)
export const dbUser = writable(null)