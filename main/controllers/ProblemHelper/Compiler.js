const fs = require("fs");
const { exec } = require("child_process");
const jwt = require('jsonwebtoken');

const redis = require('redis');

const client = redis.createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

client.connect().then(() => {
  console.log("Connected to Redis");
}).catch(err => {
  console.error("Failed to connect to Redis:", err);
});


exports.compilecode = async (req, res) => {
  if (!client.isOpen) {
    await client.connect();
  }
  console.log("Connected to Redis");
  const jwt_token= req.headers.authorization;
  const token = jwt_token.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const id=decoded.id;

  const code = req.body.code;
  const input = req.body.input || "";
  const language = req.body.language.toLowerCase();
  await client.lPush("problems",JSON.stringify({code:code,input:input,language:language,id:id}));

  // const fileName = `Main.${language}`;
  // const execCommand =
  //   language === "cpp"
  //     ? `g++ ${fileName} -o Main && echo '${input}' | Main.exe` 
  //     : language === "java"
  //     ? `javac ${fileName} && echo '${input}' | java Main`
  //     : language === "python"
  //     ? `python3 ${fileName} <<< '${input}'`
  //     : "";

  // if (!execCommand) {
  //   res.send({
  //     success: false,
  //     message: "Unsupported language. Please choose C++, Java, or Python.",
  //   });
  //   return;
  // }

  // fs.writeFileSync(fileName, code);

  // const startTime = new Date().getTime();

  // exec(execCommand, (error, stdout, stderr) => {
  //   const endTime = new Date().getTime();
  //   const executionTime = endTime - startTime;

  //   if (error) {
  //     res.send({ success: false, message: stderr, time: executionTime });
  //   } else {
  //     const spaceComplexity = code.length;

  //     res.send({
  //       success: true,
  //       message: stdout,
  //       time: executionTime,
  //       space: spaceComplexity,
  //     });
  //   }
  // });
};
