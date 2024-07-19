import Conversations from './Conversations';
import LogoutButton from './LogoutButton';
import SearchInput from './SearchInput';

const Sidebar = () => {
  return (
    <>
      <div className='border-r p-2 bg-dgray-700 border-dgray-800 md:p-4 flex flex-col w-3/4 md:w-1/2 h-full'>
        <SearchInput />
        <div className='divider px-3' />
        <Conversations />
        <LogoutButton />
      </div>
    </>
  );
};
export default Sidebar;

