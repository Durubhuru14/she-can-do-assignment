export const userLogout = async () => {
  await fetch("/api/logout");
  window.location.href = "/";
};
