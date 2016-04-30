import java.io.{File, PrintStream}
import java.net.ServerSocket
import java.util.Scanner

import scala.collection.mutable.ArrayBuffer
import scala.io.{Source}
import scala.sys.process._

object Main {
  def main(args: Array[String]) {

    val server = new ServerSocket(9999)

    while (true) {
      val s = server.accept

      val in = s.getInputStream
      val out = new PrintStream(s.getOutputStream)

      val scanner = new Scanner(in)
      val requestLines = ArrayBuffer.empty[String]

      while (scanner.hasNextLine) {
        val line = scanner.nextLine

        if (line.isEmpty) {
          val responseMessage = processHttpRequest(requestLines.toArray).responseMessage

          out.println(responseMessage)
          out.flush
          s.close
        } else {
          requestLines += line
        }
      }

    }
  }

  def processHttpRequest(inputArray: Array[String]): TinyHttpResponse = {
    val request = new TinyHttpRequest(inputArray)

    if (request.method != "GET") {
      // Currently only support GET method
      return new TinyHttpResponse(501)
    }

    val file = new File(request.path)
    if (!file.exists) {
      return new TinyHttpResponse(404)
    }

    if (!file.canRead) {
      return new TinyHttpResponse(403)
    }

    val response: TinyHttpResponse = new TinyHttpResponse(200)

    val ifModifiedSince = request.headers.getOrElse(Constants.HTTP_HEADER_IF_MODIFIED_SINCE, "")

    if (!ifModifiedSince.isEmpty) {
//      return new TinyHttpResponse(304)
    }

    val fileTextContent = Source.fromFile(request.path).getLines.reduce((line1, line2) => {
      line1 + "\n" + line2
    })

    response.content = getFileInterpreter(request.path) match {
      case None => fileTextContent
      case Some(interpreter) => {
        val command = interpreter + " " + request.path
        command.!!
      }
    }

    response.addHeader("Cache-Control", "private")
    response.addHeader("Last-Modified", "Sun, 25 Sep 2005 13:00:00 GMT")

    response
  }

  def getFileInterpreter(filePath: String): Option[String] = {
    val dotIndex = filePath.lastIndexOf(".")
    val extension = filePath.substring(dotIndex + 1)

    extension match {
      case "php" => Some("php")
      case "py" => Some("python")
      case _ => None
    }
  }
}
