<script context="module">
	export async function load({ page, fetch, session, context }) {
		if (session !== null) {
			return {
				status: 302,
				redirect: "/",
			}
		} else {
			return {
				status: 200,
			}
		}
	}
</script>

<slot></slot>