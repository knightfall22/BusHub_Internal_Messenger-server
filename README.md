# Internal Messaging System - Node.js Server

This Node.js server is built for an internal messaging system. It performs authentication functions using GetStream and also sends messages to offline users using Twilio.

## Prerequisites

- Node.js and npm should be installed on your system.
- Obtain API keys and credentials from GetStream and Twilio.

## Installation

1. Clone the repository:


2. Install dependencies:


3. Configure API keys:

- Open the server.js file.
- Replace 'STREAM_API_KEY', 'STREAM_API_SECRET'and 'STREAM_APP_ID' with your GetStream API key, App Id, secret.
- Replace 'TWILIO_ACCOUNT_SID' and 'TWILIO_AUTH_TOKEN' with your Twilio account SID and auth token.

## Usage

1. Start the server:

2. The server will start running on port 3000.

3. Authentication:

- Make a POST request to `http://localhost:3000/auth` the required JSON payload containing for the Auth path you wish to send a request to.
- The server will generate a user token using GetStream and return it in the response.

4. Sending messages:

- Make a POST request to `http://localhost:3000/` with a JSON payload containing the necessary message details.
- The server will send the message to the recipient using Twilio, even if they are offline.

## Contributing

Contributions are welcome! Feel free to open issues and submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).


