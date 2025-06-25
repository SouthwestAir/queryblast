#!/bin/bash

# Set up environment variables for testing
# NEPTUNE_ENDPOINT, NEPTUNE_PORT, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_SESSION_TOKEN are required.

# Build the project
bun build ./src/queryblast.ts

# Run the tests
echo "Running end-to-end tests..."
./tests/ys/e2e/neptune_queries.test.ys

# Check for test failures
if [ $? -eq 0 ]; then
    echo "All tests passed!"
    exit 0
else
    echo "Tests failed!"
    exit 1
fi