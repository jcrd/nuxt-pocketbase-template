<script setup>
definePageMeta({
    middleware: [
        'auth'
    ]
})
</script>

<template>
    <div>
        <AuthLogoutButton />
    </div>
</template>
