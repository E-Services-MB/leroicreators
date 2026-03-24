export default defineNuxtRouteMiddleware(async (to, from) => {
  const { user } = useUserSession();

  // redirect the user to the login screen if they're not authenticated
  if (user.value != null && to.path.includes("auth")) {
    return navigateTo("/admin");
  }

  if (user.value == null && to.path.includes("admin")) {
    return navigateTo("/auth");
  }
});
