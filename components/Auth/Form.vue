<script setup>
const props = defineProps(["submitLabel", "excludePassword"])
const emit = defineEmits(["submit"])
</script>

<template>
    <FormKit
        type="form"
        @submit="(data, node) => { emit('submit', data, node) }"
        :submit-label="props.submitLabel"
    >
        <FormKit
            type="email"
            name="email"
            id="email"
            label="Email"
            validation="email"
            validation-visibility="live"
            placeholder="Enter your email"
        />
        <div v-if="!props.excludePassword">
            <FormKit
                type="password"
                name="password"
                label="Password"
                validation="required|length:8,72"
                placeholder="Enter your password"
            />
        </div>
    </FormKit>
</template>
