# Get JSON from an API

Rsvp it easy to fetch remote resources like JSON from an API using the
[`get`](https://hexdocs.pm/rsvp/rsvp.html#get) effect.

```gleam
import gleam/dynamic/decode
import gleam/int
import rsvp

type Post {
  Post(user_id: Int, id: Int, title: String, completed: Bool)
}

type Msg {
  ApiReturnedPost(Result(Post, rsvp.Error))
}

fn get_todo(id) {
  let url = "https://jsonplaceholder.typicode.com/todos/" <> int.to_string(id)
  let handler = rsvp.expect_json(decode_todo(), ApiReturnedPost)

  rsvp.get(url, handler)
}

fn decode_todo() {
  use user_id <- decode.field("userId", decode.int)
  use id <- decode.field("id", decode.int)
  use title <- decode.field("title", decode.string)
  use completed <- decode.field("completed", decode.bool)

  decode.success(Post(user_id:, id:, title:, completed:))
}
```

> **Note**: remember that rsvp returns a Lustre
> [`Effect`](https://hexdocs.pm/lustre/lustre/effect.html#Effect) for the runtime
> to perform. For the request to be made, you need to return the effect from your
> application's `init` or `update` function!
