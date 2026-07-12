<script lang="ts">
	import type { PageProps } from './$types';

	let { data, form }: PageProps = $props();

    // svelte-ignore state_referenced_locally
    const isExistingTag = data.tag;

    const title = isExistingTag ? `edit tag ${data.tag!.title}` : 'register new tag';
</script>

{#if data.created}
<p>Successfully created tag!</p>
{/if}

<svelte:head>
    <title>{title}</title> 
</svelte:head>

<h1>{title}</h1>

{#if form?.error}
<p>Error creating tag - please check the values</p>
{/if}

<form method="POST">
    <div class="form-row">
        <label for="title">Tag name</label>
        <input type="text" name="title" value={form?.title || data.tag?.title} required />
    </div>

    <div class="form-row">
        <label for="hint">Tag hint</label>
        <input type="text" name="hint" value={form?.hint || data.tag?.hint} required />
    </div>

    <div class="form-row">
        <button type="submit">Save</button>
    </div>
</form>