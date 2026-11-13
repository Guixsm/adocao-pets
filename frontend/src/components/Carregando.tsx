type Props = {
  texto?: string;
};

export default function Carregando({ texto = "Carregando..." }: Props) {
  return (
    <p className="carregando">
      <span className="spinner" aria-hidden="true" />
      {texto}
    </p>
  );
}