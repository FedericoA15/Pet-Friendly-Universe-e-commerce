const { Adoption, User, InstagramPosts } = require("../../db");

const createAdoption = async (userId, data) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error(`No se pudo encontrar el usuario con ID ${userId}`);
  }
  const newAdoption = await Adoption.create(
    {
      description: data.description,
      province: data.province,
      img: data.img,
      locality: data.locality,
      UserId: userId,
    },
    {
      include: User,
    }
  );
  const adoptionWithUser = await Adoption.findByPk(newAdoption.id, {
    include: {
      model: User,
      attributes: [
        "name",
        "lastname",
        "user",
        "area_code",
        "number",
        "img",
        "mail",
      ],
    },
  });
  return adoptionWithUser;
};

const getAllAdoptions = async (page, pq) => {
  const offset = (page - 1) * pq;
  const adoptionList = await Adoption.findAll({
    where: { enable: true },
    limit: pq,
    offset: offset,
    include: {
      model: User,
      as: "User",
      attributes: ["name", "img", "area_code", "number", "lastname", "user"], // Agrega aquí los atributos que deseas obtener del usuario
    },
  });
  const count = await Adoption.count();
  const quantity = Math.ceil(count / pq);

  return { adoptionList, quantity };
};

const createInstagramPost = async (data) => {
  const post = await InstagramPosts.create(data);
  return post;
};
const getInstagramPost = async (page, pq) => {
  const offset = (page - 1) * pq;

  const adoptionListInstagram = await InstagramPosts.findAll({
    where: { enable: true },
    limit: pq,
    offset: offset,
  });
  const count = await InstagramPosts.count();

  const quantity = Math.ceil(count / pq);

  return { adoptionListInstagram, quantity };
};

const getInstagramDelete = async (id) => {
  const update = await InstagramPosts.update(
    { enable: false },
    { where: { id: id } }
  );
  const instragramDelete = await InstagramPosts.findOne({ where: { id: id } });

  return instragramDelete;
};
const getPostDelete = async (id) => {
  const update = await Adoption.update(
    { enable: false },
    { where: { id: id } }
  );
  const postDelete = await Adoption.findOne({ where: { id: id } });

  return postDelete;
};

module.exports = {
  createAdoption,
  getAllAdoptions,
  createInstagramPost,
  getInstagramPost,
  getInstagramDelete,
  getPostDelete,
};
