const GITHUB_OAUTH_URL = 'https://github.com/login/oauth/authorize';
const GITHUB_TOKEN_URL = 'https://github.com/login/oauth/access_token';
const GITHUB_API_URL = 'https://api.github.com/user';
const GITHUB_API_COMMON_URL = 'https://api.github.com';
const SCOPE = 'user';
const CLIENT_ID = 'd4bece7ee7442e0a5422';
const CLIENT_SECRET = 'e25c90465ca38bb07186590215127d1892e7c2c9';

const config = {
    github: {
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        scope: SCOPE,
        oAuthUrl: `${GITHUB_OAUTH_URL}?client_id=${CLIENT_ID}&scope=${SCOPE}`,
        tokenUrl: GITHUB_TOKEN_URL,
        apiUrl: GITHUB_API_URL,
        commonApiUrl: GITHUB_API_COMMON_URL
    }
}

export default config;