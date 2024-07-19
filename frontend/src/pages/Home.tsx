import MessageContainer from '../components/messages/MessageContainer';
import Sidebar from '@sidebar/Sidebar';
import HomeContainer from '@components/HomeContainer';

const Home = () => {
  return (
    <>
     {/* LOGO */}
     <div className='no-drag absolute inset-y-10 inset-x-12 flex gap-2 w-20 h-1'>
        <img src='/nyacord.svg' alt='nyacord' className='w-8 h-8 no-drag' />
				<span className='text-dgray-100 text-xl font-extrabold pt-1'>Nyacord</span>
      </div>
      <div className='hidden md:flex w-full md:max-w-screen-md md:h-[550px] rounded-lg overflow-hidden bg-dgray-600 bg-clip-padding backdrop-filter backdrop-blur-lg shadow-sm shadow-black'>
        <Sidebar />
        <MessageContainer />
      </div>
      {/* Mobile */}
      <HomeContainer />
    </>
  );
};
export default Home;

