import Base from "../../Components/Base/Base.jsx";


function Home() {
    return (
        <>
            <Base title={"Home"} subTitle={"Pagina inicial"}>
                <div className="m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md">
                    <div className="flex flex-col items-center justify-start h-full p-8">
                        <h2 className="text-[4rem] font-bold text-blue-900 mb-2 text-center">Sistema de Gestão Acadêmica</h2>
                        <p className="text-[2rem] text-gray-600 text-center mb-6">Simplifique o gerenciamento do ambiente educacional</p>

                        <div className="grid grid-cols-2 gap-10 w-[45rem] max-w-[45rem] h-[25rem] mb-6 mt-7">
                            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                <span className="text-[3rem]">📚</span>
                                <span className="font-medium text-gray-700">Disciplinas</span>
                            </div>
                            <div className="flex flex-col items-center  justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                <span className="text-[3rem]">👨‍🏫</span>
                                <span className="font-medium text-gray-700">Professores</span>
                            </div>
                            <div className="flex flex-col items-center  justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                <span className="text-[3rem]">👥</span>
                                <span className="font-medium text-gray-700">Alunos</span>
                            </div>
                            <div className="flex flex-col items-center  justify-center p-4 bg-gray-50 rounded-lg hover:shadow-md transition-all">
                                <span className="text-[3rem]">🏛️</span>
                                <span className="font-medium text-gray-700">Turmas</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-center text-[1.6rem] mb-2">Acesse todas as informações acadêmicas em um só lugar</p>
                    </div>
                </div>
            </Base>
        </>
    )
}

export default Home;
