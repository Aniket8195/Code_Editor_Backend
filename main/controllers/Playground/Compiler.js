const fs = require("fs");
const { exec } = require("child_process");
const { performance, memoryUsage } = require("perf_hooks");

// Cache object to store compiled code
const codeCache = {};

exports.compilecode = async (req, res) => {
  const code = req.body.code;
  const input = req.body.input || ""; // User-provided input
  const language = req.body.language.toLowerCase();

  // Check if the code is already compiled
  if (codeCache[code]) {
    res.send({ success: true, message: codeCache[code] });
    return;
  }

  // If not in cache, compile and execute
  const fileName = `Main.${language}`;
  const filePath = `./${fileName}`;
  fs.writeFileSync(filePath, code);

  const startTime = performance.now();
  const startMemory = process.memoryUsage().heapUsed;

  const execCommand =
    language === "cpp"
      ? `g++ ${fileName} -o Main && echo '${input}' | ./Main` // Use user-provided input
      : language === "java"
      ? `javac ${fileName} && java Main`
      : language === "python"
      ? `python3 ${fileName}`
      : "";

  if (!execCommand) {
    res.send({
      success: false,
      message: "Unsupported language. Please choose C++, Java, or Python.",
      runtime: 0,
      memory: 0,
    });
    return;
  }

  exec(execCommand, (error, stdout, stderr) => {
    const endTime = performance.now();
    const runtime = endTime - startTime;
    const endMemory = process.memoryUsage().heapUsed - startMemory;

    if (error) {
      res.send({ success: false, message: stderr, runtime, memory: endMemory });
    } else {
      codeCache[code] = stdout;
      res.send({ success: true, message: stdout, runtime, memory: endMemory });
    }
  });
};
