<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import '/main-site/style.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	{@render children()}
</main>

<style lang="scss">
	:global(html, body) {
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	main {
		padding: 5em;
		box-shadow: 0 2em 1em var(--ourple);
		background: var(--ourple-gradient);
	}
</style>