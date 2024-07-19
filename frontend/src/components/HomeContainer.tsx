import MessageContainer from "./messages/MessageContainer";
import Sidebar from "./sidebar/Sidebar";


function HomeContainer() {
  return (
    // Mobile
    <div className='drawer md:hidden bg-dgray-600 h-full'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-content flex flex-col '>
        <MessageContainer />
      </div>
      <div className='drawer-side md:hidden'>
        <label htmlFor='my-drawer-2' aria-label='close sidebar' className='drawer-overlay'></label>
         <Sidebar/>
      </div>
    </div>
  );
}

export default HomeContainer;
