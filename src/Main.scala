import java.io.{File, PrintStream}
import java.net.ServerSocket
import java.util.Scanner

import scala.collection.mutable.ArrayBuffer
import scala.io.{Source}

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
      return new TinyHttpResponse(501)
    }

    val file = new File(request.path)
    if (!file.exists) {
      return new TinyHttpResponse(404)
    }

    if (!file.canRead) {
      return new TinyHttpResponse(403)
    }

    val content = Source.fromFile(request.path).getLines.reduce((line1, line2) => {
      line1 + "\n" + line2
    })

    new TinyHttpResponse(200, content)
  }
}
