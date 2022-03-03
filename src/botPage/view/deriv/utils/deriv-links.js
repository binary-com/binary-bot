export const getRelatedDeriveOrigin = () => {
  let origin = "https://app.deriv.com";
  const split_host_name = /^(staging-)?(bot.deriv.)([a-zA-Z]*)$/.exec(
    window.location.hostname
  );
  let prefix = ""
  let extension = "com"
  if (split_host_name) {
     prefix = split_host_name[1];
     extension = split_host_name[3];
    if (["com", "me", "be"].includes(extension)) {
      origin = `https://${prefix}app.deriv.${extension}/`;
    }
  }
  return {origin,extension,prefix};
};

export const generateDerivLink = (path, ...queries) => {
  const redirect_query = `ext_platform_url=${encodeURIComponent(
    window.location.origin
  )}`;
  queries.push(redirect_query);
  return `${getRelatedDeriveOrigin().origin}${path}?${queries.join("&")}`;
};
