const appError = (message, statusCode = 500) => {
  const error = new Error();
  error.message = message;
  error.statusCode = statusCode;
  error.status = String(statusCode).startsWith("4")
    ? "client_error"
    : "server_error";

  // Capture the stack trace
  const stackTraceLines = error.stack.split("\n").slice(1);

  // Extract file name and line number for each frame in the stack trace
  error.stackFrames = stackTraceLines
    .map((line) => {
      const match = line.match(/\s+at .+\(([^)]+)\)/);
      if (match) {
        const [, fileNameAndLine] = match;
        const [fileName, lineNumber] = fileNameAndLine.split(":");
        return { fileName, lineNumber };
      }
      return null;
    })
    .filter((frame) => frame !== null);

  return error;
};

module.exports = { appError };
