## Contact Manager App

A simple contact management application built with Next.js and React. It allows you to view, search, favourite, and paginate contacts. Data is powered by a mock API using `json-server`.

## Features

- View list of contacts
- Search contacts by name (with debounce)
- Mark/unmark contacts as favourites
- Pagination with total record count
- Add new contact (redirects to add form)
- Responsive UI with Material UI
- Data fetching and caching with React Query
- State management with Zustand

### Tech Stack

- **Frontend:** Next.js, React, Zustand, React Query, Material UI
- **Backend (Mock API):** json-server

## Getting Started

## Clone the Repository

```bash 
git clone https://github.com/falguni1808/contact_manager

##  Install Dependencies
npm install

## Start the Mock API (json-server)
npm run json:server

##  Start the Frontend
npm run dev

# URLs
Frontend → http://localhost:3000/contacts

API (json-server) → http://localhost:3001/api/contacts
