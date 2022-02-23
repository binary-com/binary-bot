export const getRelatedDeriveOrigin = () => {
  let origin = "https://app.deriv.com";
  const split_host_name = /^(staging-)?(bot.deriv.)([a-zA-Z]*)$/.exec(
    window.location.hostname
  );
  if (split_host_name) {
    const prefix = split_host_name[1] || "";
    const extension = split_host_name[3] || "";
    if (["com", "me", "be"].includes(extension)) {
      origin = `https://${prefix}app.deriv.${extension}/`;
    }
  }
  return origin;
};

export const generateDerivLink = (path, ...queries) => {
  const origin = getRelatedDeriveOrigin();
  const redirect_query = `ext_platform_url=${encodeURIComponent(
    window.location.origin
  )}`;
  queries.push(redirect_query);
  return `${origin + path}?${queries.join("&")}`;
};
