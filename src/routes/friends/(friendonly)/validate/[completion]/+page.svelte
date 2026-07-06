<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>
{#if data.completion.alreadyClaimed}
<h1>This completion has already been claimed!</h1>
{/if}

<h1>{data.completion.username} (phone {data.completion.dect})</h1>
<p>Successfully completed moonhunt at {data.completion.completedAt}</p>
{#if !data.completion.alreadyClaimed}
<p>Eligible for stamping!</p>
{/if}