# Description
Basic full stack blackjack game built with MongoDB, Express, React, and Node.js

Please excuse the lack of CSS, as this is one of the first apps that I built when initially learning JavaScript. I mainly wanted to practice building a full stack application that stores user data (username, password, bankroll) and executes all the appropriate game logic based on user input. I've included a few GIF demos below.

- New user login: https://s3-us-west-1.amazonaws.com/gitbuckets/blackjack/gifs/blackjack_login_newuser.gif
- Existing user login: https://s3-us-west-1.amazonaws.com/gitbuckets/blackjack/gifs/blackjack_login_existinguser.gif
- Gameplay: https://s3-us-west-1.amazonaws.com/gitbuckets/blackjack/gifs/blackjack_gameplay.gif
- Gameplay (Dealer hits blackjack): https://s3-us-west-1.amazonaws.com/gitbuckets/blackjack/gifs/blackjack_gameplay_blackjack.gif

# Setup
Run the following then open 'localhost:3000' in a Chrome browser (must have MongoDB installed).
```
npm install
npm run build
mongod
npm start
```
