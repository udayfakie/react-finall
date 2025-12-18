React-Final Project


This is a React-based web application that allows users to view, create, and manage cards. It includes features such as:
User authentication (login/register)
Viewing all cards and personal cards
Like/unlike functionality for cards
Filtering/searching cards
Integration with Leaflet for maps

Features
User Accounts: Users can register, login, and see their saved cards.
Card Management: Users can create, edit, delete, and like cards.
Search & Filter: Search cards by title or category.
Map Integration: Leaflet maps showing locations on markers.
Responsive Design: Works on desktop and mobile screens.

Tech Stack
Frontend: React, TypeScript, React Router 
Styling: CSS, Bootstrap
Maps: Leaflet, React-Leaflet
API: Axios for backend requests
State Management: React useState & useEffect

Installation

Clone the repository:

git clone git@github.com:udayfakie/react-finall.git
cd react-finall-project


Install dependencies:
npm install

Start the development server:
npm start


The app will run on http://localhost:3000.


Usage

Navigate to / for login or /register to create a new account.
After login, visit /cards to see all cards.
Click on a card to like/unlike it.
Use the search input in the navbar to filter cards by title.
Maps are visible for cards with location coordinates.

Environment Variables

Create a .env file in the root directory.



