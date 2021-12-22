<script>
	import { loginWithEmail } from '$lib/auth'
	import { user, loadingAuth } from '../../stores/user'

	let email = '',
		password = ''

	let loading = false

	let error = null

	const displayError = (e) => {
		error = e
		setTimeout(() => {
			error = null
		}, 5000)
	}

	const handleUserAuth = async (e) => {
		loading = true
		await loginWithEmail(email, password)
			.catch((error) => {
				if (error.message === "Firebase: Error (auth/user-not-found).") displayError("User information not found, please try again.")
				else displayError("Authentication failed, please refresh the page and try again.")
			})
			.finally(() => {
				e.target.reset()
				loading = false
			})
	}
</script>

{#if !$user}
	<div class="min-h-screen flex flex-col items-center justify-center">
		<form on:submit|preventDefault={ handleUserAuth } class=" bg-white flex flex-col items-center justify-center gap-4 py-12 px-28 rounded-xl shadow-md w-max">
			<h2 class="text-center text-lg font-bold">Login to your account</h2>
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
			</div>
			<div class="flex flex-col gap-2 items-center">
				<button type="submit" class="bg-sky-700 hover:bg-sky-600 text-white font-bold py-2 px-9 rounded w-max">Login</button>
				<a href="/auth/reset" class="font-semibold text-center">Forgot password?</a>
			</div>
			<div>Don't have an account? <span><a href="/sign-up" class="font-semibold">Sign Up!</a></span></div>
		</form>
	</div>
{/if}

{#if error}
	<div class="errorWrapper">
		<p>{error}</p>
	</div>
{/if}