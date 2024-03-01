// components/UserForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../store/usersSlice';
import { useRouter } from 'next/router'

const UserForm = ({ existingUser }) => {
    const router = useRouter();

  const [userData, setUserData] = useState(existingUser || {
    name: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingUser) {
      dispatch(updateUser(userData));
      router.push('/');
      setUserData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    } else {
      dispatch(addUser(userData));
      setUserData({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
      });
    }
    // Reset form or give feedback
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="Name" />
      <input type="text" name="lastName" value={userData.lastName} onChange={handleChange} placeholder="Last Name" />
      <input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" />
      <input type="tel" name="phone" value={userData.phone} onChange={handleChange} placeholder="Phone" />
      <input type="text" name="address" value={userData.address} onChange={handleChange} placeholder="Address" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
