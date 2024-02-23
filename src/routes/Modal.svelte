<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
	class="backdrop:bg/40 min-w-64 max-w-lg rounded-sm"
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div on:click|stopPropagation class="p-4">
		<slot name="header" />
		<hr class="my-2" />
		<slot />
		<hr class="my-2" />
		<!-- svelte-ignore a11y-autofocus -->
		<div class="flex justify-end gap-2">
			<button autofocus on:click={() => dialog.close()} class="block">Close</button>
			<slot name="button" />
		</div>
	</div>
</dialog>
