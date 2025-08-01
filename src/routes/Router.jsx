import AuthLogin from "../pages/AuthLogin/AuthLogin.jsx";
import AuthReset from "../pages/AuthReset/AuthReset.jsx";
import AuthRegister from "../pages/AuthRegister/AuthRegister.jsx";
import Error from "../pages/Error/Error.jsx";
import Home from "../pages/Home/Home.jsx";
import ConsultDiscipline from "../pages/ConsultDiscipline/ConsultDiscipline.jsx";
import ConsultTeachers from "../pages/ConsultTeachers/ConsultTeachers.jsx";
import Discipline from "../pages/Discipline/Discipline.jsx";
import Certificate from "../pages/Certificate/Certificate.jsx";
import DisciplineEdit from "../pages/Discipline/DisciplineEdit.jsx";
import Teachers from "../pages/Teachers/Teachers.jsx";
import TeachersEdit from "../pages/Teachers/TeachersEdit.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectRoute.jsx";


function Router() {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AuthLogin/>} />
            <Route path="/auth_reset" element={<AuthReset/>} />
            <Route 
              path="/auth_register" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <AuthRegister/>
              } />
            <Route 
              path="/home" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <Home />
              } 
            />
            <Route 
              path="/consultar_disciplinas" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <ConsultDiscipline />
              } 
            />
            <Route 
              path="/consultar_professores" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <ConsultTeachers />
              } 
            />
            <Route 
              path="/disciplina" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <Discipline />
              } 
            />
            <Route 
              path="/disciplina/add" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <DisciplineEdit />
              } 
            />
            <Route 
              path={`/disciplina/edit/:id`} 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <DisciplineEdit />
              } 
            />
            <Route 
              path="/professor" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <Teachers />
              } 
            />
            <Route 
              path="/professor/add" 
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <TeachersEdit />
              } 
            />
            <Route
              path={`/professor/edit/:id`}
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <TeachersEdit />
              } 
            />
            <Route
              path={`/certificate`}
              element={
                // <ProtectedRoute>
                // </ProtectedRoute>
                  <Certificate />
              } 
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </>
    ) 
  }

export default Router;
