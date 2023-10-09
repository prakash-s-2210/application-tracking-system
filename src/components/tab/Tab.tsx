import { tabData } from "../../constants";
import "./Tab.css";

type TabProps = {
  selectedTab: string;
  setSelectedTab: React.Dispatch<React.SetStateAction<string>>
}

const Tab = ({selectedTab, setSelectedTab}:TabProps) => {
  

  const handleSelectTab = (tab: string) => {
    setSelectedTab(tab);
  };

  return (
    <ul className="tab">
      {tabData.map((tab, index) => {
        const selectedIndex = tabData.indexOf(selectedTab);

        return (
          <li
            key={tab}
            onClick={() => handleSelectTab(tab)}
            className={`${selectedTab !== tab && "not-selected-list"}`}
          >
            <div className={`${selectedTab === tab && "selected-text"}`}>
              <span>{tab}</span>
            </div>

            <span
              className={`${
                index !== tabData.length - 1 &&
                selectedTab !== tab &&
                index !== selectedIndex - 1 &&
                "separator"
              }`}
            >
              <div></div>
            </span>

            <img
              src="/assets/icons/indicator.svg"
              alt="indicator"
              width={20}
              height={40}
              className={`${
                selectedTab === tab
                  ? "selected-indicator"
                  : "not-selected-indicator"
              }`}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default Tab;
