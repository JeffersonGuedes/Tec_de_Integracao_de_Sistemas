import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Base from "../../Components/Base/Base";
import Btn from "../../Components/Button/Btn";
import Notifications from "../../Components/Notification/Notifications.jsx";
import { transformRequest } from "../../utils/transformRequest.js";
import { refreshAccessToken } from "../../services/auth.js";


function TeachersEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [institution, setInstitution] = useState("");
    const [teacher, setTeacher] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [institutions, setInstitutions] = useState([]);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchInstitutions = async () => {
            try {
                const refresh = await refreshAccessToken();
                const teacherData = await transformRequest("/api/v1/professores/", "GET", null, refresh);
                const data = teacherData.results;

                if (Array.isArray(data)) {
                    const uniqueInstitutions = Array.from(
                        new Set(
                            teacherData.results.map(prof => prof.instituicao)
                        )
                    ).map(institutionId => {
                        const institutionName = teacherData.results.find(
                            prof => prof.instituicao === institutionId
                        )?.instituicao_nome;

                        return {
                            id: institutionId,
                            name: institutionName || 'Unknown Institution'
                        };
                    });

                    setInstitutions(uniqueInstitutions);
                } else {
                    console.error("professoresData não é um array:", teacherData);
                    setInstitutions([]);
                    setError("Formato de dados inválido ao carregar professores.");
                }
            } catch (err) {
                console.error("Erro ao buscar dados:", err);
                setInstitutions([]);
                setError("Erro ao carregar dados. Tente novamente.");
            }
        };

        fetchInstitutions();

        if (id) {
            const fetchTeacherDetails = async () => {
                try {
                    const refresh = await refreshAccessToken();
                    const teacherDetails = await transformRequest(`/api/v1/professores/${id}/`, "GET", null, refresh);

                    setTeacher(teacherDetails.nome);
                    setInstitution(teacherDetails.instituicao);
                    setSpecialization(teacherDetails.especializacao);
                    setIsEditing(true);
                } catch (err) {
                    console.error("Erro ao buscar detalhes do professor:", err);
                    setError("Não foi possível carregar os detalhes do professor.");
                }
            };

            fetchTeacherDetails();
        }
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const refresh = await refreshAccessToken();
            const method = isEditing ? "PUT" : "POST";
            const url = isEditing
                ? `/api/v1/professores/${id}/`
                : "/api/v1/professores/";

            const data = await transformRequest(
                url,
                method,
                {
                    nome: teacher,
                    instituicao: institution,
                    especializacao: specialization,
                },
                refresh
            );

            console.log(`Professor ${isEditing ? 'atualizado' : 'criado'}:`, data);
            setSuccess(true);

            setTimeout(() => {
                navigate('/professor/');
            }, 1500);
        } catch (err) {
            console.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} professor:`, err);
            setError(`Não foi possível ${isEditing ? 'atualizar' : 'criar'} o professor. Verifique os dados e tente novamente.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {notification && (
                <Notifications color={notification.color} text={notification.text} />
            )}
            <Base title={"Professor"} subTitle={isEditing ? "Editar Professor" : "Criar Professor"}>
                <div className="flex flex-col justify-start items-end m-[3rem] h-auto rounded-[1rem] bg-white shadow-md w-auto">
                    <form onSubmit={handleSubmit} className="w-full p-6">
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                Professor {isEditing ? 'atualizado' : 'criado'} com sucesso!
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label
                                htmlFor="instituicao"
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Instituição
                            </label>
                            <select
                                id="instituicao"
                                value={institution}
                                onChange={(e) => setInstitution(e.target.value)}
                                className="w-[20vw] h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
                            >
                                <option value="">Selecione uma instituição</option>
                                {institutions && institutions.length > 0 ? (
                                    institutions.map((inst) => (
                                        <option key={inst.id} value={inst.id}>
                                            {inst.name}
                                        </option>
                                    ))
                                ) : (
                                    <option disabled>Carregando instituições...</option>
                                )}
                            </select>
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="professor"
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Professor
                            </label>
                            <input
                                type="text"
                                id="teacher"
                                value={teacher}
                                onChange={(e) => setTeacher(e.target.value)}
                                className="w-[20vw] h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="especializacao"
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Especialização
                            </label>
                            <input
                                type="text"
                                id="especializacao"
                                value={specialization}
                                onChange={(e) => setSpecialization(e.target.value)}
                                className="w-[20vw] h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="justify-self-start">
                            <Btn
                                nameBtn={isEditing ? "Atualizar" : "Criar"}
                                width="w-[10rem]"
                                height="h-[3.8rem]"
                                className="
                            bg-primary
                            hover:bg-primary-hover
                            focus:outline-primary-hover
                            active:bg-primary-hover
                            "
                            />
                        </div>
                    </form>
                </div>
            </Base>
        </>
    )
}

export default TeachersEdit;