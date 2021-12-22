<script>
	import { goto } from '$app/navigation'
	import { signUp } from '$lib/auth'
	import { user, loadingAuth } from '../../stores/user'

	$: if (!$loadingAuth && $user) {
		goto("/")
	}

	let email = '',
		password = '',
		passwordConfirm = ''

	let loading = false

	let error = null

	const displayError = (e) => {
		error = e
		setTimeout(() => {
			error = null
		}, 5000)
	}

	const handleUserSignUp = async (e) => {
		loading = true
		if (password === passwordConfirm) {
			const log = await signUp(email, password)
				.catch((err) => {
					displayError("Sign up failed, please refresh the page and try again.")
					console.log(err)
				})
				.finally(() => {
					e.target.reset()
					loading = false
				})
			console.log(log)
		}
		else displayError("Passwords don't match!")
	}
</script>

{#if !$user}
	<div class="min-h-screen flex flex-col items-center justify-center">
		<form on:submit|preventDefault={ handleUserSignUp } class="bg-white flex flex-col items-center justify-center gap-4 py-12 px-28 rounded-xl shadow-md w-max">
			<h2 class="text-center font-bold text-lg">Sign up for an account!</h2>
			<div class="flex flex-col gap-2">
				<input
					type="email"
					name="email"
					placeholder="Email"
					bind:value={email}
					class="bg-gray-200 rounded py-2 px-4"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					bind:value={password}
					class="bg-gray-200 rounded py-2 px-4"
					required
				/>
				<input
					type="password"
					name="passwordConfirm"
					placeholder="Password"
					bind:value={passwordConfirm}
					class="bg-gray-200 rounded py-2 px-4"
					required
				/>
			</div>
			<button type="submit" class="bg-sky-700 hover:bg-sky-600 py-2 px-9 text-white font-semibold rounded-md">Sign Up</button>
			<div>Already have an account? <span><a href="/auth/login" class="font-semibold">Login!</a></span></div>
		</form>
	</div>
{/if}

{#if error}
	<div class="errorWrapper">
		<p>{error}</p>
	</div>
{/if}