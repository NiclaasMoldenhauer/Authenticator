"use client";
import { useUserContext } from "@/context/userContext";
import useRedirect from "./hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./components/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {
  useRedirect("/login");
  const {
    logoutUser,
    user,
    handlerUserInput,
    userState,
    updateUser,
    emailVerification,
    allUsers,
    deleteUser,
  } = useUserContext();
  const { name, photo, isVerified, bio } = user;

  // open states
  const [isBioOpen, setIsBioOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);

  // functions
  const toggleBio = () => {
    setIsBioOpen(!isBioOpen);
  };

  const togglePassword = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  const closeModal = (e: { target: any; currentTarget: any; }) => {
    if (e.target === e.currentTarget) {
      setIsPasswordOpen(false);
    }
  };

  return (
    <main className="py-[2rem] mx-[10rem]">
      <header className="flex justify-between items-center">
        <h1 className="text-[2rem] font-bold">
          Hi <span className="text-blue-400">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={name}
            className="w-[40px] h-[40px] rounded-full"
          />
          <button
            onClick={togglePassword}
            className="px-3 py-2 bg-blue-400 text-white rounded-md"
          >
            Passwort ändern
          </button>
          {!isVerified && (
            <button
              className="px-3 py-2 bg-blue-400 text-white rounded-md"
              onClick={emailVerification}
            >
              Email verifizieren
            </button>
          )}
          <button
            onClick={logoutUser}
            className="px-3 py-2 bg-red-500 text-white rounded-md"
          >
            Ausloggen
          </button>
        </div>
      </header>
      <section>
        <p className="text-[#999] text-[2rem]">{bio}</p>

        <h1>
          <button
            onClick={toggleBio}
            className="px-3 py-2 bg-blue-400 text-white rounded-md"
          >
            Update Bio
          </button>
        </h1>

        {isBioOpen && (
          <form className="mt-4 px-8 py-4 max-w-[500px] w-full rounded-md">
            <div className="flex flex-col">
              <label htmlFor="bio" className="mb-1 text-[#42a5f5]">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                className="px-4 py-3 border-[2px] rounded-md outline-[#42a5f5] text-gray-800"
                onChange={(e) => handlerUserInput("bio")(e)}
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4 px-3 py-2 bg-blue-400 text-white rounded-md"
            >
              Update
            </button>
          </form>
        )}
      </section>
      {isPasswordOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-8 rounded-md shadow-md w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 text-3xl"
              onClick={togglePassword}
            >
              &times;
            </button>
            <ChangePasswordForm />
          </div>
        </div>
      )}
    </main>
  );
}
