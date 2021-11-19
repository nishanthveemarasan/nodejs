const fs = require("fs");
const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='message' /> <button type='submit'>Submit Buttoo</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    }); //function to execute for every data piece
    return req.on("end", () => {
      //execte once we gathered all the inputs
      const parseBody = Buffer.concat(body).toString();
      console.log(parseBody);
      const message = parseBody.split("=")[1];
      fs.writeFile("message.text", message, (err) => {
        //functon to run when the file is completed /error response
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
      //res.writeHead(302 , {});
      //   res.statusCode = 302;
      //   res.setHeader("Location", "/");
      //   return res.end(); //if we keep inside it will execute below this as well and also
      //below code can also run beofre this code as it is just a callack
      // so we cant return inside to avoid  return req.on(end)
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from my Node.js Server!!</h1></body>");
  res.write("</html>");
  res.end();
};

module.exports = {
  handler: requestHandler,
};
