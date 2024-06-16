import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsImages } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";

const AddProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Body Care",
    },
    {
      id: 2,
      name: "Fragrance",
    },
    {
      id: 3,
      name: "Hair Care",
    },
    {
      id: 4,
      name: "MakeUp",
    },
    {
      id: 5,
      name: "Men's Care",
    },
    {
      id: 6,
      name: "Skin Care",
    },
    {
      id: 7,
      name: "Wellbeing",
    },
  ];

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const [cateShow, setCatShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categories); // Initialize allCategory with categories array
  const [searchValue, setSearchValue] = useState("");

  const categorySearch = (e) => {
    const value = e.target.value;
    const filteredCategories = categories.filter((c) =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setAllCategory(filteredCategories);
    setSearchValue(value);
  };
const [images,setImages]= useState([])
const [imageShow,setImageShow]= useState([])
  const imageHandle =(e) => {
    const files = e.target.files
    const length = files.length;

    if(length>0){
      setImages([...images,...files])
      let imageUrl = []

      for(let i=0; i<length;i++){
        imageUrl.push({url : URL.createObjectURL(files[i])})
      }
      setImageShow([...imageShow,...imageUrl])
    }

  }
 
const changeImage = (img,index)=>{
  if(img){
    let tempUrl = imageShow
    let tempImages = images

    tempImages[index] = img
    tempUrl[index] = { url: URL.createObjectURL(img) };

    setImageShow([...tempUrl])
    setImages([...tempImages])
  }
}
const removeImage = (i)=>{
  const filterImage = images.filter((img,index) => index !==i)
  const filterImageUrl = imageShow.filter((img,index) => index !==i)
setImages (filterImage)
setImageShow(filterImageUrl)
}
  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#283046] rounded-md pb-4">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#d0d2d6] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-blue-500 hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-sm px-7 py-2 my-2"
            to={"/seller/dashboard/products"}
          >
            Products
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  onChange={inputHandle}
                  value={state.name}
                  type="text"
                  placeholder="product name"
                  name="name"
                  id="name"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand Name </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  onChange={inputHandle}
                  value={state.brand}
                  type="text"
                  placeholder="product brand"
                  name="brand"
                  id="brand"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] ">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category </label>
                <input
                  readOnly
                  onClick={() => setCatShow(!cateShow)}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  value={category}
                  type="text"
                  placeholder="--- Select Category ---"
                  id="category"
                />
                {cateShow && (
                  <div
                    className={`absolute top-[101%] bg-slate-700 w-full transition-all ${
                      cateShow ? "scale-100" : "scale-0"
                    }`}
                  >
                    <div className="w-full px-4 py-2 fixed">
                      <input
                        onChange={categorySearch}
                        value={searchValue}
                        className="px-3 py-1 w-full focus:border-indigo-500 outline-none bg-transparent border border-slate-700 rounded-md text-[#d0d2d6] overflow-hidden"
                        type="text"
                        placeholder="search"
                      />
                    </div>
                    <div className="pt-14">
                      <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scroll">
                        {allCategory.map((c, i) => (
                          <span
                          className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg hover:shadow-indigo-500/50 w-full cursor-pointer ${category === c.name && 'bg-indigo-500 '}`}
                            key={i}
                            onClick={() => {
                              setCatShow(false);
                              setCategory(c.name);
                              setSearchValue("");
                            }}
                          >
                            {c.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  onChange={inputHandle}
                  value={state.stock}
                  type="number"
                  min="0"
                  placeholder="product stock"
                  name="stock"
                  id="stock"
                />
              </div>
            </div>

            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-[#d0d2d6] ">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  onChange={inputHandle}
                  value={state.price}
                  type="number"
                  placeholder="product price"
                  name="price"
                  id="price"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount </label>
                <input
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] "
                  onChange={inputHandle}
                  value={state.discount}
                  type="number"
                  placeholder="%discount%"
                  name="discount"
                  id="discount"
                />
              </div>
            </div>

            <div className="flex flex-col w-full gap-1 text-[#d0d2d6]">
                <label htmlFor="description">Description </label>
                <textarea rows={4}
                  className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#283046] border border-slate-700 rounded-md text-[#d0d2d6] mb-4"
                  onChange={inputHandle}
                  value={state.description}
              
                  placeholder="product description"
                  name="description"
                  id="description"
                >

                </textarea>
              </div>
              <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 xs:gap-4 gap-3 w-full text-[#d0d2d6] mb-4">
                {
                  imageShow.map((img,i)=> <div className="h-[180px] relative">
                    <label htmlFor={i}>
                      <img className="w-full h-full rounded-sm" src={img.url} alt="" />
                    </label>
                    <input onChange={(e)=> changeImage(e.target.files[0],i)} type="file"  id={i} className="hidden"/>
                    <span onClick={()=>removeImage(i)} className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"><IoCloseSharp /></span>
                  </div>)
                }
                <label className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dasshed hover:border-indigo-500 w-full text-[#d0d2d6]" htmlFor="image">
                  <span><BsImages/></span>
                  <span>Select Image</span>
                </label>
                <input multiple onChange={imageHandle} className="hidden" type="file" id="image" />
              </div>
              <div className="flex">
                  <button className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg text-white rounded-md px-7 py-2 my-2">
                    Add Product
                  </button>
                </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
