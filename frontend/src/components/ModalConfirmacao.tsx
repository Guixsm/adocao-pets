type Props = {
  titulo: string;
  mensagem: string;
  textoConfirmar?: string;
  carregando?: boolean;
  erro?: string | null;
  onConfirmar: () => void;
  onCancelar: () => void;
};

export default function ModalConfirmacao({
  titulo,
  mensagem,
  textoConfirmar = "Confirmar",
  carregando = false,
  erro = null,
  onConfirmar,
  onCancelar,
}: Props) {
  return (
    <div className="modal-fundo">
      <div className="modal">
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
        {erro && <p className="erro">{erro}</p>}
        <div className="modal-acoes">
          <button className="botao-secundario" onClick={onCancelar} disabled={carregando}>
            Cancelar
          </button>
          <button onClick={onConfirmar} disabled={carregando}>
            {carregando ? "Removendo..." : textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}