const StepsSection = () => {
  return (
    <div className="w-[90%] max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 mt-10">
      {/* Step 1 */}
      <div className="relative w-full sm:w-[80%] md:w-1/3">
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="flex gap-3 w-full items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              1
            </div>
            <div className="text-left">
              <strong className="text-lg">Select A Match</strong>
              <p className="text-sm text-gray-600">
                Select an upcoming match that you want to play.
              </p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-around w-full bg-gray-100 rounded-md mt-4">
            <img width={30} src="RCB.png" alt="RCB" />
            <span className="text-gray-700 text-sm font-medium">
              RCB vs CSK
            </span>
            <img width={30} src="CSK.png" alt="CSK" />
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="relative w-full sm:w-[80%] md:w-1/3">
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="flex gap-3 w-full items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              2
            </div>
            <div className="text-left">
              <strong className="text-lg">Answer 5 Questions</strong>
              <p className="text-sm text-gray-600">
                Use your cricketing skills and pick the correct answers for 5
                questions.
              </p>
            </div>
          </div>
          <div className="p-4 flex items-center justify-center w-full bg-gray-100 rounded-md mt-4">
            <img width={25} src="wickets.png" alt="wickets" />
            <span className="ml-2 text-gray-700 text-sm font-medium">
              CSK Top Wickets Taker
            </span>
          </div>
        </div>
      </div>

      {/* Step 3 */}
      <div className="relative w-full sm:w-[80%] md:w-1/3">
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg border border-gray-200">
          <div className="flex gap-3 w-full items-center">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-lg font-bold">
              3
            </div>
            <div className="text-left">
              <strong className="text-lg">Join Free Contest</strong>
              <p className="text-sm text-gray-600">
                Join free contests and win amazing rewards.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full mt-4">
            <strong className="flex items-center gap-2 p-2 text-lg font-semibold">
              Win iPhone <img width={25} src="Iphone.png" alt="iPhone" />
            </strong>
            <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md cursor-pointer mt-2">
              Join Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
