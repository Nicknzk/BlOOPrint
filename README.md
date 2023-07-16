# BlOOPrint

**README**

Level of Achievement: Apollo

Website hosted:

[https://blooprint-rust.vercel.app/](https://blooprint-rust.vercel.app/)

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

### System testing Summary: (Testing of UI component rendering, Click testing (check if individual component is working), Whole Page testing) 


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

## User & Developer guide



