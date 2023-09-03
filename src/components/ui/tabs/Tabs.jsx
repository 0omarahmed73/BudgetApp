import { useState } from "react";
import "./Tabs.css";
const Tabs = ({ children, defaultTab = 1 }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const tabs = [...children];
  const tabsTitle = tabs.map((el) => el.props.title || "");
  const tabsContent = tabs.map((el) => el.props.children || "");
  return (
    <div className="tabs">
      <div className="tabs-titles">
        {tabsTitle.map((title, i) => {
          return (
            <div
              key={"tab-title-" + i + 1}
              className={`tab-title ${activeTab === i + 1 ? "active" : ""}`}
              onClick={() => setActiveTab(a => i + 1)}
            >
              {title}
            </div>
          );
        })}
      </div>
      <div className="tab-content">
        {tabsContent[activeTab - 1]}
      </div>
    </div>
  );
};

export default Tabs;
