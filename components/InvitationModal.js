import { Icon } from "@iconify/react";
import absoluteUrl from "next-absolute-url";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import shortid from "shortid";

const InvitationModal = ({ setInvitation }) => {
  const [generate, setGenerate] = useState(true);
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [invitationUrl, setInvitationUrl] = useState(null);
  const [copy, setCopy] = useState(false);

  const session = useSession();
  const { origin } = absoluteUrl();

  const handleInput = (e) => {
    if (e.target.value.trim().length) {
      const relationship = document.getElementById("relationship-value").value;

      setRelation(relationship);
      setName(e.target.value.trim());
      setGenerate(false);
    } else {
      setGenerate(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopy(true);
  };

  const generateUrl = () => {
    const userId = session.data.user.sub;
    const testId = shortid.generate();
    setInvitationUrl(
      `${origin}/personality-test/invite-test/?invited=${name}&relation=${relation}&user=${userId}&test=${testId}`
    );
  };

  useEffect(() => {
    console.log(invitationUrl);
  }, [invitationUrl]);

  return (
    <div className="w-full h-screen absolute flex justify-center">
      {/* modal content */}
      <div className="fixed z-50 w-full sm:max-w-lg h-full sm:h-[60%] sm:max-h-[490px] flex flex-col justify-between self-center bg-gradient-to-b from-white to-orange-50">
        {/* top bar */}
        <div className="h-8 w-full border-b border-gray-700">
          <div className="hidden sm:block mx-8 h-full flex-1 border-x border-gray-700"></div>
        </div>

        {/* main content */}
        <div className="relative px-4 sm:px-0 sm:mx-8 mt-24 sm:mt-0 flex-1 flex flex-col justify-start items-center sm:border-x border-gray-700">
          <h2 className="uppercase text-2xl font-semibold mt-14">
            {invitationUrl
              ? `Give this test link to ${name}`
              : "INVITE SOMEONE TO TYPE YOU"}
          </h2>

          {!invitationUrl && (
            <>
              {/* form */}

              <div className="mt-12 max-w-md w-11/12 flex flex-wrap justify-between">
                <label className="w-7/12">
                  <input
                    type="text"
                    className="mt-0 py-2 
                    block
                    w-full
                    bg-transparent
                    border-0 border-b-2 border-gray-700
                    focus:ring-0 focus:border-orange-500 focus:outline-none
                  "
                    placeholder="Name of Receiver"
                    onChange={handleInput}
                  />
                </label>
                <label className="w-4/12">
                  <select
                    id="relationship-value"
                    className="
                    block
                    w-full
                    mt-1 py-2
                    bg-stone-200
                    border-transparent
                    focus:border-gray-500 focus:bg-white focus:ring-0 focus:outline-orange-500
                  "
                  >
                    <option value="Friend">Friend</option>
                    <option value="Family">Family</option>
                    <option value="Co-worker">Co-worker</option>
                    <option value="Romantic">Romantic</option>
                  </select>
                </label>
              </div>
            </>
          )}

          {invitationUrl ? (
            <>
              <label className="relative w-11/12 flex items-center bg-white px-3 py-2 mt-14 border-2 border-gray-700">
                <p className="absolute bottom-full  right-0 mb-1 text-sm text-gray-500">
                  {copy ? "Copied to clipboard!" : "Copy"}
                </p>
                <input
                  className="w-full focus:outline-none"
                  type="text"
                  value={invitationUrl}
                  readOnly
                />
                <button
                  className="pl-2 text-gray-400 hover:text-gray-700 "
                  onClick={handleCopy}
                >
                  <Icon icon="bxs:copy-alt" />
                </button>
              </label>
              <p className="text-center mt-5 text-gray-500">
                This link is effective for{" "}
                <u className="inline">ONE PERSON ONLY</u> after his/her answers
                to the test are sent
              </p>
            </>
          ) : (
            <button
              type="button"
              className="flex items-center text-xl mt-16 border-b-2 border-gray-700 hover:text-orange-500 hover:border-orange-500 
            disabled:text-gray-400 disabled:border-gray-400"
              disabled={generate}
              onClick={generateUrl}
            >
              <span className="mr-2">Generate URL</span>
              <Icon icon="entypo:cycle" />
            </button>
          )}

          <button
            className="absolute bottom-8 uppercase text-xl text-white bg-orange-500 px-9 py-2 hover:bg-orange-600 transition ease-in duration-200"
            onClick={() => setInvitation(false)}
          >
            close
          </button>
        </div>

        {/* bottom bar */}
        <div className="h-8 w-full border-t border-gray-700">
          <div className="hidden sm:block mx-8 h-full flex-1 border-x border-gray-700"></div>
        </div>
      </div>

      {/* overlay */}
      <div
        className="fixed top-0 z-40 inset-0 bg-opacity-50 overflow-hidden h-full w-full backdrop-blur-sm bg-zinc-700/30"
        onClick={() => setInvitation(false)}
      />
    </div>
  );
};

export default InvitationModal;
