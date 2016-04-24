
class TinyHttpResponse(statusCode: Int, content: String = "") {

  def responseMessage = {
    val statusText:String = Constants.HTTP_RESPONSE_CODE_MESSAGE_LOOKUP.getOrElse(statusCode, "Unknown")

    val contentLength:Int = content.length

    s"HTTP/1.1 $statusCode $statusText\nContent Length: $contentLength\n\n$content"
  }
}
