<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>
<h1>your next hint, {data.session.username}...</h1>