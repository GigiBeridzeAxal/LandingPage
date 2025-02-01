import { useState } from "react";

const fantasyData = {
  "Top Batsmen": {
    T20: [
      { label: "For Each Run", points: "+1 pts" },
      { label: "4 Bonus", points: "+4 pts" },
      { label: "6 Bonus", points: "+6 pts" },
      { label: "30 Runs Bonus", points: "+4 pts" },
      { label: "50 Runs Bonus", points: "+8 pts" },
      { label: "100 Runs Bonus", points: "+16 pts" },
      {
        label: "For Each Dot Ball",
        points: "-2 pts",
        note: "If batsman doesn’t score any runs",
      },
    ],
    ODI: [
      { label: "For Each Run", points: "+1 pts" },
      { label: "4 Bonus", points: "+2 pts" },
      { label: "6 Bonus", points: "+4 pts" },
      { label: "50 Runs Bonus", points: "+10 pts" },
      { label: "100 Runs Bonus", points: "+20 pts" },
      { label: "Strike Rate Above 100", points: "+5 pts" },
      { label: "For Each Dot Ball", points: "-1 pts" },
    ],
    TEST: [
      { label: "For Each Run", points: "+1 pts" },
      { label: "50 Runs Bonus", points: "+6 pts" },
      { label: "100 Runs Bonus", points: "+12 pts" },
      { label: "Double Century Bonus", points: "+30 pts" },
      { label: "For Each Dot Ball", points: "No Negative Points" },
    ],
    T10: [
      { label: "For Each Run", points: "+1 pts" },
      { label: "4 Bonus", points: "+5 pts" },
      { label: "6 Bonus", points: "+8 pts" },
      { label: "30 Runs Bonus", points: "+5 pts" },
      { label: "50 Runs Bonus", points: "+10 pts" },
      { label: "For Each Dot Ball", points: "-3 pts" },
    ],
  },
  "Top Bowler": {
    T20: [
      { label: "For Each Wicket", points: "+25 pts" },
      { label: "Bowling Economy Below 6", points: "+8 pts" },
      { label: "3 Wicket Haul", points: "+10 pts" },
      { label: "5 Wicket Haul", points: "+20 pts" },
      { label: "For Each Maiden Over", points: "+12 pts" },
    ],
    ODI: [
      { label: "For Each Wicket", points: "+20 pts" },
      { label: "Bowling Economy Below 4", points: "+6 pts" },
      { label: "3 Wicket Haul", points: "+8 pts" },
      { label: "5 Wicket Haul", points: "+16 pts" },
      { label: "For Each Maiden Over", points: "+10 pts" },
    ],
    TEST: [
      { label: "For Each Wicket", points: "+16 pts" },
      { label: "5 Wicket Haul", points: "+20 pts" },
      { label: "10 Wicket Match Haul", points: "+50 pts" },
      { label: "Bowling Economy Below 2", points: "+10 pts" },
    ],
    T10: [
      { label: "For Each Wicket", points: "+30 pts" },
      { label: "Bowling Economy Below 7", points: "+5 pts" },
      { label: "3 Wicket Haul", points: "+12 pts" },
      { label: "5 Wicket Haul", points: "+24 pts" },
    ],
  },
  "Match Winner": {
    T20: [
      { label: "Winning Team Captain", points: "+20 pts" },
      { label: "Winning Team Players", points: "+10 pts" },
      { label: "Man of the Match", points: "+50 pts" },
    ],
    ODI: [
      { label: "Winning Team Captain", points: "+30 pts" },
      { label: "Winning Team Players", points: "+15 pts" },
      { label: "Man of the Match", points: "+40 pts" },
    ],
    TEST: [
      { label: "Winning Team Captain", points: "+50 pts" },
      { label: "Winning Team Players", points: "+25 pts" },
      { label: "Man of the Match", points: "+60 pts" },
    ],
    T10: [
      { label: "Winning Team Captain", points: "+10 pts" },
      { label: "Winning Team Players", points: "+5 pts" },
      { label: "Man of the Match", points: "+30 pts" },
    ],
  },
};

const FantasyPoints = () => {
  const [activeTab, setActiveTab] = useState("Top Batsmen");
  const [activeFormat, setActiveFormat] = useState("T20");

  const tabs = Object.keys(fantasyData);
  const formats = Object.keys(fantasyData[activeTab]);

  return (
    <section className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-300 py-8 px-4 md:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold text-black text-center">
        Fantasy <span className="sitecol">Points</span>
      </h2>
      <p className="text-gray-600 text-sm md:text-base text-center mt-2 max-w-lg">
        Based on the below points, top players will be decided for each match
      </p>

      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg mt-6 rounded-lg overflow-hidden">
        {/* Video Placeholder */}
        <div className="w-full md:w-1/3 bg-black flex items-center justify-center text-white text-lg h-52 md:h-auto p-2">
          <iframe
            className="w-full max-w-[400px] h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] xl:h-[400px] rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/q5DSFO8rA2o"
            title="Super5.live"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        {/* Points Table */}
        <div className="w-full md:w-2/3 p-4 sm:p-6">
          {/* Tab Navigation */}
          <div className="flex flex-wrap border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold flex-1 sm:flex-none text-center ${
                  activeTab === tab
                    ? "text-green-700 border-b-4 border-green-500"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Match Format Navigation */}
          <div className="flex flex-wrap gap-2 mt-3">
            {formats.map((format) => (
              <button
                key={format}
                className={`px-3 py-1 text-sm font-semibold rounded-md ${
                  activeFormat === format
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
                onClick={() => setActiveFormat(format)}
              >
                {format}
              </button>
            ))}
          </div>

          {/* Dynamic Points Table */}
          <div className="mt-4">
            {fantasyData[activeTab][activeFormat].map((item, index) => (
              <div
                key={index}
                className="flex justify-between py-2 border-b text-sm sm:text-base"
              >
                <span>
                  {item.label} {item.note && <br />}
                  <small className="text-gray-500">{item.note}</small>
                </span>
                <span className="text-green-600 font-bold">{item.points}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FantasyPoints;
