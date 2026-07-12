<script lang="ts">
	import { resolve } from '$app/paths';
	import BeginForm from '$lib/components/BeginForm.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
    <title>moonhunt @ emf 2026</title> 
</svelte:head>

<h1>welcome to moonhunt</h1>
<p>hidden around the EMF site, you might find some little moons...</p>
<p>collect them all to earn your stamp!</p>

{#if data.isActive}
    <h2>ready to find another?</h2>
    <a href={resolve("/help")}>give me my next hint</a>
{:else}
    <h2>new here?</h2>
    <BeginForm />
{/if}