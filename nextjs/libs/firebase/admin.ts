import { initializeApp, cert, getApps, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import serviceAccount from "@/firebaseSecretKey.json" assert { type: "json" };

export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

export const auth = getAuth();
