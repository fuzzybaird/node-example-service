#!/bin/bash
echo $GIT_URL
if [[ $GIT_URL =~ \/(.*)\.git ]]; then
    echo ${BASH_REMATCH[1]}
else
    echo "false"
fi