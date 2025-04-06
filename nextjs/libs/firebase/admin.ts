import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
// import serviceAccount from "@/firebaseSecretKey.json" assert { type: "json" };

const serviceAccount = {
  type: "service_account",
  project_id: "vrchatgram",
  private_key_id: "e0397cfeb65d31f62b20bba06b047cc19997d38a",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCeXc6/wirb3Y1L\nDxpaP2iN9/Bj5vAgBq2ZtRtSM83F5tsmMojNK8Jn3tPBSUqpEGLwEgtrhxBQxA+g\n8aL5Z7yv8yjxQyd8P3GVhHfqkMMq2k4ER7oYnVAPRU+olubhOxJz8W/OZHdajXLG\nymg/A/cr1qM7nXfj/gaxU0HSXPCa0JJew12hDNG1+sLJIC+VjR6hpKSZnBf/oQ8p\n9iOrioPJw++HaSXDQ82H2VJy6/deaFFWkpNQQ2Qb3ZXA9IuW0g0/hRpVwlRbTKpz\nKffw0zPUc93yUupRorlBfUrJjeU1tEAash8BJqzY14QTrDnMdF1OrkpRrVz9SjlH\nttSW5j+3AgMBAAECggEABLzN8GpYLvMWCR4f4QZ3xwu7OHUQJI/KUKIHJIofqGvw\nnhxxsrGRw4VxoVA4gwUriiDd7g7itHbCoxAO8A19maxIQpoS40BgfPRMu6i22JwA\nTs9nkLcS+LdPbN/0phDG3IqrZQvk5AXskZsrbdlMQPSKz67Oy576mIri71TlO5o1\nqYc3C3vNw5gu7V3ESTsoWJ/VtDJYZbqbV4v6lIwk5ZqwFxFeTkhTbDa/aTjh5Gfv\nEtoSxuzSFHCkPEGFKjOXObK5/Ahv/ColkquuA2xVqEaVMhGMIBz+pFCRO8G0EkJT\nDFP8HrZlN7jq1b5EQE1yTJm4ybLoH780QVuNXLKtAQKBgQDLQWT+u+qSFDMCD4IF\naEO+X13YLHnC8rtZTxm3sVJEVQeMWF8EQ8ldYjCULZvuAUCcKJprF2OYA+TPZsGg\nE8oLUWKiTyZcaPiKl/cazv7OGHSH7CovcylQu8QYEo0RwFu31dJaTcp8WJ9VcrrW\noJ0fPju6o3CFsRBBnuuBnLhnxQKBgQDHdlwRPcNN6tK0lE3cqHwCB0Re15vQGJ9f\nW7c7/um2l5xOM5WvnGssR/y+jaGY5lF0rTFdBNXYvjKO58sb2Bp8J+QB8AIGY1sj\n5KVDnxXtfUEg8TjYCmkiteEBMVO4neCdMq9PNl/az0vnoW0EpX2fgM90felzpLBA\nkdZ+nAUFSwKBgFz59hQcq+nUuZyYsXZ9wndkMo5/kddep9rrtyzzPVmqt8A4cIaH\n56YDE4vE7U5LXl3QqQqR8WoJZfKF486xHrxcp0zt/fNJxV/Isi2eQKrQPwYqPwXj\nnSOkMMh+O+/B2XLXqdjLOvP0qjYxPEyPvjAbjMEMoJ1XaMNLyhlJMoWtAoGBAIlO\nzkREKz1pKJGNAiijh3JyBDvx2t4fBR9E6NeRPNwodD5VPnb8i76Y88FNiG/UJUDX\ntQKewIOLMwyzPlu1oU3UvB4lVY+GOAh2btolGpg5QGtoA0SdrhBp+jGy/jo53JT6\nfjpeaRAc4djbhEvNjLQPnUBJKTslpPteKbVQvBgPAoGBAIk4YdP6wqn7MhI/S4wv\n9WHMgvqssiu9fhiPGbShw86addyiqr1gtfVjQjktjSkDBz3poT4uuHwGj8f91zNu\nx0DAYlRp0liT/pbE4wek6auPxvmpkMVTi5Qj0003QRSJoTGIKNAsr9g9joCPR33N\nHiA0Hf6Azrmen6k6VVSmT46f\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-fbsvc@vrchatgram.iam.gserviceaccount.com",
  client_id: "109752799037841252223",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40vrchatgram.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

export const auth = getAuth();
