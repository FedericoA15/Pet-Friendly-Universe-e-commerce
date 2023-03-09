import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import React, { useState } from "react";
import { Tabs } from "flowbite-react";
import CountProduct from "../../../components/CountProduct/CountProduct";
import cardCredit from "../../../assets/cardCredit/cardCredit.svg";
import transport from "../../../assets/transport/transport.svg";
import { addNewProdShopCard } from "../../../redux/features/products/productsSlice";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import useGetProductInfo from "./hooks/useGetProductInfo";
import QualificationStars from "./components/QualificationStars/QualificationStars";
import Comments from "./components/Comments/Comments";

function ProductDetail() {
  window.scrollTo(0, 0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(1);

  const shopCartProducts = useSelector((state) => state.Products?.shopCart);
  const auxCartAmount = shopCartProducts[id] ? shopCartProducts[id].amount : 0;

  const [product, comments, qualification, loading] = useGetProductInfo(id);
  const rating =
    !!qualification?.[0].avg && parseFloat(qualification?.[0].avg).toFixed(2);

  const handleClickDeduct = () => {
    if (amount > 1) setAmount(amount - 1);
  };
  const handleClickAdd = () => {
    if (auxCartAmount + amount < product?.stock) {
      setAmount(amount + 1);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Has alcanzado el limite de stock",
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  const handleClickAddProduct = async () => {
    if (auxCartAmount + amount <= product?.stock) {
      dispatch(
        addNewProdShopCard({
          ...product,
          amount: amount,
        })
      );
      await Swal.fire({
        icon: "success",
        title: "Tu producto ha sido agregado con éxito!",
        showConfirmButton: false,
        timer: 800,
      });
      setAmount(1);
    } else {
      await Swal.fire({
        icon: "error",
        title: "No hay stock disponible",
        showConfirmButton: false,
        timer: 800,
      });
    }
  };

  if (loading) return <ProductDetailSkeleton />;

  return (
    <div className=" flex min-h-screen w-full flex-col items-center justify-center  bg-adopcion pt-20">
      <div className=" max-w-[60vw] ">
        <div className="flex flex-col md:flex-col lg:flex-row">
          <picture className="block w-full items-center justify-center lg:w-6/12">
            <img src={product?.img} alt="" className="w-[460px] " />
          </picture>
          <div className="inline-block w-full lg:w-6/12 ">
            <h2 className="font-bold md:text-2xl lg:text-3xl">
              {product?.name}
            </h2>
            <button className="text-xs">{product?.brand}</button>
            <span className="text-xs">-Código del producto:{product?.id}</span>
            {/* --------------------------------------     [ Stars ]     ------------------------------------------ */}
            {!!rating ? (
              <div className="-mt-3">
                <QualificationStars rating={rating} />
              </div>
            ) : (
              <p className="text-xs text-gray-400">Sin calificación</p>
            )}
            <div className="flex flex-col flex-wrap items-start gap-4 md:flex-row md:gap-8">
              <h3 className="font-semibold">{"$" + product?.price}</h3>
              <button className="flex items-center text-[12px] font-bold uppercase text-pink-700">
                <img className="pr-2" src={cardCredit} alt="" /> Ver medios de
                pagos
              </button>
              <button className="flex items-center text-[12px] font-bold uppercase text-pink-700">
                <img className="pr-2" src={transport} alt="" />
                Producto con envio gratis
              </button>
            </div>
            <span className="text-xs">({product?.price + "x Kg"})</span>
            <div className="mt-1 flex">
              <h3 className="text-lg font-semibold">Tamaño: </h3>
              <p className="pl-1 text-lg font-semibold">
                {product?.weight + "kg"}
              </p>
            </div>

            <p className="mt-1 border-b border-b-black text-lg font-semibold">
              Stock: {product?.stock - auxCartAmount}
            </p>
            <div className="mt-2 w-2/4">
              <span className="mt-1 text-lg font-semibold">
                Seleccione Cantidad:
              </span>
              <CountProduct
                handleClickDeduct={handleClickDeduct}
                handleClickAdd={handleClickAdd}
                value={amount}
              />
            </div>
            <button
              className="my-2 rounded-lg bg-[#4dbb47] py-2 px-4 text-lg font-normal text-white hover:bg-[#3d9338] md:min-w-full lg:w-1/2"
              onClick={handleClickAddProduct}
            >
              Añadir al carrito
            </button>
            <div className="text-sm">
              <p className="text-lg font-semibold">Opciones de Envío</p>
              <div className="pl-2">
                <p className="mt-1 text-base font-semibold">
                  Envío a Domicilio{" "}
                </p>
                <p className="md:text-xs lg:text-sm ">
                  Envío gratis +$7500 en CABA y zonas de GBA. No aplica para
                  envíos al Interior
                </p>
                <p className="mt-2 text-base font-semibold">Envío Flash:</p>
                <p className="text-sm">
                  Envíos a todo CABA y zonas seleccionadas de AMBA.
                </p>
                <p className="mt-2 text-base font-semibold">
                  Retiro en Sucursal:
                </p>
                <p className="text-sm">
                  Retirá sin cargo por tu sucursal preferida
                </p>
              </div>
              <Link to={"/shop"}>
                <button className="mt-6 rounded-md bg-ultraviolet p-2 text-lg text-white hover:bg-russianviolet">
                  Volver a la tienda
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 h-full min-h-[200px] w-full bg-gray-100">
        <Tabs.Group aria-label="Tabs with underline" style="underline">
          <Tabs.Item title="Descripción">
            <div className="m-4 w-[60%] rounded-md bg-slate-50 p-4 ">
              <p className="font-normal text-gray-600">
                {product?.description}
              </p>
            </div>
          </Tabs.Item>
          <Tabs.Item title="Comentarios">
            <Comments comments={comments} />
          </Tabs.Item>
          <Tabs.Item title="Vendedor">
            <StoreDetail />
          </Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
}
export default ProductDetail;
