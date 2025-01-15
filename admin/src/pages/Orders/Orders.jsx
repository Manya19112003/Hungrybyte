import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      await fetchAllOrders();
      toast.success('Order status updated');
    } else {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className="order-container">
      <h3>Orders</h3>
      <div className="order-table">
        <div className="order-header">
          <span>Image</span>
          <span>Items</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Status</span>
        </div>
        {orders.map((order, index) => (
          <div key={index} className="order-row">
            <img src={assets.parcel_icon} alt="Parcel" />
            <div className="order-details">
              <p>
                {order.items.map((item, i) =>
                  i === order.items.length - 1
                    ? `${item.name} x ${item.quantity}`
                    : `${item.name} x ${item.quantity}, `
                )}
              </p>
              <p>Items: {order.items.length}</p>
            </div>
            <p>
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="order-status"
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
