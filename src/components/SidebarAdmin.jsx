import { useNavigate } from "react-router-dom";

const SidebarAdmin = () => {

    const navigate = useNavigate();

    const handleNav = (ruta) => {
        navigate(ruta)
    }
    return (
        <div className="w-full text-white flex flex-col items-start">
            <h1 className="text-2xl px-5 my-3 font-semibold mb-5">Panel Administrativo</h1>
            <button className="hover:bg-cyan-950 w-full py-2 pl-10 " onClick={() => handleNav("/home")}>
                <h1 className="text-xl text-start">Catálogo Completo</h1>
            </button>
            <button className="hover:bg-cyan-950 w-full py-2 pl-10 " onClick={() => handleNav("/deleted-products")}>
                <h1 className="text-xl text-start">Ver Productos Eliminados</h1>
            </button>


        </div>
    )
}

export default SidebarAdmin
