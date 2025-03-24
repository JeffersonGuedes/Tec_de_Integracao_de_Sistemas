import React, { useState, useEffect } from "react";
import Base from "../../Components/Base/Base.jsx";
import api from "../../services/api";


function ConsultDiscipline() {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/v1/habilitacoes/');
        setDisciplines(response.data.results);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar disciplinas:", err);
        setError("Não foi possível carregar as disciplinas. Por favor, tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, []);

  useEffect(() => {
    if (disciplines.length > 0 && !loading) {
      if (!window.$.fn.DataTable.isDataTable("#dataTable-4")) {
        window.$("#dataTable-4").DataTable({
          autoWidth: true,
          lengthMenu: [
            [10, 25, 50, -1],
            [10, 25, 50, "Todos"],
          ],
          language: {
            info: "Mostrando _PAGE_ de _PAGES_ registros",
            infoEmpty: "No records available",
            lengthMenu: "Exibir _MENU_ resultados por página",
            zeroRecords: "Nothing found - sorry",
            emptyTable: "Nenhum registro encontrado",
            infoFiltered: "(Filtrados de _MAX_ registros)",
            infoThousands: ".",
            loadingRecords: "Carregando...",
            zeroRecordss: "Nenhum registro encontrado",
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

      const table = window.$("#dataTable-4").DataTable();
      table.draw();
      window.$.fn.dataTable.ext.search.pop();
    }
  }, [disciplines, loading]);

  return (
    <>
      <Base title={"Consulta Disciplina"} subTitle={"Lista de disciplinas"}>
        <div className="m-[3rem] h-[calc(100%-3rem)] rounded-[1rem] bg-white shadow-md">
          <div className="p-6">
            {loading && <p className="text-gray-600">Carregando disciplinas...</p>}

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="overflow-x-auto">
                <table
                  className="min-w-full bg-white border border-gray-200"
                  id="dataTable-4"
                >
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left font-medium text-gray-700">ID</th>
                      <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Disciplinas</th>
                      <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Professores</th>
                      <th className="py-3 px-4 border-b text-left font-medium text-gray-700">Especialização</th>
                    </tr>
                  </thead>
                  <tbody>
                    {disciplines.map((discipline) => (
                      <tr key={discipline.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border-b">
                          <a className="text-blue-600 hover:underline" id="infoTabela">
                            {discipline.id}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <a className="text-blue-600 hover:underline" id="infoTabela">
                            {discipline.disciplina}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <a className="text-blue-600 hover:underline" id="infoTabela">
                            {discipline.professor}
                          </a>
                        </td>
                        <td className="py-2 px-4 border-b">
                          <a className="text-blue-600 hover:underline" id="infoTabela">
                            {discipline.especializacao}
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Base>
    </>
  );
}

export default ConsultDiscipline;
