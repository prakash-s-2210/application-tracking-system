import "./Sidebar.css";

const Sidebar = () => {
  return (
    <section className="sidebar-container">
      <div>
        <img
          src="/assets/icons/hamburger.svg"
          alt="hamburger icon"
          width={22}
          height={18}
          className="hamburger"
        />

        <div className="sidebar">
          <img
            src="/assets/icons/home.svg"
            alt="home icon"
            width={30}
            height={30}
          />

          <img
            src="/assets/icons/file.svg"
            alt="file icon"
            width={30}
            height={30}
          />
        </div>
      </div>

      <div className="avatar"><span>SP</span></div>
    </section>
  );
};

export default Sidebar;
