import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handleEliminar }) => {
  const navigate = useNavigate();

  const { nombre, empresa, email, telefono, notas, id } = cliente;

  return (
    <tr className='border-b hover:bg-gray-100'>
      <td className='p-3'>{nombre}</td>
      <td className='p-3'>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Email: </span>
          {email}
        </p>
        <p>
          <span className='text-gray-800 uppercase font-bold'>Tel: </span>
          {telefono}
        </p>
      </td>
      <td className='p-3'>{empresa}</td>
      <td className='p-3'>
        <button
          type='button'
          className='bg-teal-700 text-white hover:bg-teal-600 block w-full p-2 uppercase font-bold text-xs'
          onClick={() => navigate(`/clientes/${id}`)}>
          Ver
        </button>

        <button
          type='button'
          className='bg-cyan-700 text-white hover:bg-cyan-600 block w-full p-2 uppercase font-bold text-xs mt-3'
          onClick={() => navigate(`/clientes/editar/${id}`)}>
          Editar
        </button>

        <button
          type='button'
          className='bg-amber-700 text-white hover:bg-amber-600 block w-full p-2 uppercase font-bold text-xs mt-3'
          onClick={() => handleEliminar(id)}>
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
