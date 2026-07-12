<script lang="ts">
	import BeginForm from "$lib/components/BeginForm.svelte";
	import type { PageProps } from "./$types";

	let { form }: PageProps = $props();
</script>

<svelte:head>
    <title>begin your moonhunt</title> 
</svelte:head>

<BeginForm form={form} />