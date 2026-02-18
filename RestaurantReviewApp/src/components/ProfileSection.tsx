import { useState } from "react"
import { deleteUser, updatePassword } from "firebase/auth"
import { auth, reauthenticateUser } from "./firebase"
import { useConfirm } from "./ConfirmModal"

export const ProfileSection = () => {

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [deletionPassword, setDeletionPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const confirm = useConfirm()

    const confirmDelete = async () => {
        if(
            await confirm.confirm({
              title: "Delete Account",
              message: 'Are you sure you want to delete your account?',
              confirmText: "Delete",
              cancelText: "Cancel",
              danger: true,
            })
          ){
            await handleDeleteAccount();
          }
      }

    const confirmUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if(
            await confirm.confirm({
              title: "Update Password",
              message: 'Are you sure you want to update your password?',
              confirmText: "Update",
              cancelText: "Cancel",
              danger: false,
            })
          ){
            await handleChangePassword();
          }
      }

    const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {
      alert("New passwords do not match")
      return
    }

    try {
      setLoading(true)
      await reauthenticateUser(currentPassword)
      await updatePassword(auth.currentUser!, newPassword)

      alert("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      console.error(error)
      alert(error.message || "Failed to update password")
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      setLoading(true)
      await reauthenticateUser(deletionPassword)
      await deleteUser(auth.currentUser!)

      alert("Account deleted")
      // TODO: redirect to login / landing page
    } catch (error: any) {
        console.error(error)
        if (error.code === "auth/wrong-password") {
            alert("Incorrect password")
        }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
        <div className="mx-auto flex max-w-3xl flex-col p-4 items-center space-y-10">
          <section className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-gray-900">Your Profile</h1>
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Username:</span>{" "}
                {auth.currentUser?.displayName}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Email:</span>{" "}
                {auth.currentUser?.email}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Account created:</span>{" "}
                {auth.currentUser?.metadata.creationTime}
              </p>
            </div>
          </section>
          {/* Change Password */}
          <section className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Change Password</h2>

              <form onSubmit={confirmUpdatePassword} className="mt-6 space-y-4">
                  <input
                      type="password"
                      placeholder="Current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                  />

                  <input
                      type="password"
                      placeholder="New password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                  />

                  <input
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 
                                  focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                      required
                  />

                  <button type="submit" disabled={loading} className="mt-2 w-full rounded-lg bg-blue-600 px-4 py-2
                                                                      text-sm font-semibold text-white transition
                                                                      hover:bg-blue-700
                                                                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                                                                      disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                      Update Password
                  </button>
              </form>
          </section>

          {/* Delete Account */}
          <section className="max-w-md rounded-xl border border-red-200 bg-red-50/50 p-6">
              <h2 className="text-lg font-semibold text-red-700">Delete Account</h2>

              <p className="mt-1 text-sm text-red-600">Deleting your account is permanent and cannot be undone</p>

              <div className="mt-4 space-y-3">
                  <input
                      type="password"
                      placeholder="Enter password to confirm"
                      value={deletionPassword}
                      onChange={(e) => setDeletionPassword(e.target.value)}
                      className="w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400
                              focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                      required
                  />

                  <button onClick={confirmDelete} disabled={loading} className="w-full rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white
                                                                                      transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 
                                                                                      focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer">
                      Delete Account
                  </button>
              </div>
          </section>
      </div>
    </>
  )
}
