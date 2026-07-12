<script lang="ts">
	import * as QRCode from 'qrcode';
	import type { PageProps } from './$types';
	import { resolve } from '$app/paths';

	let { data }: PageProps = $props();

	let qrCanvas: HTMLCanvasElement;

	$effect(() => {
		if (data.completionId && qrCanvas) {
			QRCode.toCanvas(
				qrCanvas,
				`https://${URL.parse(document.URL)?.host}${resolve('/friends/(friendonly)/validate/[completion]', { completion: data.completionId })}`,
				{},
				(error) => {
					if (error) alert(`Errored while creating QR code: ${error?.toString() || 'unknown error'}`);
				}
			);
		}
	});
</script>

<svelte:head>
    <title>find your next moon...</title> 
</svelte:head>

{#if data.nextHint}
<h1>your next hint, {data.session.username}...</h1>
<p>{data.nextHint}</p>
{:else}
<h1>congrats, {data.session.username}!</h1>
<p>go find the friends of the moon and show them this QR to claim your stamp!</p>

<canvas bind:this={qrCanvas}></canvas>
{/if}
