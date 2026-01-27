interface BotonProps {
  label: string;
  onClick: (id: number) => void;
}

function clickBoton({ label, onClick }: BotonProps) {
  console.log(`Botón ${label} ha sido clickeado.`);
  console.log(onClick(67));
}

const botonEjemplo: BotonProps = {
  label: "BorrarUsuario",
  onClick: (id: number) => `Borrando usuario con ID: ${id}`,
};
clickBoton(botonEjemplo);
