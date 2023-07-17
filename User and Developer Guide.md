# BLOOPrint User Guide

This user guide provides the relevant information on the start-up usage and features of the BLOOPrint webapp.

## Installation

No installation is required, to access BLOOPrint simply access this [link](https://blooprint-rust.vercel.app/). 

## Getting Started

BLOOPrint requires users to have an internet connection to allow BLOOPrint to store information. Users should also have access to a working email to allow users to create an account. To create an account click on "Get Started" and fill in the fields. Exisiting users may skip ahead to the login page. 

![Image](/src/Component/Images/LandingPage.png)

## Usage Examples

BLOOPrint allows users to draw diagrams by uploading their Javascript files and the diagrams are automatically generated. Uploaded code will additionally, be parsed for the attributes and variables which will be displayed in the "View Project Details' tab.

Alternatively, users can manually generate a diagram through the interface in the "Go to Mindmap" page by using the "Add Box" button.

A completed diagram can be saved by clicking on the "Save" button. This will save a copy of your diagram as a .csv file which will only be readable through our webapp. A copy of the .csv file will also be kept with BLOOPrint and available for downloading in the Homepage under the "Previous Saves" section.

Users can choose to reupload their .csv files to to re-render their previously generated diagrams.

# BLOOPrint Developer Guide 

The developer guide provides information for developers who wish to understand and/or contribute to the project.

## Development Environment Setup
1. Install Node.js: Visit the Node.js Website to download node and then npm.

2. Install VScode to your system.

3. Using the terminal install the dependencies specified in the package.json file.

4. To start the development server run 
 ```npm run dev``` 


### Programming Languages
This project mainly uses Typescript



## Project Structure

![Image](/src/Component/Images/Directories.png)
Within the BLOOPrint directory, only the src folder was used in the making of the app, thus we will only be focusing on the src folder in this section. The rest of the folders/files are only boiler-plate code created by react.
### src/
This folder is the main workspace of BLOOPrint and thus contains the Component/ folder, CSS-Folder/ folder, App.tsx, firebase.tsx, acorn-loose.d.ts and main.tsx.
#### CSS-Folder/
This folder contains all the styling of our app excluding the in text styling some of our components may have.
#### Components/ 
This folder contains reusable react components used in this app. Additionally the following folders are found within Components/
##### Auth/
This folder holds all the components required in authenticating the user during a login or a sign in. Additionally this folder also contains the code parser in our app for the generation of the diagrams.
##### Images/
This folder just stores all the images used in our app.
##### Layout/
This folder contains the Home page and landing page displayed in BLOOPrint.
##### NavigationFolder/
This folder only contains 1 file responsible for the navigation bar.
## UI Layout
The following diagram displays the flow of the pages within BLOOPrint starting from the top.
![Image](src\Component\Images\pagelayout.png)
######powered by BLOOPrint


## Testing and Quality Assurance
## Known Issues
### Vulnerabilities
There are a few vulnerabilities that will show upon running
```npm audit```

These issues are, what we believe to be, benign dependency issues within the firebase libraries which aren't even in use. Attempts to run

```npm audit fix```

or similar commands will not solve the issue. 


