import axios from "./axiosUrl";

 const ProfileData = (setUserData, setAddress, setOrder) => {
    if (localStorage.getItem("token")?.length === 171) {
        try {
          axios
          .get("/profile", {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((data) => {
            setUserData(data.data.user);
  
            axios(`/address/${data.data.user._id}`, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
              .then((res) =>
                setAddress(res.data.address[0])
              )
              .catch((err) => console.log(err.response.data));
  
            axios(`/orders/${data.data.user._id}`, {
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }).then((res) => setOrder(res.data.orders));
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        return;
      }

}

export const languageProduct = (lang : any , setProducts : any ) => {
  return (
    axios.get("/products").then((res) => {
      
      const product = res.data.map((item: any) => {
        if (lang === "ar") {
          return {
            _id: item._id,
            name: item.name[0],
            price: item.price,
            description: item.description[0],
            images: item.images,
            category: item.category,
            stock: item.stock,
            brand: item.brand,
            color : item.color,
            size : item.size,
          };
        }  else if (lang === "de") {
          return {
            _id: item._id,
            name: item.name[2],
            price: item.price,
            description: item.description[2],
            images: item.images,
            category: item.category,
            stock: item.stock,
            brand: item.brand,
            color : item.color,
            size : item.size,
          };
        } else {
          return {
            _id: item._id,
            name: item.name[1],
            price: item.price,
            description: item.description[1],
            images: item.images,
            category: item.category,
            stock: item.stock,
            brand: item.brand,
            color : item.color,
            size : item.size,
          };
        }
      });
      setProducts(product);
    })
  );
}



export default ProfileData;