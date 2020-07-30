# Application Name

KOHO Front End Developer Technical Take Home Assignment

## Available Scripts

### `npm run process-loads`

Runs the application with Node.js to write appropriate outputs into data/output.txt from data/input.txt.

# Application Description

This application is meant to follow the guidelines set forth by the README.md sent to me for this assignment. The objective was to generate appropriate JSON responses for each input line provided in input.txt. Incoming loads were either accepted, rejected, or ignored based on the following criteria:

- If a customer has issued a load with the incoming load id, the incoming load will be ignored.
- If the load will cause the client's total load input to exceed the $20,000 weekly limit (weeks starting on Mondays), the load will be rejected.
- If the load will cause the client's total load input to exceed the $5,000 daily limit, the load will be rejected.
- If this load is the client's 4th load of a single day, the load will be rejected.
- Otherwise, respond with success for the load input.

The application takes the lines from input.txt, processes them, and outputs each response into its own line in output.txt.

# Application Thought Process

After retrieving and formatting the input.txt data into an array of objects, the goal was to perform checks on each individual load object to see if it passed the assignment's criteria. In order to check, a customer schema was created in order to generate load history for each individual customer with information for each load including its year, month, week, day, accepted status, and load itself.

The array of load objects was iterated through and was tagged with either an accepted, rejected, or duplicate key when checking the criteria against its corresponding customer document. Afterwards, all loads marked as duplicate were filtered, and the remaining accepted and rejected loads were formatted into their corresponding responses, and were written to disc. The customers object was also written to disc in customers.json so it could be referenced if one wished to process further inputs into the same output file.

# Built with

- Node.js

# Authors

Victoria Kastanenka