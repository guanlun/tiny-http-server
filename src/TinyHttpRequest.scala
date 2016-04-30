
class TinyHttpRequest(inputArray: Array[String]) {
  var method: String = null
  var path: String = null
  var headers: Map[String, String] = Map()

  createFromRequestMessage(inputArray)

  def createFromRequestMessage(inputArray: Array[String]): Unit = {
    if (inputArray.size == 0) {
      return;
    }

    val initialRequestLine = inputArray(0)
    val initialLineSegments: Array[String] = initialRequestLine.split(" ")

    this.method = initialLineSegments(0)
    this.path = Constants.ROOT_PATH + "/" + initialLineSegments(1)


    inputArray.slice(1, inputArray.length).foreach(line => {
      val segments = line.split(": ")
      headers += segments(0) -> segments(1)
    })
  }

  override def toString = s"TinyHttpRequest: $method"
}
