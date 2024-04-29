<script setup>
async function onClick() {
    const app = useNuxtApp()
    app.$pb.authStore.clear()
    await navigateTo('/login')
}
</script>

<template>
    <button
        class="btn"
        @click="onClick"
    >
        Log out
    </button>
</template>
