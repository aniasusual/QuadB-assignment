# Todo App Readme

## Overview
This Todo app is built using the MERN stack with MongoDB as the database. It provides users with functionalities to manage their tasks efficiently. Below are the key features and functionalities of the app:

## Live Link - https://6625a26151c5b61c70a04a40--golden-moonbeam-274b68.netlify.app/
## Features

### Homepage
- Displays all the notes created by the user.
- Clicking on a particular note displays all the details of that note.

### Create New Note
- Floating button at the bottom right allows users to create a new note.
- New note includes:
  - Title
  - Description (Rich text editor with various formatting options)
  - Image/Video link section with an option to preview the link content.
  - Color palette to select the background of the notes.

### Search Functionality
- Homepage includes a search bar to search notes based on the title.

### Sorting
- Sorting functionality (ascending/descending) based on the time at which the note is saved.

### State Management
- Utilizes Redux to maintain the state of the application, providing efficient data management and updates.

### Authentication
- Implements Login and Sign up functionality using authentication for user security.

### Mobile Responsiveness
- The website is mobile-responsive, ensuring a seamless user experience across different devices.

## Folder Structure
- The codebase follows a well-organized folder structure to maintain clarity and ease of development.
  
## Database 
- Storing / retrieving information Mongo database


## Getting Started
To get started with the Todo app, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install dependencies using `npm install` for root folder as well as frontend folder. Please keep in mind the node_modules of the backend folder are in the root directory itself. So kindly run the the npm i command for backend in the root directory itself.
4. Set up the MongoDB database.
5. Configure authentication settings.
6. Run the development server using `npm start`.
7. Access the app in your browser at the specified port.

## Technologies Used
- **Frontend**: ReactJS, Redux, HTML, CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Credits
This Todo app was created by [Your Name] as a project for [Purpose/Context]. Contributions and feedback are welcome.

## License
This project is licensed under the [License Name] License. See the LICENSE file for details.

## Contact
For any inquiries or support, please contact d.animesh.pr@gmail.com.
