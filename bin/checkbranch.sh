#!/bin/bash
echo $GIT_BANCH
if [[ $GIT_BANCH =~ ^([fF]eature|[bB]ug|[wW]arm[fF]ix|hot[fF]ix)\/[a-zA-Z]+-[0-9]+ ]]; then
    echo "true"
else
    echo "false"
fi