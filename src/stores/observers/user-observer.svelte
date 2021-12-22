<script>
	import { goto } from '$app/navigation'
	import { browser } from '$app/env'
	import { session } from '$app/stores'
	import { supabase } from '$lib/supa'
	import { user, loadingAuth, dbUser } from '../user'

	const setUser = async (sesh) => {
		user.signIn(sesh.user)
		// const userData = await db.get(sesh.user.id)
		$dbUser = {
			...sesh.user,
		//	...userData,
		}
		$session = sesh
		document.cookie = `session=${JSON.stringify(sesh)}; path=/; max-age=5400; secure;`
		$loadingAuth = false
	}

	if (browser  && $loadingAuth) {
		if ($session) {
			setUser(JSON.parse($session))
		} else {
			$loadingAuth = false
		}

	supabase.auth.onAuthStateChange(async (event, sesh) => {
		console.log('event,sesh',event, sesh)
		if (!$loadingAuth) $loadingAuth = false
		if (event == 'SIGNED_IN') {
			console.log('signed in')
			await setUser(sesh)
			goto('/')
		} else if (event == 'SIGNED_OUT') {
			console.log('signed out')
			dbUser.set(null)
			currentUser.signOut()
			$loadingAuth = false
			goto('/login')
		}
		$loadingAuth = false
	})

	}
</script>