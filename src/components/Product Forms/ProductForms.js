import React from "react";
import "./ProductForms.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../card/Card";


const ProductForms = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {

  return( 
  <div className="add-product">
    <Card cardClass={"card"}>

      
      <form onSubmit={saveProduct}>
        <Card cardClass={"group"}>
          <label>Product Image</label>
          <code className="--color-dark">
            Supported formats: jpg, jpeg, png
          </code>
          <input type="file" name="image" onChange={(e)=>handleImageChange(e)} />
          {imagePreview != null ? (
            <div className="image-preview">
              <img src={imagePreview} alt="Product" />
            </div>
          ) : (<p>No image set for this product.</p>)}
        </Card>

        <label >Product Name: </label>
        <input type="text" placeholder="Product Name" name="name" value={product?.name} onChange={handleInputChange} />

        <label >Product Category: </label>
        <input type="text" placeholder="Category" name="category" value={product?.category} onChange={handleInputChange} />

        <label >Product Price: </label>
        <input type="text" placeholder="Price" name="price" value={product?.price} onChange={handleInputChange} />

        <label >Product Quantity: </label>
        <input type="text" placeholder="Quantity" name="quantity" value={product?.quantity} onChange={handleInputChange} />

        <label>Product Description:</label>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={ProductForms.modules}
            formats={ProductForms.formats}
          />

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
      </form>
    </Card>
  </div>
)};

ProductForms.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForms.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];


export default ProductForms;
