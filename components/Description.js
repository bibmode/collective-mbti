const Description = ({ description, mbtiType }) => {
  return (
    <div className="py-3 px-4 lg:max-w-[350px] lg:h-fit border-b border-gray-800 text-left">
      {mbtiType && (
        <p className="hidden lg:block border-b border-gray-800 -mx-4 -mt-2 px-4 font-semibold ">
          Result: {mbtiType}
        </p>
      )}
      <p className="text-gray-500">
        Extraverted • iNtuitive • Thinking • Perceiving
      </p>
      <p className="py-7">
        {description.description}
        <a
          className="text-orange-500"
          href={description.source}
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          - source
        </a>
      </p>
      <ul className=" container text-orange-500 underline list-disc inline-block px-5">
        <li>
          <a
            href="https://personalityjunkie.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            personalityjunkie.com
          </a>
        </li>
        <li>
          <a
            href="https://www.truity.com/myers-briggs/about-myers-briggs-personality-typing"
            target="_blank"
            rel="noopener noreferrer"
          >
            truity.com
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Description;
