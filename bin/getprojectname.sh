#!/bin/bash
if [[ $GIT_URL =~ \/(.*)\.git ]]; then
    echo ${BASH_REMATCH[1]}
else
    echo ''
fi