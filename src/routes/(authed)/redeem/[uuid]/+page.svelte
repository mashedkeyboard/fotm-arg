<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>you found a tag!</title> 
</svelte:head>

<h1>{data.tagTitle}</h1>
<h4>(by {data.author.name}{#if data.author.phone} on DECT {data.author.phone}{/if})</h4>
<p>You found a moontag! There's more hidden around site...</p>
<p>Claim them all for a stamp!</p>
<a href={resolve("/help")}>give me my next hint</a>