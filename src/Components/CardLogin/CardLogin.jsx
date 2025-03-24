import React from "react";
import Logomarca from "../../assets/img/Logomarca.png";


const CardLogin = ({ children, title, subtitle }) => {

    return (
        <div className="flex-col content-center w-[38rem] h-[auto] p-[1.5rem]">
            <img src={Logomarca} className="w-[18rem] mb-[2rem]" />
            <p className="font-[var(--font-primary)] font-medium text-[1.2rem] mb-2 text-[var(--color-gray-2)]">Bem vindo 👋🏻</p>
            <h1 className="font-[var(--font-primary)] font-bold text-[2.5rem] mb-[2rem] text-[var(--color-gray-3)]">{title}</h1>
            <p className="font-[var(--font-primary)] font-medium text-[1.2rem] mb-2 text-[var(--color-gray-2)]">{subtitle}</p>
            {children}
            <p className="font-[var(--font-primary)] text-[var(--color-gray-2)] text-center font-medium mt-[3rem] mb-[1rem]">Copyright © 2025 | Prefeitura de Fortaleza - SEPOG</p>
            <p className="font-[var(--font-primary)] text-[var(--color-gray-2)] text-center font-medium">Suporte Técnico: <span className="text-black font-bold underline underline-offset-2 decoration-1">suporte.guardião@sepog.fortaleza.ce.gov.br</span></p>
        </div>
    );
};

export default CardLogin;
