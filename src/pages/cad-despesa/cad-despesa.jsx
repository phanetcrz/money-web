import Sidebar from "../../components/sidebar/sidebar";
import Navbar from "../../components/navbar/navbar";
import "./cad-despesa.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../services/api";

const CadDespesa = () => {

    const { idUrl } = useParams();
    const navigate = useNavigate();
    const [valor, setValor] = useState(0);
    const [descricao, setDescricao] = useState("");
    const [categoria, setCategoria] = useState("carro");

    const SalvarDados = async () => {
        try {
            if (idUrl != "add") { //--Edição
                await api.put("/despesas/" + idUrl, {
                    descricao: descricao,                  //Passa as variaveis de estado no corpo da requisição
                    valor: valor,
                    categoria: categoria
                })

            } else {
                await api.post("/despesas", {
                    descricao: descricao,                  //Passa as variaveis de estado no corpo da requisição
                    valor: valor,
                    categoria: categoria
                });
            }

            navigate("/");

        } catch (error) {
            alert("Erro ao salvar dados");
            console.log(error);
        }




        /*teste salvar
        console.log(valor);
        console.log(descricao);
        console.log(categoria);*/
    }

    const GetDadosDespesa = async (id) => {
        try {
            //faz o GET na API...
            const response = await api.get("/despesas/" + id);

            console.log(response.data.descricao);

            setValor(response.data.valor);
            setDescricao(response.data.descricao);
            setCategoria(response.data.categoria);
        } catch (error) {
            alert("Erro ao buscar dados");
            console.log(error);
        }
    }

    useEffect(() => {
        if (idUrl != "add") {
            GetDadosDespesa(idUrl);
        }

    }, []);

    return <>
        <Sidebar />
        <Navbar />
        <div className="container-despesa-cad">
            <div className="box-despesa-cad">

                {
                    idUrl == "add" ? <h1>Nova Despesa</h1> : <h1>Editar Despesa</h1>
                }

                <div className="input-group">
                    <p>Valor</p>
                    <input type="text" className="input-lg w100" id="valor"
                        value={valor}
                        onChange={(e) => setValor(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>descrição</p>
                    <input type="text" className="w100" id="valor"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)} />
                </div>

                <div className="input-group">
                    <p>Categoria</p>
                    <select id="categoria" className="w100"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}>
                        <option value="Carro">Carro</option>
                        <option value="Casa">Casa</option>
                        <option value="Lazer">Lazer</option>
                        <option value="Mercado">Mercado</option>
                        <option value="Educação">Educação</option>
                        <option value="Viagem">Viagem</option>
                    </select>
                </div>

                <div className="btn-group text-right">
                    <button onClick={() => navigate("/")} className="btn btn-blue-outline">Cancelar </button>
                    <button onClick={SalvarDados} className="btn btn-blue ml-20">Salvar </button>
                </div>
            </div>
        </div>
    </>
}

export default CadDespesa;


