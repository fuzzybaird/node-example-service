#!/bin/bash
GIT_BANCH="featre/stix-1434"
echo $GIT_BANCH
if [[ $GIT_BANCH =~ ^([fF]eature|[bB]ug|[wW]arm[fF]ix|hot[fF]ix)\/[a-zA-Z]+-[0-9]+ ]]; then
    echo "$GIT_BANCH is a feature branch"
else
    echo "oops"
fi