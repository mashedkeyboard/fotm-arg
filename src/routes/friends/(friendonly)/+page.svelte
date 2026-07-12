<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>friend: authenticated</title> 
</svelte:head>

<h1>welcome, friend {data.friend!.name}</h1>
<h2>tap a tag to register it</h2>