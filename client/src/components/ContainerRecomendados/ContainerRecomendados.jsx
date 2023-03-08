import useGetProducts from "../../hooks/useGetProducts";
import CardRecomendados from "../CardRecomendados/CardRecomendados";
function ContainerRecomendados() {
  const [loading, products] = useGetProducts();
  const productos = products.slice(0.5);

  return (
    <div className="flex gap-2 overflow-hidden">
      {products?.length === 0 ? (
        <h2>No se encontraron coincidencias con los datos solicitados</h2>
      ) : (
        products?.map((product) => {
          return (
            <CardRecomendados
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              weight={product.weight}
              price={product.price}
              stock={product.stock}
            />
          );
        })
      )}
    </div>
  );
}

export default ContainerRecomendados;
