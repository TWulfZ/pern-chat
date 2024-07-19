import useLogout from "@hooks/useLogout";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
	const { logout} = useLogout();

	return (
		<div className='mt-auto p-2 flex items-center gap-2'>
			<LogOut className='w-8 h-8 md:w-6 md:h-6 text-white cursor-pointer' onClick={logout} />
			<span className='block text-md md:hidden' onClick={logout}>Cerrar sesión</span>
		</div>
	);
};
export default LogoutButton;
