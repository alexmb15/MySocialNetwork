
# MySocialNetwork

MySocialNetwork is a social network created using React and Redux, with TypeScript typing.

## Features

- **Authentication**: Registration and login.
- **User Profile**: Edit profile, publish posts.
- **Dialogs**: Exchange messages with other users.
- **User List**: View and search for other users.
- **Music**: Section for adding and playing music.
- **Sidebar**: Navigation menu for easy access to various sections of the app.

## Installation

### Prerequisites

Make sure you have the following software installed:

- Node.js (version 14 or higher)
- npm or yarn

### Clone the Repository

```bash
git clone https://github.com/alexmb15/MySocialNetwork.git
cd MySocialNetwork
```

### Install Dependencies

Use npm or yarn to install dependencies:

```bash
npm install
# or
yarn install
```

### Run the Application

To run the application in development mode, use:

```bash
npm start
# or
yarn start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

- **src**: Main directory with source code
  - **components**: React components
  - **redux**: Files related to Redux (reducers, actions, store)
  - **api**: API requests
  - **utils**: Utility functions
  - **types**: TypeScript types

## Common Errors and Solutions

### Error: TS2769: No overload matches this call

This error occurs due to type mismatches when calling functions. Ensure that all reducers and types are correctly defined and match the expected ones.

Solution:
1. Check the types of reducers.
2. Ensure that middleware and enhancers are correctly applied.
3. Update TypeScript and related types.

### Installing dependencies with the `--legacy-peer-deps` flag

If dependency conflicts occur when installing packages, use the `--legacy-peer-deps` flag:

```bash
npm install --legacy-peer-deps
```

## Contributing

If you want to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push your changes to your branch (`git push origin feature/YourFeature`).
5. Create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

If you have any questions or suggestions, please contact the project author via GitHub Issues.

