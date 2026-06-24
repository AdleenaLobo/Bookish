import {Search} from 'lucide-react'

function SearchBar() {
  return (
    <div className='flex gap-2 group '>
    <input
      type="text"
      placeholder="Search books, authors, ISBN..."
      className="
        w-96
        transition-all
        duration-300
        rounded-full
        border
        border-gray-300
        px-4
        py-2
        outline-none
        focus:border-amber-700
        text-white
        placeholder-white
        group-hover:w-[90%]
        group-focus:w-[90%]
      "
    />
    
          <Search className='text-white h-full mt-2'/>
    </div>
  );
}

export default SearchBar;