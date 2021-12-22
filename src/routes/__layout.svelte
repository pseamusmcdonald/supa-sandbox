<script context="module">
	export async function load({ page, fetch, session, context }) {
		console.log(session)
		if (session === null && !page.path.includes("/auth/")) {
			return {
				status: 302,
				redirect: "/auth/login",
			}
		} else {
			return {
				status: 200,
			}
		}
	}
</script>

<script>
	import UserObserver from '../stores/observers/user-observer.svelte'
</script>

<UserObserver />

<slot></slot> 