import { Ok, Error } from "./gleam.mjs";
import { Uri } from "../gleam_stdlib/gleam/uri.mjs";
import { Some, None } from "../gleam_stdlib/gleam/option.mjs";

export const from_relative_url = (url_string) => {
  if (!globalThis.location) return new Error(undefined);

  const url = new URL(url_string, globalThis.location.href);
  const uri = uri_from_url(url);

  return new Ok(uri);
};

const uri_from_url = (url) => {
  const optional = (value) => (value ? new Some(value) : new None());

  return new Uri(
    /* scheme   */ optional(url.protocol?.slice(0, -1)),
    /* userinfo */ new None(),
    /* host     */ optional(url.hostname),
    /* port     */ optional(url.port && Number(url.port)),
    /* path     */ url.pathname,
    /* query    */ optional(url.search?.slice(1)),
    /* fragment */ optional(url.hash?.slice(1)),
  );
};
