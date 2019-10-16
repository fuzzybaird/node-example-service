#!/bin/bash
GIT_BRANCH='feature/eng-1212-calkjalk-asdsd'
if [[ $GIT_BRANCH =~ ^([fF]eature|[bB]ug|[wW]arm[fF]ix|hot[fF]ix)\/(.+) ]]; then
    echo ${BASH_REMATCH[2]}
else
    echo ''
fi