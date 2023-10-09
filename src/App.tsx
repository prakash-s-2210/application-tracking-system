import { useState } from "react";
import "./App.css";
import ApplicationForm from "./components/application-form/ApplicationForm";
import Sidebar from "./components/sidebar/Sidebar";
import Tab from "./components/tab/Tab";

function App() {
  const [selectedTab, setSelectedTab] = useState<string>("Program Details");

  return (
    <main className="home">
      <Sidebar />

      <div className="flex-container">
        <Tab selectedTab = {selectedTab} setSelectedTab = {setSelectedTab} />

        {selectedTab === "Application Form" ? <ApplicationForm /> : <img src="/assets/images/not-found.avif" alt="not-found" className="not-found" />}
      </div>
    </main>
  );
}

export default App;
