
class TinyHttpResponse(statusCode: Int) {

  var content: String = ""
  var headers: Map[String, String] = Map[String, String]()

  def addHeader(key: String, value: String): Unit = {
    headers += key -> value
  }


  def responseMessage: String = {
    val statusText: String = Constants.HTTP_RESPONSE_CODE_MESSAGE_LOOKUP.getOrElse(statusCode, "Unknown")

    val headerLines = headers.map { case (k, v) => k + ": " + v }
    var headerText = ""
    if (headerLines.nonEmpty) {
      headerText = headerLines reduce((line1, line2) => line1 + "\n" + line2)
    }

    val contentLength:Int = content.length

    s"HTTP/1.1 $statusCode $statusText\n$headerText\nContent Length: $contentLength\n\n$content"
  }
}
