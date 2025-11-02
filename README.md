# rsvp

[![Package Version](https://img.shields.io/hexpm/v/rsvp)](https://hex.pm/packages/rsvp)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/rsvp/)

```sh
gleam add rsvp@1
```

Rsvp helps you make HTTP requests and handle their responses in a Lustre application.
This library supports both client side SPAs and components, _and_ server components
meaning applications that use rsvp are more likely to be suitable as **universal
components**.

## Usage

Rsvp separates the concerns of making HTTP requests from handling their responses
meaning we need to do three things to properly make a request:

- First, we must define a [`Handler`](./rsvp.html#Handler) that describes how to
  handle the response and turn it into a message your `update` function can
  understand.

- Second, we must create the [`Effect`](https://hexdocs.pm/lustre/lustre/effect.html)
  that describes the request using either the [`get`](./rsvp.html#get) or
  [`post`](./rsvp.html#post) convenience functions, or by constructing a
  [`Request`](https://hexdocs.pm/gleam_http/gleam/http/request.html#Request) and
  using [`send`](./rsvp.html#send) directly.

- Finally, we must return that `Effect` in our application's `init` or `update`
  functions so that the runtime can perform the request.

## Recipes

The following recipes are available to help you get started with rsvp:

- [Fetching JSON](./recipes/get-json.md)

- [Post JSON](./recipes/post-json.md)

- [Include authorization headers](./recipes/authorization-headers.md)

If you think a common use case is missing or you'd like to contribute a recipe
yourself, please open an issue or pull request!
