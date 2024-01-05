const fs = require("fs");
const requestHandler = (req, res, next) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title><head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write(
      '<body><form action="/regester" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    res.write(
      "<html><body><h1><em>hi buddy its message from page.</em></h1></body></html>"
    );
  }
  if (url === "/regester" && method === "POST") {
    const body = [];
    // adding on event listner
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      // concatinating body content in buffer
      const parsedBody = Buffer.concat(body).toString();
      // Split a string into substrings using the specified separator and return them as an array.
      const message = parsedBody.split("=")[1];
      fs.writeFileSync("message.txt", message);
    });
    // redirecting
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
};
module.exports = requestHandler;