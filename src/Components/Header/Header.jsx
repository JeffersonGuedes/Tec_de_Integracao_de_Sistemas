import Btn from "../../Components/Button/Btn";
import { signOut } from "../../hooks/Auth";

function Header({ title, subTitle }) {

    const handleLogout = () => {
        signOut();
    }

    return (
        <>
            <div className="w-full h-[10rem] flex items-center justify-between p-10">
                <div className="">
                    <h1 className="text-[3rem] text-[var(--color-primary)] font-[var(--font-primary)] font-bold">{title}</h1>
                    <h2 className='text-[2rem] text-[var(--color-gray-2)] font-[var(--font-primary)] font-semibold'>{subTitle}</h2>
                </div>
                <div>
                    <Btn
                        id="Logout"
                        nameBtn="Sair"
                        width='w-[7rem]'
                        height='h-[3.8rem]'
                        className="
                    bg-danger
                    hover:bg-danger-hover
                    focus:outline-danger-hover
                    active:bg-danger-hover"
                        onClick={handleLogout}
                    />
                </div>
            </div>
        </>
    )
}

export default Header;
