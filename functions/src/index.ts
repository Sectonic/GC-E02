import { onRequest } from "firebase-functions/v2/https";

export const google = onRequest(async (request, response) => {
    const { code } = request.query;

    if (typeof code !== 'string' || !code) {
        response.status(400).send('Invalid code');
        return;
    }

    const CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

    const url = new URL("https://oauth2.googleapis.com/token");
    url.searchParams.append("code", code);
    url.searchParams.append("client_id", CLIENT_ID || "");
    url.searchParams.append("client_secret", CLIENT_SECRET || "");
    url.searchParams.append("redirect_uri", "http://firebase-emulator.com:5001/dementia-assistance-network/us-central1/google");
    url.searchParams.append("grant_type", "authorization_code");

    const tokenResponse = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        }
    });

    const data = await tokenResponse.json();
    const { id_token } = data;

    const tokenUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    tokenUrl.searchParams.append("id_token", id_token || "");
    
    const verifyResponse = await fetch(tokenUrl);

    const verifyData = await verifyResponse.json();
    const { name, email, picture } = verifyData;

    const backUrl = new URL("exp://192.168.5.164:8081");
    backUrl.searchParams.append("email", email || "");
    backUrl.searchParams.append("name", name || "");
    backUrl.searchParams.append("picture", picture || "");

    response.send(`<script>window.location.replace("${backUrl}")</script>`);
});
