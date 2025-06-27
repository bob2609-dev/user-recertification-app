#!/bin/bash

# This script automates the process of adding all changes,
# committing them with a user-provided message, and pushing
# to the remote repository.
#
# Usage:
# ./git_push.sh "Your commit message"
#
# It first displays the git status, then adds all unstaged changes.
# It then commits the changes with the first argument passed to the script
# as the commit message. Finally, it pushes the changes to the remote.

# Display current git status
git status && \

# Add all changes to staging
git add . && \

# Commit changes with the message provided as the first argument
git commit -m "$1" ; \

# Push the commit to the remote repository
git push
