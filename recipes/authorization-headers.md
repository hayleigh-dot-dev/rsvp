# Including authorization headers in your requests

The [`get`](https://hexdocs.pm/rsvp/rsvp.html#get) and
[`post`](https://hexdocs.pm/rsvp/rsvp.html#post) convenience functions do not
give you any control over the HTTP request being sent. To include HTTP headers
like authorization tokens, you need to construct the [`Request`](https://hexdocs.pm/gleam_http/gleam/http/request.html#Request)
yourself and use the [`send`](https://hexdocs.pm/rsvp/rsvp.html#send) function.

```gleam
import gleam/dynamic/decode
import gleam/http.{Get}
import gleam/http/request
import rsvp

type User {
  User(username: String, email: String)
}

type Msg {
  ApiReturnedUser(Result(User, rsvp.Error))
}

fn get_user(api_token: String) {
  let request =
    request.new()
    |> request.set_method(Get)
    |> request.set_header("authorization", "Bearer " <> api_token)
    |> request.set_host("api.example.com")
    |> request.set_path("/user")

  let handler = rsvp.expect_json(decode_user(), ApiReturnedUser)

  rsvp.send(request, handler)
}

fn decode_user() {
  use username <- decode.field("username", decode.string)
  use email <- decode.field("email", decode.string)

  decode.success(User(username:, email:))
}
```

> **Note**: remember that rsvp returns a Lustre
> [`Effect`](https://hexdocs.pm/lustre/lustre/effect.html#Effect) for the runtime
> to perform. For the request to be made, you need to return the effect from your
> application's `init` or `update` function!
