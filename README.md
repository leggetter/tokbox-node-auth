# An authentication endpoint for TokBox using Node.js

This endpoint **does not** actually do any authentication against an auth system. It simply allows the auth request e.g. fetches a session or a token.

**Please** ensure that if you use this in production you do some real authentication against the request.

## Getting Started

This app was built to be run via `foreman`.

### Procfile

This example comes with a `Procfile`.

### Environment Variables via `.env`

You need to add some environmental variables to get it running using `foreman`

    OPENTOK_KEY=<KEY>
		OPENTOK_SECRET=<SECRET>
		ALLOWED_HOST=*

To run on Heroku you'll need to add these variables via `heroku config:add <NAME>=<VALUE>`.