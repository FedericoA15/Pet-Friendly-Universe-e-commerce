import { useState } from "react";
import axios from "axios";
import { ValidateProduct } from "../Validations/ValidateProduct";
import LinkButton from "../../../../components/Button/LinkButton";
import Swal from "sweetalert2";
import { Carousel } from "flowbite-react";
// name,img,price,description,stock,specie,breed,brand,weight,color,size

function FormCreateProduct() {
  const [formComplete, setFormComplete] = useState(false);
  const [form, setForm] = useState({
    name: "",
    img: "",
    price: "",
    description: "",
    stock: "",
    specie: "",
    breed: "",
    brand: "",
    weight: null,
    color: null,
    size: null,
    storeId: "",
  });
  const [error, setError] = useState({
    name: "",
    img: "",
    price: "",
    description: "",
    stock: "",
    specie: "",
    breed: "",
    brand: "",
    weight: "",
    color: "",
    size: "",
    storeId: "",
  });

  const changeHandler = (e) => {
    let property = e.target.name;
    let value = e.target.value;
    setError(ValidateProduct(property, value));
    setForm({ ...form, [property]: value });
    if (value !== "") {
      setFormComplete(true);
    } else {
      setFormComplete(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errorValues = Object.values(error);
    const isFormValid = errorValues.every((val) => val === "");
    const data = {
      ...form,
      weight: parseFloat(form.weight),
      price: parseInt(form.price),
      stock: parseInt(form.stock),
      StoreId: parseInt(form.storeId),
    };
    if (isFormValid) {
      axios.post("/products/create", data).then(() => {
        Swal.fire({
          title: "Producto creado",
          icon: "success",
          text: "El producto ha sido creado correctamente",
        });
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error en el formulario",
        text: "Por favor, revisa los campos del formulario",
      });
    }
  };
  return (
    // este es el contenedor completo
    <div className="flex min-h-screen w-full justify-center bg-[url('https://petfood.com.ar/img/cms/symphony.png')] pt-28 pb-10 ">
      {/* este es el form completo */}
      <form
        onSubmit={submitHandler}
        className="mt-10 flex max-h-screen w-full flex-col items-center   rounded-xl  bg-gradient-to-r from-[#0093E9] to-[#80D0C7] p-3 drop-shadow-2xl md:w-3/5 lg:h-auto "
      >
        <h3 className="mb-6">Sube tus productos con los datos solicitados</h3>
        {/* aca empieza el div con fondo azul que contiene la estructura del form */}
        <div className="flex w-full flex-row  justify-between overflow-hidden rounded-2xl bg-slate-50">
          {/* aca empieza el div con los inputs de la mitad izquierda */}
          <div className=" m-1 w-1/2  px-8">
            {" "}
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.name}
                name="name"
                onChange={changeHandler}
                className=" peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900   focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900"
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Nombre:
              </label>
              {error.name && <span className="text-red-500">{error.name}</span>}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="number"
                value={form.price}
                name="price"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Precio:
              </label>
              {error.price && (
                <span className="text-red-500">{error.price}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="number"
                value={form.stock}
                name="stock"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Stock:
              </label>
              {error.stock && (
                <span className="text-red-500">{error.stock}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.specie}
                name="specie"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Especie:
              </label>
              {error.specie && (
                <span className="text-red-500">{error.specie}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.breed}
                name="breed"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Raza:
              </label>
              {error.breed && (
                <span className="text-red-500">{error.breed}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.brand}
                name="brand"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Marca:
              </label>
              {error.brand && (
                <span className="text-red-500">{error.brand}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="number"
                value={form.weight}
                name="weight"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Peso:
              </label>
              {error.weight && (
                <span className="text-red-500">{error.weight}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.color}
                name="color"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Color:
              </label>
              {error.color && (
                <span className="text-red-500">{error.color}</span>
              )}
            </div>
            <div className="group relative z-0 mb-6 flex h-11 w-full">
              <input
                type="text"
                value={form.size}
                name="size"
                onChange={changeHandler}
                className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                placeholder=" "
                autoComplete="off"
              />
              <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                Tamaño:
              </label>
              {error.size && <span className="text-red-500">{error.size}</span>}
            </div>
            {formComplete && <LinkButton component={"Crear"} />}
          </div>
          {/* aca empieza el div con las imagenes del producto y la descripcion de la mitad derecha */}
          <div className="flex w-1/2 flex-col justify-center ">
            {/* aca empieza el div con el carrousel */}
            <div className=" h-1/2 ">
              {" "}
              <Carousel>
                <img
                  alt="aca se mostrara la imagen subida"
                  className="min-w-1/4  aspect-square  bg-contain"
                />
                <img
                  alt="aca se mostrara la imagen subida"
                  className="min-w-1/4 aspect-square  "
                />
                <img
                  alt="aca se mostrara la imagen subida"
                  className="min-w-1/4 aspect-square  "
                />
                <img
                  alt="aca se mostrara la imagen subida"
                  className="min-w-1/4 aspect-square  "
                />
              </Carousel>
            </div>
            {/* aca empieza el div con la descripcion */}
            <div className="h-1/2  p-8 px-8">
              <div className="group relative z-0 mb-6 flex h-11 w-full">
                <input
                  type="text"
                  value={form.img}
                  name="img"
                  onChange={changeHandler}
                  className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                  placeholder=""
                  autoComplete="off"
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                  Link de imagen:
                </label>
                {error.img && <span className="text-red-500">{error.img}</span>}
              </div>
              <div className="group relative z-0 mb-6 flex h-2/4 w-full">
                <textarea
                  type="text"
                  value={form.description}
                  name="description"
                  onChange={changeHandler}
                  className=" peer block w-full appearance-none rounded-2xl border-b-2 border-gray-100 bg-gray-100 px-1 py-4 text-sm text-gray-900   focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                  placeholder=" agregue una breve descrpcion de su producto  "
                  autoComplete="off"
                />
                <label className="absolute bottom-2 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                  Descripción:
                </label>
                {error.description && (
                  <span className="absolute -bottom-6 text-red-500">
                    {error.description}
                  </span>
                )}
              </div>
              <div className="group relative z-0 mb-6 flex h-11 w-full">
                <input
                  type="number"
                  value={form.storeId}
                  name="storeId"
                  onChange={changeHandler}
                  className="peer block w-1/2 appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-3 px-0 text-sm text-gray-900  focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-gray-900 "
                  placeholder=" "
                  autoComplete="off"
                />
                <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-gray-900 dark:text-gray-400 peer-focus:dark:text-gray-900">
                  StoreId:
                </label>
                {error.storeId && (
                  <span className="text-red-500">{error.storeId}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default FormCreateProduct;