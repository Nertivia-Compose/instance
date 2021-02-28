#!/bin/bash

# =============
#   Variables
# =============

rm="rm -rf build/client";
clone="git clone http://github.com/Nertivia-Compose/client-beta build/client";
PS3="Choose an option: ";

# ==============
#   Disclaimer
# ==============

disclaimer() {
 printf "Disclaimer: You would have to manualy replace the beta client with stable, if you decide to go back\n"
 printf "Are you sure? [Y/n] ";
 read -r final;
 if [[ -z "$final" || ${final,,} = "y" ]]; then
  final;
 fi
}

# ==============
#   Clone beta
# ==============

final() {
 $rm
 $clone 
}

disclaimer