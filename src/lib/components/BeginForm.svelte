<script lang="ts">
	import { PhoneTonePlayer, type Dtmf } from "play-dtmf";
	import type { KeyboardEventHandler } from "svelte/elements";

    const DTMF_MAP = [2,2,2,3,3,3,4,4,4,5,5,5,6,6,6,7,7,7,7,8,8,8,9,9,9,9];
    let phone: string = $state('');
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
    <div class="form-row">
        <label for="name">Enter a username</label>
        <input type="text" name="username" />
    </div>

    <div class="form-row">
        <label for="emfphone">Enter your EMF phone number</label>
        <input
            type="number"
            name="emfphone"
            onclick={() => player = new PhoneTonePlayer(new AudioContext())}
            onkeypress={changePhone}
            bind:value={phone}
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