import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base.jsx";
import api from "../../services/api";
import { Link } from "react-router-dom";
import Btn from "../../Components/Button/Btn.jsx";

function Teachers() {
    const [professors, setProfessors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchProfessors = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/v1/professores/');
                setProfessors(response.data.results);
                setError(null);
            } catch (err) {
                console.error("Erro ao buscar professores:", err);
                setError("Não foi possível carregar os professores. Por favor, tente novamente mais tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfessors();
    }, []);


    const handleDelete = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este professor?")) {
            try {
                await api.delete(`/api/v1/professores/${id}/`);
                setProfessors(professors.filter((professor) => professor.id !== id));
            } catch (err) {
                console.error("Erro ao excluir professor:", err);
                alert("Erro ao excluir professor. Tente novamente.");
            }
        }
    };

    return (
        <Base title={"Professores"} subTitle={"Cadastro de professor"}>
            <div className="flex flex-col justify-start items-end m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md w-auto">
                <Link to="./add" className="p-3">
                    <Btn
                        nameBtn="Criar"
                        width='w-[7rem]'
                        height='h-[3.8rem]'
                        className="
                        bg-primary
                        hover:bg-primary-hover
                        focus:outline-primary-hover
                        active:bg-primary-hover
                        "
                    />
                </Link>
                <div className="p-6 w-full">
                    {loading && <p className="text-gray-600">Carregando professores...</p>}

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}

                    {!loading && !error && (
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200" id="dataTable-4">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="py-3 px-4 border-b text-left font-medium text-gray-700">ID</th>
                                        <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Nome</th>
                                        <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Especialização</th>
                                        <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {professors.length > 0 ? (
                                        professors.map((professor) => (
                                            <tr key={professor.id} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">
                                                    <p className="text-blue-600 hover:underline" id="infoTabela">
                                                        {professor.id}
                                                    </p>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <p className="text-blue-600 hover:underline" id="infoTabela">
                                                        {professor.nome}
                                                    </p>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <p className="text-blue-600 hover:underline" id="infoTabela">
                                                        {professor.especializacao}
                                                    </p>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            to={`/professor/edit/${professor.id}`}
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            <span className="material-icons text-[20px]">edit</span>
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(professor.id)}
                                                            className="text-red-600 hover:underline"
                                                        >
                                                            <span className="material-icons text-[20px]">delete</span>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="py-4 px-4 text-center text-gray-500">
                                                Nenhum professor encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </Base>
    );
}

export default Teachers;
