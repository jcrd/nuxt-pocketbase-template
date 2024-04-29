<script setup>
definePageMeta({
    layout: 'auth',
    middleware: [
        'auth'
    ]
})

async function handler({ email, password }, node) {
    const { $pb } = useNuxtApp()
    try {
        await $pb.collection('users').authWithPassword(email, password)
        await navigateTo('/dashboard')
    } catch (error) {
        node.setErrors([error.data.message])
    }
}
</script>

<template>
    <AuthForm
        submitLabel="Log in"
        @submit="handler"
    />
    <a
        href="/signup"
        class="link text-sm"
    >Don't have an account? Sign up</a>
    <a
        href="/reset-password"
        class="link text-sm"
    >Forgot your password?</a>
</template>
