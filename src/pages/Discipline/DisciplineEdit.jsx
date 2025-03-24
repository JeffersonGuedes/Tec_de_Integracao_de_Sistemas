import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Base from "../../Components/Base/Base";
import Btn from "../../Components/Button/Btn";
import Notifications from "../../Components/Notification/Notifications.jsx";
import { transformRequest } from "../../utils/transformRequest.js";
import { refreshAccessToken } from "../../services/auth.js";

function DisciplineEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome, setNome] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const savedNotification = localStorage.getItem('notification');
        if (savedNotification) {
            setNotification(JSON.parse(savedNotification));
            localStorage.removeItem('notification');
        }
    }, []);

    useEffect(() => {
        if (id) {
            const fetchDisciplineDetails = async () => {
                try {
                    const refresh = await refreshAccessToken();
                    const disciplineDetails = await transformRequest(`/api/v1/disciplinas/${id}/`, "GET", null, refresh);
                    
                    setNome(disciplineDetails.nome);
                    setIsEditing(true);
                } catch (err) {
                    console.error("Erro ao buscar detalhes da disciplina:", err);
                    setError("Não foi possível carregar os detalhes da disciplina.");
                }
            };

            fetchDisciplineDetails();
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
                ? `/api/v1/disciplinas/${id}/` 
                : "/api/v1/disciplinas/";

            const data = await transformRequest(
                url,
                method,
                { nome: nome },
                refresh
            );

            console.log(`Disciplina ${isEditing ? 'atualizada' : 'criada'}:`, data);
            setSuccess(true);
            
            setTimeout(() => {
                navigate('/disciplina/');
            }, 1500);
        } catch (err) {
            console.error(`Erro ao ${isEditing ? 'atualizar' : 'criar'} disciplina:`, err);
            setError(`Não foi possível ${isEditing ? 'atualizar' : 'criar'} a disciplina. Verifique os dados e tente novamente.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {notification && (
                <Notifications color={notification.color} text={notification.text} />
            )}
            <Base 
                title={"Disciplina"} 
                subTitle={isEditing ? "Editar Disciplina" : "Criar Disciplina"}
            >
                <div className="flex flex-col justify-start items-end m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md w-auto">
                    <form onSubmit={handleSubmit} className="w-full p-6">
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                Disciplina {isEditing ? 'atualizada' : 'criada'} com sucesso!
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label 
                                htmlFor="nome" 
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Nome da Disciplina
                            </label>
                            <input
                                type="text"
                                id="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="justify-self-end">
                            <Btn
                                nameBtn={isEditing ? "Atualizar" : "Criar"}
                                width='w-[10rem]'
                                height='h-[3.8rem]'
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
    );
}

export default DisciplineEdit;
