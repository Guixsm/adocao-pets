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
    <div
      className="modal-fundo"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="modal"
        style={{ background: "white", color: "#222", padding: 24, borderRadius: 12, maxWidth: 360 }}
      >
        <h2>{titulo}</h2>
        <p>{mensagem}</p>
        {erro && <p style={{ color: "crimson" }}>{erro}</p>}
        <button onClick={onCancelar} disabled={carregando}>
          Cancelar
        </button>
        <button onClick={onConfirmar} disabled={carregando}>
          {carregando ? "Removendo..." : textoConfirmar}
        </button>
      </div>
    </div>
  );
}