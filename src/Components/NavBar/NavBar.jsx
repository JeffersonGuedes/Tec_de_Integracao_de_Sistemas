import Logomarcahome from "../../assets/img/Logomarcahome.png";
import { Link } from "react-router-dom";
import Section from "../Section/Section";


function NavBar() {
    return (
        <>
            <div className="w-[24.2rem] h-screen bg-[var(--color-primary)] p-6 pt-[3rem] flex flex-col justify-start items-center gap-[1.5rem]">
                <Link className="mb-5" to="/home"><img src={Logomarcahome} alt="" /></Link>
                <Section Icon={'manage_search'} Text={'Consultar Disciplinas'} link={'/consultar_disciplinas'}></Section>
                <Section Icon={'person_search'} Text={'Consultar Professores'} link={'/consultar_professores'}></Section>
                <Section Icon={'person_add'} Text={'Professores'} link={'/professor'}></Section>
                <Section Icon={'menu_book'} Text={'Disciplinas'} link={'/disciplina'}></Section>
                <Section Icon={'description'} Text={'Certificado'} link={'/certificate'}></Section>
            </div>
        </>
    )
}

export default NavBar;
