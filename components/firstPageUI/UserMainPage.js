import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import About from "../About";
import Blob from "../Blob";
import Header from "../Header";
import ResultsDescriptions from "../ResultsDescriptions";
import Typology from "../Typology";

const UserMainPage = ({ user, self }) => {
  const [navigation, setNavigation] = useState(0);

  return (
    <div className="relative overflow-x-hidden min-h-screen">
      {/* header */}
      <Header link={false} />

      {/* main */}
      <div className="border-y border-gray-500 overflow-x-hidden">
        <div className="relative container sm:border-x border-gray-500 flex flex-col lg:flex-row justify-center px-0 lg:container pt-4">
          {/* profile */}
          <div className="py-5 flex flex-col items-center w-full lg:max-w-xs xl:max-w-[380px]">
            <img
              className="rounded-full border-2 border-orange-500 w-20 h-20"
              src={user.image}
              alt="user display picture"
            />

            <h2 className="mt-6 mb-3 uppercase text-2xl font-semibold">
              {user.name}
            </h2>

            <div className="flex justify-center border-y border-gray-500 w-full px-4 text-sm">
              <button className="uppercase px-5 py-2 border-r border-gray-500">
                following: 20
              </button>
              <button className="uppercase px-5 py-2">followers: 2</button>
            </div>

            <button className="bg-gray-800 flex items-center py-2 px-4 text-orange-500 mt-6">
              <Icon className="mr-2 text-xl" icon="eva:edit-fill" />
              Edit profile
            </button>

            <div className="hidden lg:block container lg:px-0 pt-4 flex flex-col justify-between">
              {/* entry */}
              <About />
            </div>
          </div>

          {/* navbar */}
          <div className="border-b-2 flex justify-center border-gray-300 font-semibold mt-10 lg:hidden">
            <div className="relative flex justify-center w-fit">
              <div className="py-1.5">
                <input
                  type="radio"
                  name="navigation"
                  id="typology"
                  className="hidden peer"
                  defaultChecked
                  onChange={(e) => e.target.checked && setNavigation(0)}
                />
                <label
                  htmlFor="typology"
                  className="peer-checked:text-orange-500 uppercase px-3 py-1.5 mx-4 text-gray-500"
                >
                  typology
                </label>
              </div>

              <div className="py-1.5">
                <input
                  type="radio"
                  name="navigation"
                  id="about"
                  className="hidden peer"
                  onChange={(e) => e.target.checked && setNavigation(1)}
                />
                <label
                  htmlFor="about"
                  className="peer-checked:text-orange-500 uppercase px-3 py-1.5 mx-4 text-gray-500"
                >
                  about
                </label>
              </div>

              {/* color indicator */}
              <div
                className="h-1 w-24 bg-orange-500 absolute"
                style={{
                  left: `${navigation ? "auto" : "1.3rem"}`,
                  right: `${!navigation ? "auto" : "0.39rem"}`,
                  bottom: "-1.5px",
                }}
              />
            </div>
          </div>

          {/* sections */}
          {navigation ? (
            <div className="lg:hidden container pt-4 flex flex-col justify-between">
              {/* entry */}
              {/* <About /> */}
            </div>
          ) : (
            <div className="lg:hidden container py-12">
              {/* entry */}
              <Typology customName="phone1" />
            </div>
          )}

          <div className="hidden lg:block container py-12 lg:pt-0 lg:flex-1 lg:max-w-2xl xl:px-16">
            {/* header */}
            <div className="py-3 mb-9 border-b border-gray-800 hidden lg:block">
              <h4 className="mr-1 font-semibold text-md flex-1">Typology</h4>
            </div>
            {/* entry */}
            <Typology customName="phone2" />
          </div>

          {/* DESCRIPTIONS */}
          <div className="hidden lg:block">
            <ResultsDescriptions customName="desktop" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMainPage;
