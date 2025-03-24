import AuthLogin from "../pages/AuthLogin/AuthLogin.jsx";
import AuthReset from "../pages/AuthReset/AuthReset.jsx";
import AuthRegister from "../pages/AuthRegister/AuthRegister.jsx";
import Error from "../pages/Error/Error.jsx";
import Home from "../pages/Home/Home.jsx";
import ConsultDiscipline from "../pages/ConsultDiscipline/ConsultDiscipline.jsx";
import ConsultTeachers from "../pages/ConsultTeachers/ConsultTeachers.jsx";
import Discipline from "../pages/Discipline/Discipline.jsx";
// import DisciplineAdd from "../pages/Discipline/DisciplineAdd.jsx";
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
                <ProtectedRoute>
                  <AuthRegister/>
                </ProtectedRoute>
              } />
            <Route 
              path="/home" 
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultar_disciplinas" 
              element={
                <ProtectedRoute>
                  <ConsultDiscipline />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/consultar_professores" 
              element={
                <ProtectedRoute>
                  <ConsultTeachers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/disciplina" 
              element={
                <ProtectedRoute>
                  <Discipline />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/disciplina/add" 
              element={
                <ProtectedRoute>
                  <DisciplineEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path={`/disciplina/edit/:id`} 
              element={
                <ProtectedRoute>
                  <DisciplineEdit />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor" 
              element={
                <ProtectedRoute>
                  <Teachers />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/professor/add" 
              element={
                <ProtectedRoute>
                  <TeachersEdit />
                </ProtectedRoute>
              } 
            />
            <Route
              path={`/professor/edit/:id`}
              element={
                <ProtectedRoute>
                  <TeachersEdit />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </BrowserRouter>
      </>
    ) 
  }

export default Router;
