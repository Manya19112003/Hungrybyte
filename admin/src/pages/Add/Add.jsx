import React, { useState } from 'react';
import './Add.css';
import { assets, url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Salad',
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Image not selected');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      toast.success(response.data.message);
      setData({ name: '', description: '', price: '', category: data.category });
      setImage(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="add">
      <h2 className="add-title">Add New Food Item</h2>
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <input
            type="file"
            accept="image/*"
            id="image"
            hidden
            onChange={(e) => {
              setImage(e.target.files[0]);
              e.target.value = '';
            }}
          />
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload"
            />
          </label>
        </div>
        <div className="add-input-group">
          <label>Product Name</label>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Enter product name"
            required
          />
        </div>
        <div className="add-input-group">
          <label>Product Description</label>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            placeholder="Enter product description"
            rows="5"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-input-group">
            <label>Category</label>
            <select name="category" onChange={onChangeHandler}>
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Desserts">Desserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-input-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="Enter price"
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
