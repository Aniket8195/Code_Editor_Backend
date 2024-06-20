import * as fs from 'fs';
import { exec } from "child_process";
import { createClient } from 'redis'
const client = createClient();

async function processSubmission(submission: string) {
  const { code, input, language,id } = JSON.parse(submission);
  const fileName = `Main.${language}`;
  const execCommand =
    language === "cpp"
      ? `g++ ${fileName} -o Main && echo '${input}' | Main.exe`
      : language === "java"
      ? `javac ${fileName} && echo '${input}' | java Main`
      : language === "python"
      ? `python3 ${fileName} <<< '${input}'`
      : "";

  if (!execCommand) {
        
        console.error("Unsupported language:", language);
        return;
  }

  fs.writeFileSync(fileName, code);

  const startTime = new Date().getTime();

  exec(execCommand, (error, stdout, stderr) => {
      const endTime = new Date().getTime();
      const executionTime = endTime - startTime;

      if (error) {
            client.PUBLISH("results", JSON.stringify({ success: false, message: stderr, time: executionTime,id:id }));
            console.error({ success: false, message: stderr, time: executionTime });
      } else {
          const spaceComplexity = code.length;
          client.PUBLISH("results", JSON.stringify({ success: true, message: stdout, time: executionTime, space: spaceComplexity,id:id }));
          console.log({
              success: true,
              message: stdout,
              time: executionTime,
              space: spaceComplexity,
          });
      }
  });

}
async function startWorker() {
  try {
      await client.connect();
      console.log("Worker connected to Redis.");

      // Main loop
      while (true) {
          try {
              const submission = await client.brPop("problems", 0);
              // @ts-ignore
              await processSubmission(submission.element);
          } catch (error) {
              console.error("Error processing submission:", error);
              // await client.lPush("problems", submission.element);
          }
      }
  } catch (error) {
      console.error("Failed to connect to Redis", error);
  }
}
startWorker();
