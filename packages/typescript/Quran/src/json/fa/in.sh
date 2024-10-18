#!/bin/sh
set -e

##
# variables
file="${1}"
dest=$(dirname ${file}).json

##
# main
mv ${file} ${dest}
