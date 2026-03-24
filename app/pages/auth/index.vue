<script setup lang="ts">
import styleHome from "~/assets/css/base.css?url";
useHead({
  link: [{ rel: "stylesheet", href: styleHome }],
});
import * as z from "zod";
import * as bcrypt from "bcryptjs";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  email: z.email("Email Invalid"),
  password: z.string("Mot de passe exigee").min(8, "Au moins 8 caracteres"),
});

type Schema = z.output<typeof schema>;

const authForm = useTemplateRef("authForm");

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const data = await $fetch("/api/auth", {
      method: "POST",
      body: event.data,
    });
    const { fetch: refreshSession } = useUserSession();
    await refreshSession();
    toast.add({
      title: "Success",
      description: "Connexion Reussie",
      color: "success",
      icon: "i-lucide-calendar-days",
    });
    await navigateTo("/admin");
  } catch (error) {
    await toast.add({
      title: "Erreur",
      description: "Identifiants incorrect",
      color: "error",
      icon: "i-lucide-calendar-days",
    });
  }
}

const fields = ref([
  {
    name: "email",
    type: "email",
    label: "Email",
    ui: {
      root: "p-1",
      base: "p-4",
    },
    placeholder: "Enter your email",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    ui: {
      root: "p-1",
      base: "p-4",
    },
    placeholder: "Enter your password",
    required: true,
  },
]);
</script>

<template>
  <UApp>
    <div class="flex flex-col items-center justify-center gap-4 p-4 h-dvh">
      <UPageCard class="w-full max-w-md">
        <UAuthForm
          ref="authForm"
          title="Authentification"
          :schema="schema"
          :fields="fields"
          class="max-w-sm"
          @submit.prevent="onSubmit"
        />
      </UPageCard>
    </div>
  </UApp>
</template>

<style scoped></style>
