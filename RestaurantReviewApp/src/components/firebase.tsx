// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword,
   sendEmailVerification, EmailAuthProvider, reauthenticateWithCredential} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, deleteDoc, collection, onSnapshot, query, updateDoc } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId,
  measurementId: import.meta.env.VITE_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };

//---------------------- Authentication Functions --------------------

export const registerUser = async (email: string, password: string, username: string) => {
  const response = await createUserWithEmailAndPassword(auth, email, password);

  await updateProfile(response.user, {displayName: username});

  //Force token refresh so onIdTokenChanged fires
  await response.user.getIdToken(true);

  const uid = response.user.uid

  // Create a new document using the uid as the document id
  const data = {
    username: username,
    createdAt: new Date(),
  }

  const userRef = doc(db, "Users", response.user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(doc(db, "Users", uid), data)
  }

  return response;
};

export const verifyUser = () => {
  return sendEmailVerification(auth.currentUser!);
}

export const loginUser = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
}

export const logoutUser = () => {
  return auth.signOut();
}

export const reauthenticateUser = async (currentPassword: string) => {
  const credential = EmailAuthProvider.credential(auth.currentUser!.email!, currentPassword);
  return await reauthenticateWithCredential(auth.currentUser!, credential);
}


//---------------------- Firestore Database Functions --------------------

export const addReview = async (restaurantName: string, rating: string, category: string, favoriteDishes: string, comments: string): Promise<void> => {

  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }
  
  const data = {
    restaurantName: restaurantName,
    rating: rating,
    category: category,
    favoriteDishes: favoriteDishes,
    comments: comments
  }

  const reviewsRef = doc(db, "Users", auth.currentUser.uid, "Reviews", restaurantName); //The restaurant name is also used as the document ID
  await setDoc(reviewsRef, data);
}

export const listenToReviews = (userId: string, callback: (reviews: any[]) => void) => {

  const reviewsRef = collection(db, "Users", userId, "Reviews");
  const q = query(reviewsRef);

  return onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(reviews);
  });
}

export const listenToFriendReviews = (callback: (reviews: any[]) => void) => {

  const currentUID = auth.currentUser!.uid;

  const friendsRef = collection(db, "Users", currentUID, "FriendRequests");
  
  const allReviews: Record<string, any[]> = {};
  const reviewUnsubs: Record<string, () => void> = {};

  const unsubscribeFriends = onSnapshot(friendsRef, (snapshot) => {
    const acceptedFriends = snapshot.docs.map((doc) => doc.data()).filter((data) => data.status === "accepted").map((data) => data.fromUID);

    // Unsubscribe from removed friends' reviews
    Object.keys(reviewUnsubs).forEach((uid) => {
      if (!acceptedFriends.includes(uid)) {
        reviewUnsubs[uid]();
        delete reviewUnsubs[uid];
        delete allReviews[uid];
      }
    });

    // Add listeners for newly accepted friends' reviews
    acceptedFriends.forEach((friendUID) => {
      if (!reviewUnsubs[friendUID]) {
        const reviewsRef = collection(db, "Users", friendUID, "Reviews");

        // Get friend's username for display purposes
        const friendRequestDoc = snapshot.docs.map(doc => doc.data()).find(data => data.fromUID === friendUID);
        const friendName = friendRequestDoc?.fromUsername || "Friend";

        const unsubscribe = onSnapshot(reviewsRef, (snapshot) => {
          allReviews[friendUID] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            friendUID,
            friendName
          }));

          // Combine all friends' reviews into a single array and pass to callback
          const combinedReviews = Object.values(allReviews).flat();
          callback(combinedReviews);
        });

        reviewUnsubs[friendUID] = unsubscribe;
      }
    });

    // If no friends
    if (acceptedFriends.length === 0) {
      callback([]);
    }
    });

    return () => {
      unsubscribeFriends();
      Object.values(reviewUnsubs).forEach((unsub) => unsub());
    };

}

export const deleteReview = async (restaurantName: string): Promise<void> => {

  const reviewDocRef = doc(db, "Users", auth.currentUser!.uid, "Reviews", restaurantName);

  await deleteDoc(reviewDocRef);
}


//---------------------- Friends List Actions --------------------

export const sendFriendRequest = async (targetUID: string) => {
  if(targetUID === auth.currentUser!.uid){
    alert("You cannot send a friend request to yourself!");
    return;
  }

  const friendRequestRef = doc(db, "Users", targetUID, "FriendRequests", auth.currentUser!.uid);

  await setDoc(friendRequestRef, {
    fromUsername: auth.currentUser!.displayName,
    fromUID: auth.currentUser!.uid,
    timestamp: new Date(),
    status: "pending"
  });
}

export const acceptFriendRequest = async (requestingUID: string) => {
  const requestRef = doc(db, "Users", requestingUID, "FriendRequests", auth.currentUser!.uid);
  const ownRef = doc(db, "Users", auth.currentUser!.uid, "FriendRequests", requestingUID);

  await setDoc(requestRef, {
    fromUsername: auth.currentUser!.displayName,
    fromUID: auth.currentUser!.uid,
    timestamp: new Date(),
    status: "accepted"
  });

  await updateDoc(ownRef, {
    status: "accepted"
  });
}

export const rejectFriendRequest = async (requestingUID: string) => {
  const requestRef = doc(db, "Users", auth.currentUser!.uid, "FriendRequests", requestingUID);

  await deleteDoc(requestRef);
}

export const removeFriend = async (friendUID: string) => {
  // Remove from current user's friend list
  const friendRef1 = doc(db, "Users", auth.currentUser!.uid, "FriendRequests", friendUID);
  await deleteDoc(friendRef1);
  // Remove from friend's friend list
  const friendRef2 = doc(db, "Users", friendUID, "FriendRequests", auth.currentUser!.uid);
  await deleteDoc(friendRef2);
}

export const listenToFriendRequests = (callback: (requests: any[]) => void) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }
  
  const friendRequestsRef = collection(db, "Users", auth.currentUser.uid, "FriendRequests");
  const q = query(friendRequestsRef);

  return onSnapshot(q, (snapshot) => {
    const requests = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(requests);
  });
}
