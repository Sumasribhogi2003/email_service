# Resilient Email Sending Service

This project implements a resilient email sending service in JavaScript featuring retry logic with exponential backoff, fallback between multiple mock email providers, idempotency to prevent duplicate emails, rate limiting, and status tracking.

## Features

Retry mechanism with exponential backoff
Fallback between two mock email providers on failure
Idempotency to avoid duplicate sends
Basic rate limiting to control request flow
Email sending status tracking
Clean code following SOLID principles

## Project Structure

backend/ — Node.js/Express API for email service logic
frontend/ — React application to interact with the email service
tests/ — Unit tests for backend service components

## Setup Instructions

Prerequisites
Node.js (v16+ recommended)
npm or yarn package manager
Git

## Clone the Repository

git clone https://github.com/Sumasribhogi2003/email_service.git

cd email_service

--> Backend Setup
Navigate to backend folder:
cd backend
Install dependencies:
npm install
Start the backend server:
npm start
The backend API will be running at http://localhost:3001.

--> Frontend Setup
Open a new terminal, navigate to frontend folder:
cd frontend
Install dependencies:
npm install
Start the React app:
npm start
The frontend will open in your default browser at http://localhost:3000.

--> Running Tests
To run backend unit tests:

From the backend folder, run:
npm test
Tests cover the core email sending logic, retry mechanism, fallback, and idempotency features.

## How to Use

Start backend and frontend servers as described above.
Use the frontend UI to send test emails and view status updates.
Backend logs provide insights into retries, fallbacks, and rate limiting events.

