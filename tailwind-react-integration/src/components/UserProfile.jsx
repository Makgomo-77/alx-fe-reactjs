function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-8 max-w-sm mx-auto my-20 rounded-lg shadow-lg">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-36 h-36 mx-auto"
      />
      <h1 className="text-xl text-blue-800 my-4">John Doe</h1>
      <p className="text-gray-600 text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}
function UserProfile() {
  return (
    <div className="user-profile bg-gray-100 p-4 sm:p-4 md:p-8 max-w-xs sm:max-w-sm mx-auto my-10 sm:my-16 md:my-20 rounded-lg shadow-lg">
      <img 
        src="https://via.placeholder.com/150" 
        alt="User" 
        className="rounded-full w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:max-w-sm"
      />
      <h1 className="text-lg sm:text-xl md:text-2xl text-blue-800 my-3 sm:my-4">
        John Doe
      </h1>
      <p className="text-gray-600 text-sm sm:text-base">
        Developer at Example Co. Loves to write code and explore new technologies.
      </p>
    </div>
  );
}


export default UserProfile;