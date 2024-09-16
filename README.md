# Twit'Hair

## Overview

`twi-hair-bot` is a bot that tweets daily information about hair salons. It retrieves data from a JSON file and posts it to Twitter using the Twitter API.

[X Account](https://x.com/twit_hair_bot)

[Dataset used](https://www.data.gouv.fr/fr/reuses/les-coiffeurs-sont-des-blagueurs/)

## Configuration

Store all your API keys in the `.env` file:

## Overview

`twi-hair-bot` is a bot that tweets daily information about hair salons. It retrieves data from a JSON file and posts it to Twitter using the Twitter API.

Dataset used: [Les coiffeurs sont des blagueurs](https://www.data.gouv.fr/fr/reuses/les-coiffeurs-sont-des-blagueurs/)

## Configuration

Store all your API keys in the `.env` file:

- `GOOGLE_MAPS_API_KEY`: Your Google Maps API key, used to get the street view of the hair salon.
- `TWITTER_APP_SECRET`: The secret key for your Twitter application, used for authentication.
- `TWITTER_APP_KEY`: The API key for your Twitter application, used for authentication.
- `TWITTER_ACCESS_TOKEN`: The access token for your Twitter account, used to post tweets.
- `TWITTER_ACCESS_SECRET`: The secret token for your Twitter account, used to post tweets.

## Usage

To generate a daily tweet, run:

```typescript
npx ts-node src/index.ts
```

## Automation

A GitHub Action is scheduled to post a new hair salon tweet every day.
