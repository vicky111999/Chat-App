import React from "react";

const Siderbar = ({ users=[] , activeUser, onSelect, onLogout }) => {
  return (
    <div className="h-full overflow-auto">
      <div className="p-4 font-semibold text-lg border-b">Chats</div>
      {users?.map((user) => (
        <div
          key={user._id}
          onClick={() => onSelect(user)}
          className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 ${
            activeUser?._id === user._id ? "bg-green-200" : ""
          }`}
        >
          <div className=" w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center">
            {user.name?.[0] || "No Users"}
          </div>
          <div>

            <div className="font-medium">{user.name}</div>
          </div>
        </div>
      ))}
      <button
        className="bg-red-500 text-white px-4 rounded-lg"
        onClick={()=>onLogout()}
      >
        Logout
      </button>
    </div>
  );
};

export default Siderbar;
