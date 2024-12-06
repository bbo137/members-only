# Members-Only

A web application built with Node.js and Express.js that allows authenticated users to create, view, and delete posts. This project is designed to practice the use of sessions by utilizing Passport.js for user authentication and session management. Posts are anonymous unless you are a member or an admin, who can see the authors of the posts.

## Features

- **User Authentication:** Users can sign up, log in, and log out.
- **Role Management:** Different roles including admin, member, and author.
- **Post Management:** Authenticated users can create posts; only authors and admins can delete posts.
- **Role-based Permissions:** Different capabilities and permissions based on user roles.
- **Anonymous Posting:** Posts are anonymous to non-members; members and admins can see who posted.
- **Special Codes:** Use secret codes to become a member or admin.

## Usage

- Visit the demo at [Members-Only](https://members-only-5y1j.onrender.com).
- Sign up or log in to create posts.
- Admins can manage posts and view additional admin options.
- Authors can delete their own posts.
- Posts are anonymous to non-members, but members and admins can see who posted them.
- Use the secret code `MEMBER` to become a member.
- Use the secret code `ADMIN` to become an admin.
