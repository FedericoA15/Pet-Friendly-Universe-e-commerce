import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Detail from "./Components/Detail/Detail";
import { getWalkerByIdApi } from "../../../../redux/features/services/servicesActions";

function ServicesDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const walker = useSelector((state) => state.Services?.walkerId);
  useEffect(() => {
    dispatch(getWalkerByIdApi(id));
  }, []);

  return (
    <div className="pt-10">
      <div>
        <div className="pb-10">
          <Detail
            name={walker?.name}
            img={walker?.img}
            price_hour={walker?.price_hour}
            province={walker?.province}
            locality={walker?.locality}
            area_code={walker?.area_code}
            number={walker?.number}
            mail={walker?.mail}
          />
        </div>
      </div>
    </div>
  );
}

export default ServicesDetail;
