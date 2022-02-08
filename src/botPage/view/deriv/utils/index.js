export * from "./account-methods";

export const generateDerivLink = (path, ...queries) => {
  const is_staging = /^staging-/.test(window.location.hostname);
  const prefix = is_staging ? "staging-" : "";
  const current_domain = window.location.hostname.split(".").splice(-1);
  const target_domain = current_domain === "me" ? "me" : "com";
  const origin = `https://${prefix}app.deriv.${target_domain}/`;
  const redirect_query = `ext_platform_url=${encodeURIComponent(window.location.origin)}`;

  queries.push(redirect_query);

  return `${origin + path}?${queries.join("&")}`;
};
