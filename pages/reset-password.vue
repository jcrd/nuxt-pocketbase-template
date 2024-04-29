<script setup>
definePageMeta({
    layout: 'auth',
})

async function handler({ email }, node) {
    const { $pb, $toast } = useNuxtApp()
    try {
        await $pb.collection('users').requestPasswordReset(email)
        $toast.success('Check your email')
    } catch (error) {
        node.setErrors([error.data.message])
    }
}
</script>

<template>
    <AuthForm
        submitLabel="Send reset email"
        :excludePassword="true"
        @submit="handler"
    />
</template>
