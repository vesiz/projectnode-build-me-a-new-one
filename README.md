# projectnode-build-me-a-new-one

Project generator, can create two types of projects:
  1) simple web project - with an html, css and js files
  2) web project, containing bootstrap and jquery libraries

The commands are executed via node.js.

project type 1 command: <br />
  ```
  create-pt1 -in :folder-name -atc
  ```
project type 2 command: <br />
  ```
  create-pt2 -in :folder-name -atc
  ``` 
  
  `-atc` adds template code to the project files. <br />
  `-in :folder-name` and `-atc` are optional. Without them the project will be created in a folder with a default name and without template code.
  
  
