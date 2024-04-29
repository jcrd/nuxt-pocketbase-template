<script setup>
definePageMeta({
    layout: 'auth'
})

async function handler({ email, password }, node) {
    const { $toast } = useNuxtApp()

    const { errors } = await $fetch('/api/signup', {
        method: 'post',
        body: { email, password }
    })

    if (errors) {
        node.setErrors(null, errors)
        return
    }

    $toast.success("Verification email sent")
}
</script>

<template>
    <AuthForm
        submitLabel="Signup"
        @submit="handler"
    />
    <a
        href="/login"
        class="link text-sm"
    >Already have an account? Log in</a>
</template>
