# Post JSON to an API

Rsvp makes it simple to send JSON data to an API using the
[`post`](https://hexdocs.pm/rsvp/rsvp.html#post) effect.

```gleam
import gleam/dynamic/decode
import gleam/http/response.{type Response}
import gleam/json
import rsvp

type NewPost {
  NewPost(title: String, body: String, user_id: Int)
}

type Msg {
  ApiCreatedPost(Result(Response(String), rsvp.Error))
}

fn create_post(new_post: NewPost) {
  let body = json.object([
    #("title", json.string(new_post.title)),
    #("body", json.string(new_post.body)),
    #("userId", json.int(new_post.user_id)),
  ])

  let handler = rsvp.expect_ok_response(ApiCreatedPost)

  rsvp.post("https://jsonplaceholder.typicode.com/posts", body, handler)
}

// Decoder for the API response
fn decode_post() {
  use id <- decode.field("id", decode.int)
  use title <- decode.field("title", decode.string)
  use body <- decode.field("body", decode.string)
  use user_id <- decode.field("userId", decode.int)

  decode.success(Post(id:, title:, body:, user_id:))
}
```

> **Note**: Like with GET requests, remember that rsvp returns a Lustre
> [`Effect`](https://hexdocs.pm/lustre/lustre/effect.html#Effect) that needs to be
> returned from your application's `init` or `update` function to be executed!
