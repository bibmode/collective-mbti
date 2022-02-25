import { Icon } from "@iconify/react";
import Blob from "../Blob";
import Header from "../Header";

const UserMainPage = ({ session }) => {
  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* header */}
      <Header link={false} />

      {/* main */}
      <div className="border-y border-gray-500 flex items-center flex-col overflow-x-hidden">
        <div className="relative container sm:border-x border-gray-500 flex justify-center px-0 py-4">
          {/* profile */}
          <div className="py-5 flex flex-col items-center w-full ">
            <img
              className="rounded-full border-2 border-orange-500"
              src={session.user.image}
              alt="user display picture"
            />

            <h2 className="mt-8 mb-3 uppercase text-2xl font-semibold">
              {session.user.name}
            </h2>

            <div className="flex justify-center border-y border-gray-500 w-full px-4">
              <button className="uppercase px-5 py-2 border-r border-gray-500">
                following: 20
              </button>
              <button className="uppercase px-5 py-2">followers: 2</button>
            </div>

            <button className="bg-gray-800 flex items-center py-2 px-4 text-orange-500 mt-8">
              <Icon className="mr-2 text-xl" icon="eva:edit-fill" />
              Edit profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMainPage;
