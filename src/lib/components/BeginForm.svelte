<script lang="ts">
	import { PhoneTonePlayer, type Dtmf } from "play-dtmf";
	import type { KeyboardEventHandler } from "svelte/elements";
	import type { ActionData } from "../../routes/begin/$types";

	let { form }: { form?: ActionData } = $props();

    const DTMF_MAP = [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,9];

    // this is deliberately referencing the initial state in case of error
    // svelte-ignore state_referenced_locally
    let phone: string = $state(form?.emfphone?.toString() || '');

    let player: PhoneTonePlayer | null = $state(null);

    const changePhone: KeyboardEventHandler<HTMLInputElement> = (e) => {
        const key = e.key;

        if (key.length > 1) return; // don't trap special keys or modifiers

        e.preventDefault();

        if (!phone) phone = '';

        if (key.match(/[A-Za-z]/)) {
            phone += DTMF_MAP[e.key.toUpperCase().charCodeAt(0) - 65].toString();
        } else if (key.match(/[0-9]/)) {
            phone += key;
        }

        if (player) player.playDtmf(phone.charAt(phone.length - 1) as Dtmf).stop(0.1);

        return true;
    };
</script>

<form method="POST" action="/begin">
    {#if form?.error}
        <div class="form-row">
            <p>emf phones must be 4-5 digit numbers; usernames can't contain <code>@:;,</code></p>
        </div>
    {/if}

    <div class="form-row">
        <label for="name">Username</label>
        <input type="text" name="username" value={form?.username} required pattern="[^@:;,]+" />
    </div>

    <div class="form-row">
        <label for="emfphone">EMF phone number</label>
        <input
            type="number"
            name="emfphone"
            onclick={() => player = new PhoneTonePlayer(new AudioContext())}
            onkeypress={changePhone}
            bind:value={phone}
            required
            min="1000"
            max="99999"
        />
    </div>

    <div class="form-row">
        <button type="submit">Get started</button>
    </div>
</form>

<style lang="scss">
    form {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    button {
        width: 50%;
        height: 3em;
    }
</style>