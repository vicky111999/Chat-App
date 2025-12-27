const Chatlayout = ({ sidebar, main, selectuser }) => {
  return (
    <div className="h-screen flex bg-gray-100">
      <div
        className={`fixed inset-0 z-20 w-full md:w-80 bg-white transform transition-transform duration-300 ease-in-out ${
          selectuser ? "-translate-x-full md:translate-x-0" : "translate-x-0"
        } md:relative md:translate-x-0`}
      >
        {sidebar}
      </div>
      <div
        className={`flex-1 flex-col bg-gray-50 fixed inset-0 z-30 transform trnsition-transform duration-300 ease-in-out ${
          selectuser ? "translate-x-0" : "translate-x-full"
        } md:relative md:translate-x-0 md:flex-1`}
      >
        {main}
      </div>
    </div>
  );
};

export default Chatlayout;
