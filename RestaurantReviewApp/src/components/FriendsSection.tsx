import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, listenToFriendRequests, removeFriend } from "./firebase";
import { useConfirm } from "./ConfirmModal";


export const FriendsSection = () => {

  const { currentUser } = useAuth();
  const confirm = useConfirm();
  
  const [friendRequests, setFriendRequests] = useState<any[]>([]);
  const [friendsList, setFriendsList] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = listenToFriendRequests((requests) => {
      const pending = requests.filter((request) => request.status === "pending");

      const accepted = requests.filter((request) => request.status === "accepted");

      setFriendRequests(pending);
      setFriendsList(accepted);
    });
    
    return () => {unsubscribe()};

  },[])

  const removeFriendConfirmation = async (friendUID: string, friendName: string) => {
    if(
      await confirm.confirm({
        title: "Remove Friend",
        message: 'Are you sure you want to remove "' + friendName + '" from your friends list?',
        confirmText: "Remove",
        cancelText: "Cancel",
        danger: true,
      })
    ){
      await removeFriend(friendUID);
    }
  }

  return (
    <div className="p-4 align-middle">
      <h2 className="text-3xl text-center font-bold underline mb-4">Friends</h2>

      <div className="mx-auto w-fit border-4 rounded-3xl p-4 flex flex-col items-center">
        <span className="block text-center m-2 text-black">Your User ID: <br />{currentUser?.uid}</span>
        <button className="hover:bg-gray-400 text-white px-4 py-2 rounded-md cursor-pointer ring-2 ring-black flex items-center justify-center" 
          onClick={() => navigator.clipboard.writeText(currentUser!.uid)}><img className="w-1/2 h-1/8" src="../images/CopyIcon.png"></img>
        </button>
        <line className="w-full border-t-3 border-black-300 rounded my-4" />
        <form className="flex mt-4 gap-2" autoComplete="off" onSubmit={(e) => {
          e.preventDefault();
          const targetUID = (e.target as any).elements.friendCode.value;
          sendFriendRequest(targetUID);
          (e.target as any).reset();
        }}>
          <input type="text" name="friendCode" placeholder="Enter friend's UID..." className="border border-gray-300 rounded-md px-3 py-2 outline-2 outline-blue-500" />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Add Friend</button>
        </form>
      </div>

      <ul className="mx-auto border-4 rounded-2xl p-4 m-4 w-2/3"> {/* Pending friend requests */ }
        <h2 className="text-2xl text-center underline font-bold mb-4">Friend Requests</h2>
        {friendRequests.length === 0 && (
          <p className="text-center text-gray-500">No pending friend requests</p>
        )}
        {friendRequests.map((request) => (
          <li key={request.id} className="flex justify-between items-center border border-orange-500 rounded-lg p-4 mb-2">
            <div>
              <p className="font-semibold">{request.fromUsername}</p>
            </div>
            <div className="flex gap-2">
              <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer" onClick={() => acceptFriendRequest(request.fromUID)}>Accept</button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer" onClick={() => rejectFriendRequest(request.fromUID)}>Reject</button>
            </div>
          </li>
        ))}
      </ul>
      <ul className="mx-auto border-4 rounded-2xl p-4 m-4 w-2/3"> {/* Friends list */ }
        <h2 className="text-2xl text-center underline font-bold mb-4">Your Friends</h2>
        {friendsList.length === 0 && (
          <p className="text-center text-gray-500">No friends yet</p>
        )}
        {friendsList.map((friend) => (
          <li key={friend.id} className="flex justify-between items-center border border-blue-500 rounded-lg p-4 mb-2">
            <div>
              <p className="font-semibold">{friend.fromUsername}</p>
            </div>
            <button className="cursor-pointer" onClick={() => removeFriendConfirmation(friend.fromUID, friend.fromUsername)}><img className="w-6 h-6" src="../images/RedX.png"></img></button>
          </li>
        ))}
      </ul>
    </div>
  )
}
