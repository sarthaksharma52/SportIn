# SportIn

**SportIn** is a MERN stack application designed to connect sportsmen with their academies and provide the latest news regarding their trials. Inspired by LinkedIn, SportIn serves as a dedicated platform for the sports community to network, explore opportunities, and stay updated with relevant information.

## Features

- **Profile Creation**: Users can create personalized profiles showcasing their achievements, skills, and preferences.
- **Academy Connections**: Sports academies can connect with athletes and manage their networks.
- **Trial Notifications**: Stay informed about the latest trials and recruitment opportunities.
- **News Feed**: Get the latest updates and announcements in the sports world.
- **Networking**: Connect with other sports enthusiasts and professionals.

## Technologies Used

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: Redux (optional, if implemented)
- **Styling**: CSS/SCSS

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sarthaksharma52/sportin.git
   cd sportin
   ```

2. Install dependencies:
   ```bash
   # For backend
   cd backend
   npm install

   # For frontend
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory with the following:
     ```env
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     PORT=5000
     ```

4. Start the application:
   ```bash
   # Start the backend
   cd backend
   npm start

   # Start the frontend
   cd ../frontend
   npm start
   ```

5. Open the app in your browser at `http://localhost:3000`.

## Folder Structure

- `backend/`: Contains the server-side code, API routes, and database models.
- `frontend/`: Contains the React.js code for the user interface.

## Roadmap

- [ ] Add real-time messaging for better communication.
- [ ] Implement a recommendation system for trials and academies.
- [ ] Add notifications for important updates.
- [ ] Optimize the platform for mobile devices.

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add your message"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For any questions or feedback, feel free to reach out:

- **Name**: Sarthak Sharma
- **GitHub**: [sarthaksharma52](https://github.com/sarthaksharma52)

---

Start building connections and exploring opportunities with **SportIn**!

