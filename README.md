# BlOOPrint

**README**

Level of Achievement: Apollo

Website hosted:

[BLOOPrint Website](https://blooprint-rust.vercel.app/)

## Aim

We hope to make an **Entity Visualization** mind map specially catered to Java Object-Oriented Programming to provide future programmers with an app to efficiently plan out and keep track of their implementations.

## Scope

- Simplified Entity Properties & Methods Viewing
- Automated Diagram Creation From Java File Upload
- User Account Authentication

## Problem

Challenging to navigate between various tech stacks such as React.js, HTML, CSS, JavaScript, Git, and Firebase while learning them simultaneously.

Styling an entire site from a blank slate

Difficult to determine the best online packages to incorporate into our project

Difficult to adjust CSS between inline CSS, MaterialUI, Bootstrap, and hosting on Vercel.

## User stories & Motivation

Easy to lose track of the implementations when coding - As a student who is relatively new to programming, I want to be able to visualize and plan out the implementation of a given task/project

Searching through entities for methods & properties is tedious and time-consuming - As a student who is doing Object-Oriented Programming, I want to be able to more efficiently look up the necessary methods and properties

## Features implemented

1. User Account Authentication:
    - Securely authenticate user accounts with email verification.
    - Enforce strong password criteria to ensure account security.

2. Interactive Walkthrough (bottom of landing page and sidebar):
    - Guided tour to help users quickly familiarize themselves with website usage.

3. Manual Mind Map Creation:
    - Intuitively create mind maps with a user-friendly interface.
    - Edit and update mind maps as needed even after creation.

4. Automatic Mind Map Creation:
    - Seamlessly upload JavaScript files of any format for automatic mind map generation.
    - Upload CSV files to instantly generate mind maps based on the provided data.

5. Saving and Downloading Mind Map in CSV format:
    - Conveniently re-upload downloaded mind maps to the website for further updating.
    - Download mind maps in CSV format for offline viewing and easy sharing.
    - Optional: Download directly on the project page

6. Simplified Entity & Dependencies Viewing:
    - Easily visualize and explore entities and their dependencies in a simplified format.
    - Gain a clear understanding of the relationships between entities for efficient analysis and decision-making.

7. Entity, Methods & Dependency viewing in Table format:
    - Convenient alternative method for viewing entity details on a single page.

## Architecture diagrams

## Testing Procedures

### System testing Summary: (Testing of UI component rendering, Click testing (check if the individual component is working), Whole Page testing) 

Test format:
Test type: Stubbing rather than importing from packages
due to errors from irrelevant components not being tested
Using Jest
preset: “ts-jest”
transform: “ts-jest” & “babel-jest”
testEnvironment: “jsdom”

- NewProjectTemplate:
  - Clicking "Add Box" increases `boxes.length` (pass)
  - Clicking "Add Dependency" adds to the dependencies of an entity (pass)
  - Clicking "Add Method" adds to the methods of an entity (pass)

- ReactCSVSaver:
  - Clicking the "Save" button triggers file upload (pass)

- ReactCSVDownloader:
  - Clicking "Download" triggers file download (pass)

- ProjectDetails:
  - ProjectDetails renders Entity name, Methods, Dependencies (pass)

- HomePage:
  - HomePage renders the table (pass)

- PageRouting:
  - Navigation to SignIn (pass)
  - Navigation to HomePage (pass)

### User Feedback Summary: (Survey of potential users & high-fidelity artifacts)

- View Project Details page, "Back to Project" button blends in too much (Done, added in borders & background color)
- Add further specification that we only accept JavaScript code in non-CSV upload (Done, added line in red for further clarification)
- Alert for email verification cuts into the "Back" button (Done, adjusted positioning)
- Alert for email verification remains when navigating to other pages (Done, adjusted logic to only show on SignUp page)
- No place to reset the password (Done, using Firebase, added a new page for resetting the password)

### Possible future implementations from user feedback:

- Create a download image function to save the mind map as a JPG

### Steps taken in User Feedback:

- Criteria: Basic knowledge of coding and object-oriented programming
- Online video call (Google Meet) to directly view the user's real-time experience with the prototype
- Went through project creation, saving, account creation, and finally, overall UI experience.


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

## Project Architecture

BLOOPrint uses a Monolithic model involving a back end(Firebase) and a front end(react). In the image below, the flow of information is such that the user uploads information through the react app to firebase, and this information, in the form of a .csv file is retrievable, again, through the react app from firebase.
![Image](src\Component\Images\simpleprojectmodel.jpg)

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





