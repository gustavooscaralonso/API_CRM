import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo"),

    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .typeError("El numero no es valido")
      .integer("Numero no valido")
      .positive("Numero no valido"),
  });

  const handleSubmit = async (values) => {
    try {
      let respuesta;
      if (cliente.id) {
        //edirtndo un registro
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //Nuevo registro
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
        //console.log(respuesta);

        await respuesta.json();
        console.log(resultado);

        navigate("/clientes");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className='bg-white mt-10 px-5 py-10  shadow-md md:w-3/4 mx-auto'>
      <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>
        {cliente?.nombre ? "Editar" : "Agregar"}
      </h1>
      <p>
        <span className='text-red-500'>*</span> campo obligatorio
      </p>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.tekefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
          navigate("/clientes");
        }}
        validationSchema={nuevoClienteSchema}>
        {({ errors, touched }) => {
          //console.log(touched);
          return (
            <Form className='mt-10'>
              <div className='mb-4'>
                <label htmlFor='nombre' className='text-gray-800'>
                  Nombre <span className='text-red-500'>*</span>
                </label>
                <Field
                  id='nombre'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Ingresa tu Nombre'
                  name='nombre'
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label htmlFor='empresa' className='text-gray-800'>
                  Empresa <span className='text-red-500'>*</span>
                </label>
                <Field
                  id='empresa'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Ingresa la Empresa'
                  name='empresa'
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label htmlFor='email' className='text-gray-800'>
                  Email <span className='text-red-500'>*</span>
                </label>
                <Field
                  id='email'
                  type='email'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Ingresa tu email'
                  name='email'
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label htmlFor='telefono' className='text-gray-800'>
                  Telefono
                </label>
                <Field
                  id='telefono'
                  type='tel'
                  className='mt-2 block w-full p-3 bg-gray-100'
                  placeholder='Ingresa tu telefono'
                  name='telefono'
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>

              <div className='mb-4'>
                <label htmlFor='notas' className='text-gray-800'>
                  Notas
                </label>
                <Field
                  as='textarea'
                  id='notas'
                  type='text'
                  className='mt-2 block w-full p-3 bg-gray-100 h-40'
                  placeholder='Notas'
                  name='notas'
                />

                <input
                  type='submit'
                  value={cliente?.nombre ? "Guardar Cambios" : "Agregar"}
                  className='mt-5 w-full bg-teal-600 p-3  text-white uppercase font-bold text-lg'
                />
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false,
};
export default Formulario;
