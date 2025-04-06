import { getFirebaseAuth } from "next-firebase-auth-edge";

export const {
  getCustomIdAndRefreshTokens,
  verifyIdToken,
  createCustomToken,
  handleTokenRefresh,
  getUser,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
  verifyAndRefreshExpiredIdToken,
  setCustomUserClaims,
} = getFirebaseAuth({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
    clientEmail: process.env.NEXT_PUBLIC_CLIENT_EMAIL!,
    privateKey: process.env.NEXT_PUBLIC_PRIVATE_KEY!,
  },
});
