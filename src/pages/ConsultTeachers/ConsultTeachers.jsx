import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base.jsx";
import api from "../../services/api";

function ConsultTeachers() {
    const mockData = [
        {
            id: 1,
            disciplina: "Matemática",
            professor: "Prof. João Silva",
            especializacao: "Matemática Aplicada",
            carga_horaria: "60h",
            quantidade_aluno: 25
        },
        {
            id: 2,
            disciplina: "Física",
            professor: "Prof. Maria Santos",
            especializacao: "Física Teórica",
            carga_horaria: "80h",
            quantidade_aluno: 30
        },
        {
            id: 3,
            disciplina: "Química",
            professor: "Prof. Carlos Oliveira",
            especializacao: "Química Orgânica",
            carga_horaria: "60h",
            quantidade_aluno: 22
        },
        {
            id: 4,
            disciplina: "Biologia",
            professor: "Prof. Ana Costa",
            especializacao: "Biologia Molecular",
            carga_horaria: "40h",
            quantidade_aluno: 28
        },
        {
            id: 5,
            disciplina: "História",
            professor: "Prof. Pedro Ferreira",
            especializacao: "História Contemporânea",
            carga_horaria: "40h",
            quantidade_aluno: 35
        }
    ];

    const [disciplines, setDisciplines] = useState(mockData);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDisciplines = async () => {
            try {
                setLoading(true);
                const response = await api.get('/api/v1/historicos/');
                
                if (response.data && response.data.results && response.data.results.length > 0) {
                    setDisciplines(response.data.results);
                    setError(null);
                } else {
                    setDisciplines(mockData);
                    setError("API retornou vazia - usando dados de exemplo");
                }
            } catch (err) {
                console.error("Erro ao buscar disciplinas da API:", err);
                setDisciplines(mockData);
                setError("API indisponível - usando dados de exemplo");
            } finally {
                setLoading(false);
            }
        };

        fetchDisciplines();
    }, []);

    useEffect(() => {
        if (disciplines && disciplines.length > 0) {
            const timer = setTimeout(() => {
                try {
                    if (window.$ && window.$.fn && window.$.fn.DataTable) {
                        if (window.$.fn.DataTable.isDataTable("#dataTable-4")) {
                            window.$("#dataTable-4").DataTable().destroy();
                        }
                        
                        window.$("#dataTable-4").DataTable({
                            autoWidth: true,
                            lengthMenu: [
                                [10, 25, 50, -1],
                                [10, 25, 50, "Todos"],
                            ],
                            language: {
                                info: "Mostrando _PAGE_ de _PAGES_ registros",
                                infoEmpty: "Nenhum registro disponível",
                                lengthMenu: "Exibir _MENU_ resultados por página",
                                zeroRecords: "Nenhum registro encontrado",
                                emptyTable: "Nenhum registro encontrado",
                                infoFiltered: "(Filtrados de _MAX_ registros)",
                                infoThousands: ".",
                                loadingRecords: "Carregando...",
                                search: "Pesquisar",
                                paginate: {
                                    next: "Próximo",
                                    previous: "Anterior",
                                    first: "Primeiro",
                                    last: "Último",
                                },
                            },
                            columnDefs: [{ orderable: true, targets: 0 }],
                            order: [[0, "asc"]],
                        });
                    }
                } catch (error) {
                    console.log("DataTable não disponível, tabela funcionará sem DataTable");
                }
            }, 1000);

            return () => {
                clearTimeout(timer);
                try {
                    if (window.$ && window.$.fn && window.$.fn.DataTable && window.$.fn.DataTable.isDataTable("#dataTable-4")) {
                        window.$("#dataTable-4").DataTable().destroy();
                    }
                } catch (error) {
                    console.log("Erro no cleanup do DataTable:", error);
                }
            };
        }
    }, [disciplines]);

    return (
        <>
            <Base title={"Consulta Professores"} subTitle={"Lista de professores e disciplinas"}>
                <div className="m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md">
                    <div className="p-6">

                        {loading && <p className="text-gray-600">Carregando disciplinas...</p>}

                        {error && (
                            <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
                                <strong>Aviso:</strong> {error}
                            </div>
                        )}

                        {disciplines && disciplines.length > 0 && (
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200" id="dataTable-4">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">ID</th>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Disciplinas</th>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Professores</th>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Especialização</th>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Carga Horária</th>
                                            <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Quantidade de alunos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {disciplines.map((discipline) => (
                                            <tr key={discipline.id ? discipline.id : Math.random()} className="hover:bg-gray-50">
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.id ? discipline.id : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.disciplina ? discipline.disciplina : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.professor ? discipline.professor : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.especializacao ? discipline.especializacao : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.carga_horaria ? discipline.carga_horaria : "N/A"}
                                                    </span>
                                                </td>
                                                <td className="py-2 px-4 border-b">
                                                    <span className="text-blue-600">
                                                        {discipline.quantidade_aluno ? discipline.quantidade_aluno : "N/A"}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {!loading && (!disciplines || disciplines.length === 0) && !error && (
                            <div className="text-center py-8 text-gray-500">
                                Nenhuma disciplina encontrada.
                            </div>
                        )}
                    </div>
                </div>
            </Base>
        </>
    )
}

export default ConsultTeachers;
