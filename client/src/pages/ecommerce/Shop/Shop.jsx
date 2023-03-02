import Paginator from "../../../components/Paginator/Paginator";
import Filters from "./components/Filters/Filters";
import Recomendados from "../../../components/Recomendados/Recomendados";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeShop({ brands }) {
  const navigate = useNavigate();
  const serarchParams = new URLSearchParams(window.location.search);
  const id = serarchParams.get("i");
  const token = serarchParams.get("t");
  useEffect(() => {
    if (id && token) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      navigate("/shop");
    }
  }, []);

  return (
    <div className="scrollbar scrollbar-rounded-xl scrollbar-thumb-blue-500 scrollbar-track-blue-300 w-full bg-[url('https://petfood.com.ar/img/cms/symphony.png')] lg:flex lg:min-h-screen lg:flex-col lg:gap-12 lg:bg-slate-500 lg:pt-16 xl:items-center">
      <Recomendados />
      <div className="gap-10  lg:mx-auto lg:flex lg:h-full lg:w-full lg:gap-0 lg:px-4 xl:min-h-screen xl:gap-0 2xl:pl-10">
        <div className="h-fit w-full border-2  lg:top-[115px]  lg:mt-[70px] lg:flex lg:w-64 lg:border-2 lg:border-[#645e9d] lg:p-2 lg:pl-2 xl:w-64 ">
          <Filters />
        </div>

        <Paginator />
      </div>
    </div>
  );
}
