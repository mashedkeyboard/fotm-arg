<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<h1>welcome, friend {data.friend!.name}</h1>
<h2>tap a tag to register it</h2>