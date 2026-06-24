import { CircleUserRound } from "lucide-react";

function ProfileMenu() {
  return (
    <div className="flex items-center gap-3">
      <button className="rounded-lg  px-4 py-2 text-white font-medium hover:underline hover:underline-offset-4 hover:decoration-amber-900 ">
        Login / Sign Up
      </button>
      <CircleUserRound className='text-white font-medium'/>
    </div>
  );
}

export default ProfileMenu;