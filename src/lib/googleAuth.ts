import { initializeApp } from "firebase/app";
import { 
  getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, 
  User as FirebaseUser, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  sendEmailVerification, sendPasswordResetEmail, updateProfile 
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// @ts-ignore
import firebaseConfig from "../../firebase-applet-config.json";

// Define dynamic config that supports customized production deployments (e.g., Netlify, Vercel)
const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || firebaseConfig.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || firebaseConfig.authDomain,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || firebaseConfig.projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || firebaseConfig.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || firebaseConfig.messagingSenderId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || firebaseConfig.appId,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || firebaseConfig.measurementId
};

const databaseId = import.meta.env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || firebaseConfig.firestoreDatabaseId;

// Initialize Firebase
const app = initializeApp(config);
export const auth = getAuth(app);
export const db = getFirestore(app, databaseId);

// Google Sign In Provider
export const provider = new GoogleAuthProvider();

// In-memory cache for dynamic access token
let cachedAccessToken: string | null = null;
let isSigningIn = false;

// Initialize auth state and retrieve/set cached token
export const initAuth = (
  onAuthSuccess?: (user: FirebaseUser, token: string | null) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const registerEmailPassword = async (email: string, password: string, fullName: string) => {
  const result = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(result.user, { displayName: fullName });
  
  // Store Full Name in Firestore
  try {
    await setDoc(doc(db, "users", result.user.uid), {
      fullName,
      email,
      createdAt: new Date().toISOString()
    });
  } catch (err) {
    console.warn("Failed to store user profile in Firestore", err);
  }

  try {
    await sendEmailVerification(result.user);
  } catch (e) {
    console.warn("Email verification could not be sent.");
  }
  return result.user;
};

export const fetchUserProfile = async (uid: string) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (err) {
    console.warn("Failed to fetch user profile", err);
  }
  return null;
};

export const loginEmailPassword = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  return result.user;
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    console.warn("Firebase reset password failed, falling back to local simulation.", err);
  }
};

// Start Google sign-in workflow
export const googleSignIn = async (): Promise<{ user: FirebaseUser; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // Might not always have a token if it's just standard login without extra scopes requested previously
    if (credential?.accessToken) {
      cachedAccessToken = credential.accessToken;
    }
    
    // Attempt to store in Firestore if it's first time or simply updating
    try {
      if (result.user.displayName) {
        await setDoc(doc(db, "users", result.user.uid), {
          fullName: result.user.displayName,
          email: result.user.email,
          updatedAt: new Date().toISOString()
        }, { merge: true });
      }
    } catch (err) {
      console.warn("Failed to update Firestore profile during Google Sign In", err);
    }

    return { user: result.user, accessToken: cachedAccessToken || "" };
  } catch (error) {
    console.error("Gmail Google Sign-In error:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Retrieve token or clear
export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logoutAuth = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

export const logoutGmail = logoutAuth;

// Interfaces for Gmail API integration
export interface GmailMessageSummary {
  id: string;
  threadId: string;
  snippet: string;
  from: string;
  subject: string;
  date: string;
  body?: string;
  isNexternRelated: boolean;
}

// Fetch recent emails from Gmail API (only works if user signed in with Google and granted scopes)
export const fetchGmailThreads = async (
  accessToken: string,
  query = ""
): Promise<GmailMessageSummary[]> => {
  try {
    const qParam = encodeURIComponent(query ? query : "label:INBOX");
    const listUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=10&q=${qParam}`;
    
    const response = await fetch(listUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return [];
    }

    const listData = await response.json();
    if (!listData.messages || !Array.isArray(listData.messages)) {
      return [];
    }

    const resolvedMessages = await Promise.all(
      listData.messages.map(async (msg: { id: string; threadId: string }) => {
        try {
          const detailUrl = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=metadata&metadataHeaders=Subject&metadataHeaders=From&metadataHeaders=Date`;
          const detailRes = await fetch(detailUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: "application/json"
            }
          });

          if (!detailRes.ok) return null;
          const detail = await detailRes.json();

          const headers = detail.payload?.headers || [];
          const subject = headers.find((h: any) => h.name.toLowerCase() === "subject")?.value || "(No Subject)";
          const from = headers.find((h: any) => h.name.toLowerCase() === "from")?.value || "(Unknown)";
          const date = headers.find((h: any) => h.name.toLowerCase() === "date")?.value || "";

          const combinedLower = `${subject} ${detail.snippet}`.toLowerCase();
          const isNexternRelated = combinedLower.includes("nextern") || 
            combinedLower.includes("internship");

          return {
            id: msg.id,
            threadId: msg.threadId,
            snippet: detail.snippet || "",
            from,
            subject,
            date,
            isNexternRelated
          } as GmailMessageSummary;
        } catch (err) {
          return null;
        }
      })
    );

    return resolvedMessages.filter((m): m is GmailMessageSummary => m !== null);
  } catch (error) {
    return [];
  }
};

export const sendGmailMessage = async (
  accessToken: string,
  to: string,
  subject: string,
  bodyHtml: string
): Promise<{ id: string; threadId: string }> => {
  try {
    const base64EncodeUnicode = (str: string) => {
      return btoa(
        encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
          String.fromCharCode(parseInt(p1, 16))
        )
      );
    };

    const utf8Subject = `=?utf-8?B?${base64EncodeUnicode(subject)}?=`;
    const mimeLines = [
      `To: ${to}`,
      "MIME-Version: 1.0",
      "Content-Type: text/html; charset=utf-8",
      `Subject: ${utf8Subject}`,
      "",
      bodyHtml
    ];

    const rawMime = mimeLines.join("\r\n");
    const encodedMime = base64EncodeUnicode(rawMime)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ raw: encodedMime })
    });

    if (!response.ok) {
      throw new Error(`Gmail API messages.send failed`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
