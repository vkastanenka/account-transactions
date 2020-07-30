// Utilities concerning writing data to files

// Utilities
const fs = require("fs");
const promisify = require("util").promisify;
const writeFilePromise = promisify(fs.writeFile);

// Generic function to write content to a file
const writeToFile = async (filePath, contentToWrite) => {
  try {
    await writeFilePromise(filePath, contentToWrite);
  } catch (err) {
    console.log(`Could not write file because of ${err}`);
  }
};

const writeCustomersAndResponse = async (
  currentOutput,
  formattedResponses,
  outputPath,
  customersPath,
  customers
) => {
  // If output file already has lines in it, append to the current document
  if (currentOutput) {
    formattedResponses = `${currentOutput}\n${formattedResponses}`;
  }

  // Write customers and responses to file
  await writeToFile(outputPath, formattedResponses);
  await writeToFile(customersPath, JSON.stringify({ customers }));
};

exports.writeToFile = writeToFile;
exports.writeCustomersAndResponse = writeCustomersAndResponse;
