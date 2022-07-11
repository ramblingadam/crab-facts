# Crab Facts!

A responsive full-stack web app which allows users to add and upvote their favorite crab facts.

### [**Click here to check it out!**](https://crab-facts-ra.herokuapp.com/)

[![Screenshot](https://user-images.githubusercontent.com/96756923/178187931-b1af7b85-0ccc-4f3e-a7c2-71a6c324a01a.png)](https://crab-facts-ra.herokuapp.com/)



# How It's Made:
**Tech used:** Node.js, Express, MongoDB, TML, CSS, JavaScript

# Features:
## Fully Responsive
- The layout intelligently shrinks and grows depending on the size and orientation of the user's viewport.

## Stylish Theming
- Crabs are delightful, so the UI is too!

## Persistent Data
- All crab facts and their likes are stored in a MongoDB database.
- Input validation ensures that only facts about crabs are allowed.
- Keeps track of user votes so that a single user cannot upvote the same fact twice.

# Lessons Learned:
- Sorting MongoDB documents should be done on the front end, not the back.
- Environment variables are critical for app security.
- A group of crabs is called a 'cast'
