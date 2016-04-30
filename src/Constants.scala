object Constants {
  val ROOT_PATH: String = "/Users/glzhao/IdeaProjects/TinyHttpServer/static"

  val HTTP_RESPONSE_CODE_MESSAGE_LOOKUP: Map[Int, String] = Map(
    200 -> "OK",
    403 -> "Forbidden",
    404 -> "Not Found",
    501 -> "Not Implemented"
  )

  val HTTP_HEADER_IF_MODIFIED_SINCE: String = "If-Modified-Since"
}
