import axios from 'axios';
import api from "./api";
import { signOut } from "../hooks/Auth";


export const cleanToken = (token) => {
  if (!token) return '';
  
  let cleanedToken = token.trim();

  if (cleanedToken.startsWith('"') || cleanedToken.startsWith('\\"')) {
    cleanedToken = cleanedToken.substring(1);
  }
  if (cleanedToken.endsWith('"') || cleanedToken.endsWith('\\"')) {
    cleanedToken = cleanedToken.substring(0, cleanedToken.length - 1);
  }
  
  cleanedToken = cleanedToken.replace(/\\"/g, '"');
  
  return cleanedToken;
};

export const refreshAccessToken = async () => {
    try {
        const rawRefreshToken = localStorage.getItem('refresh');
        
        if (!rawRefreshToken) {
            console.error("Refresh token não encontrado!");
            signOut();
            throw new Error("Refresh token não encontrado!");
        }
        
        const refreshToken = cleanToken(rawRefreshToken);
        const refreshApi = axios.create({
            baseURL: import.meta.env.VITE_API_URL,
        });
        
        const response = await refreshApi.post('/api/v1/token/refresh/', {
            refresh: refreshToken
        });
        
        
        if (response.data && response.data.access) {
            const newAccessToken = response.data.access;
            localStorage.setItem('access', newAccessToken);
            return newAccessToken;
        } else {
            throw new Error("Formato de resposta inválido ao renovar token");
        }
    } catch (error) {
        console.error('Erro ao renovar o token:', error.response ? error.response.data : error.message);
        
        if (error.response && [401, 403].includes(error.response.status)) {
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            signOut();
        }
        
        throw error;
    }
};
