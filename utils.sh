#!/bin/bash

# =============
#   Variables
# =============

db="db.getSiblingDB('nertivia')";
command="docker-compose exec mongo mongo --eval";
PS3="Choose an option: ";

# =============
#   Main Menu
# =============

main_menu() {
 select choice in "Manage perms" "Manage badges"; do
  case $choice in
  "Manage perms")
     admin_perms_menu
     ;;
   "Manage badges")
    badge_manager_menu
    ;;
  esac
done
}

# ==============
#  Admin Perms
# ==============

admin_perms_menu() {
 select choice in "Make user an admin" "Revoke admin perms from user" "Go back"; do
  case $choice in
  "Make user an admin")
    admin_perms_add
    ;;
  "Revoke admin perms from user")
    admin_perms_revoke
    ;;
  "Go back")
    main_menu
    ;;
 esac
done
}

admin_perms_add() {
 printf "User ID: ";
 read -r id;
 $command "$db.users.update({ uniqueID: '$id' }, { \$set: { admin: 1, badges: [ 2 ] }})"
}

admin_perms_revoke() {
 printf "User ID: ";
 read -r id;
 $command "$db.users.update({ uniqueID: '$id' }, { \$set: { admin: 0 }})"
}

# ==============
# Badge Manager
# ==============

badge_manager_ids() {
 echo "Badge IDs:"
 echo "0 - Creator"
 echo "1 - Cute"
 echo "2 -  Developer"
 echo "3 - Supporter"
 echo "4 - Idea Queen"
 echo "5 - Bug Catcher"
 echo "6 - Translator"
 echo "7 - Contributor"
}

badge_manager_menu() {
 select choice in "Give badge to user" "Remove badge from user" "Badge IDs" "Go back"; do
  case $choice in
  "Give badge to user")
   badge_manager_give
   ;;
  "Remove badge from user")
   badge_manager_remove
   ;;
  "Badge IDs")
   badge_manager_ids
    ;;
  "Go back")
  main_menu
   ;;
 esac
done
}

badge_manager_give() {
 printf "User ID: ";
 read -r id;
 printf "Badge ID: ";
 read -r badge_id;
 $command "$db.users.update({ uniqueID: '$id' }, { \$push: { badges: $badge_id }})"
}

badge_manager_remove() {
 printf "User ID: ";
 read -r id;
 printf "Badge ID: ";
 read -r badge_id;
 $command "$db.users.update({ uniqueID: '$id' }, { \$pull: { badges: $badge_id }})"
}

main_menu
