import { CircleUserRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function ProfileMenu() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3">
      <CircleUserRound
        size={24}
        className="text-white cursor-pointer"
        onClick={() => navigate(user ? "/profile" : "/login")}
      />

      {user ? (
        <>
          <span className="text-white font-medium">{user.name}</span>
          <button
            onClick={handleLogout}
            className="text-white/50 hover:text-red-400 text-sm"
          >
            Logout
          </button>
        </>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="text-white font-medium hover:text-amber-400"
        >
          Login
        </button>
      )}
    </div>
  );
}

export default ProfileMenu;
