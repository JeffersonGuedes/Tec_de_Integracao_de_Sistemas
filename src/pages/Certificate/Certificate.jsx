import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Base from "../../Components/Base/Base";
import Btn from "../../Components/Button/Btn";
import Notifications from "../../Components/Notification/Notifications.jsx";
import { transformRequest } from "../../utils/transformRequest.js";
import { refreshAccessToken } from "../../services/auth.js";


function Certificate() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const savedNotification = localStorage.getItem('notification');
        if (savedNotification) {
            setNotification(JSON.parse(savedNotification));
            localStorage.removeItem('notification');
        }
    }, []);

    const handleSubmit = async (event) => {
            event.preventDefault();
            if (loading) return;
            setLoading(true);
            setError(null);
            setSuccess(false);
    
            try {
                const refresh = await refreshAccessToken();
                
                const method = "POST";
                const url = "/api/v1/certificate/";
    
                const data = await transformRequest(
                    url,
                    method,
                    { 
                        name: name,
                        email: email,
                        course: course
                    },
                    refresh
                );
    
                console.log(`Certificado gerado:`, data);
                setSuccess(true);
                
                setTimeout(() => {
                    navigate('/certificate');
                }, 1500);
            } catch (err) {
                console.error(`Erro ao gerar certificado:`, err);
                setError(`Não foi possível gerar o certificado. Verifique os dados e tente novamente.`);
            } finally {
                setLoading(false);
            }
        };
    

    return (
        <>
            {notification && (
                <Notifications color={notification.color} text={notification.text} />
            )}
            <Base title={"Certificado"} subTitle={"Gerar Certificado"}>
                <div className="flex flex-col justify-start items-end m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md w-auto">
                <form onSubmit={handleSubmit} className="w-full p-6">
                        {success && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                                Certificado gerado com sucesso!
                            </div>
                        )}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        <div className="mb-4">
                            <label 
                                htmlFor="name" 
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Nome
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                            <label 
                                htmlFor="email" 
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                email
                            </label>
                            <input
                                type="text"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                            <label 
                                htmlFor="nome" 
                                className="text-[2rem] block text-gray-700 font-medium mb-2"
                            >
                                Nome do curso
                            </label>
                            <input
                                type="text"
                                id="course"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="w-full h-[3rem] text-[1.4rem] rounded-[0.6rem] px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                required
                            />
                        </div>
                        <div className="justify-self-end">
                            <Btn
                                nameBtn={"Gerar"}
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
    )
}

export default Certificate;
