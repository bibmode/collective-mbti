import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div>
      {/* header */}
      <div className="relative flex justify-between container mx-auto border-x border-gray-500 pt-16 pb-8 ">
        <div>
          <h1 className="relative text-8xl text-orange-500 uppercase font-bold text-primary max-w-sm">
            collective mbti
            <div className="absolute w-4 h-4 bg-gray-900 bottom-3.5 ml-60 mb-0.5" />
          </h1>
          <p className="text-md py-6 absolute top-36 left-64">
            GET OBJECTIVE MBTI RESULTS FROM THE OPINIONS OF THOSE WHO KNOW YOU
          </p>
        </div>

        {/* login button */}
        <div className="flex flex-col items-end justify-between mb-4">
          <button className="flex items-center justify-center text-md px-5 bg-gray-900 py-2.5 text-orange-400 mt-2.5">
            Login with
            <Icon className="ml-1" icon="flat-color-icons:google" />
          </button>

          <div className="flex justify-between w-20 px-0.5">
            <button className="w-8 h-8 bg-gray-900 rounded-full border-2 border-gray-900"></button>
            <button className="w-8 h-8 bg-orange-500 rounded-full border-2 border-gray-900"></button>
          </div>
        </div>
      </div>

      {/* main content */}

      <div className=" border-y border-gray-500 flex items-center flex-col">
        <div className="relative container border-x border-gray-500 flex justify-center py-14">
          <h4 className="absolute -left-8 top-80 -rotate-90 font-semibold text-gray-900">
            © 2022 | bibmode
          </h4>

          {/* social bar */}
          <div className="absolute right-6 top-8 flex flex-col items-center">
            <p>SHARE TO</p>
            <a
              href="#"
              target="_blank"
              className="group rounded-full border-2 border-gray-900 p-3 mt-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
            >
              <Icon
                icon="cib:facebook-f"
                className="group-hover:text-orange-500 transition ease-in duration-200"
              />
            </a>
            <a
              href="#"
              target="_blank"
              className="group rounded-full border-2 border-gray-900 p-3 mt-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
            >
              <Icon
                icon="cib:twitter"
                className="group-hover:text-orange-500 transition ease-in duration-200"
              />
            </a>
            <a
              href="#"
              target="_blank"
              className="group rounded-full border-2 border-gray-900 p-3 mt-3 hover:border-orange-500 transition ease-in duration-200 cursor-pointer"
            >
              <Icon
                icon="cib:instagram"
                className="group-hover:text-orange-500 transition ease-in duration-200"
              />
            </a>
          </div>

          {/* center content */}
          <div className="max-w-3xl">
            {/* test buttons */}
            <div className="flex ">
              <button className="px-8 py-8 text-left bg-orange-500 hover:bg-orange-600 text-white transition ease-in duration-200">
                <h2 className="text-3xl max-w-xs pr-4">
                  TAKE THE TEST YOURSELF
                </h2>
                <p>Think you can type yourself objectively?</p>
              </button>
              <button className="border-r border-gray-500 px-8 py-8 text-left hover:bg-orange-200 hover:border-white transition ease-in duration-200">
                <h2 className="text-3xl max-w-xs pr-4">
                  GET FRIENDS TO TYPE YOU
                </h2>
                <p>What is your MBTI type according to friends?</p>
              </button>
            </div>

            {/* description */}
            <p className="mt-20 leading-loose">
              Maybe you’ve taken the MBTI test before and you think to
              yourself... is this an accurate result I’m getting or did my self
              bias and vanity completely overpowered all the objectivity I have
              left to view myself in an honest light while taking the test?
            </p>
            <p className="mt-8 leading-loose">
              Yes? Then this test is for you and for your unfortunate friends
              who has some extra 15 minutes to spare for this crap.{" "}
              <b>
                {" "}
                See how they view you as and get the accumulated data to get
                your most objective mbti test result,{" "}
              </b>
              unless if you’ve been very fake to everyone then you can just take
              the test on your own. IDK what to tell you.
            </p>
            <p className="mt-8 leading-loose">
              Oh what’s that? You answered no because you have a life and an
              identity outside MBTI and is a normal functioning citizen of the
              world? Good for you, but you’ve already read this far so you might
              as well take the test, what the hell dude.
            </p>

            {/* promotion */}
            <div className="my-24 relative">
              <img
                src="/images/landing-page-capture.png"
                alt="promotion capture"
                className="-ml-12"
              />

              <div className="sm:absolute top-28 -right-12 flex flex-col items-end">
                <div className="max-w-lg px-8 pt-8 pb-14 backdrop-blur-sm bg-gradient-to-l from-orange-400/50 to-orange-100/30 drop-shadow-2xl">
                  <h3 className="text-2xl uppercase text-right leading-relaxed font-semibold text-gray-700 border-t-4 border-gray-700 pt-3">
                    Get insights of your personality from the persepective of
                    the people around you
                  </h3>
                </div>
                <button className="text-2xl hover:bg-orange-600 text-white transition ease-in duration-200 bg-orange-500 px-14 mt-6 py-4">
                  SIGN UP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
