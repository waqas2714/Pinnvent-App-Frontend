import React, { useEffect, useState } from "react";
import "./productList.css";
import { spinnerImage } from "../loader/Loader";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Search from "../search/Search";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredProducts } from "../../redux/features/product/filterSlice";
import { FILTER_PRODUCTS } from "../../redux/features/product/filterSlice";
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { deleteProduct, getProducts } from "../../redux/features/product/productSlice";
import { Link } from "react-router-dom";

const ProductList = ({ products, isLoading }) => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const [search, setSearch] = useState("");
  const shortenText = (name, n) => {
    if (name.length > n) {
      const shortenedText = name.substring(0, n).concat("...");
      return shortenedText;
    } else {
      return name;
    }
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ search, products }));
  }, [dispatch, search, products]);

  const delProduct=async(id)=>{
    await dispatch(deleteProduct(id));
    await dispatch(getProducts());
  }

  const confirmDelete=(id)=>{
    confirmAlert({
      title: 'Delete Product',
      message: 'Are you sure you want to delete this product?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => delProduct(id)
        },
        {
          label: 'Cancel'
        }
      ]
    });
  }

  //Paginate Begin
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  //Paginate End

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <h3>
              <Search
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </h3>
          </span>
        </div>
        {isLoading && <spinnerImage />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products found, please add a product...</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{shortenText(name, 11)}</td>
                      <td>{category}</td>
                      <td>
                        {"$"}
                        {price}
                      </td>
                      <td>{quantity}</td>
                      <td>
                        {"$"}
                        {price * quantity}
                      </td>
                      <td className="icons">
                        <span>
                          <Link to={`/productDetail/${_id}`}>
                          <AiOutlineEye size={20} color="purple" />
                          </Link>
                        </span>
                        <span>
                          <Link to={`/editProduct/${_id}`}>
                          <FaEdit size={20} color="green" />
                          </Link>
                        </span>
                        <span>
                          <FaTrashAlt size={20} color="red" onClick={()=>confirmDelete(_id)} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
        breakLabel="..."
        nextLabel="Next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
      </div>
    </div>
  );
};

export default ProductList;
