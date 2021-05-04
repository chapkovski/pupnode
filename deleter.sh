#!/bin/bash

apps=(negotiations-otree
)
for u in "${apps[@]}"
do
    heroku apps:destroy $u --confirm $u
done
