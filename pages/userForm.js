// pages/userForm.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';
// import { updateUser } from '../store/userSlice';

export default function UserForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bday: '',
    email: '',
    task: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({
//       firstName: formData.firstName,
//       lastName: formData.lastName,
//       bday: formData.bday,
//       email: formData.email,
//     }));
//     if (formData.task) {
//       dispatch(addTask({ name: formData.task }));
//     }
//     // Reset task field
//     setFormData(prevState => ({ ...prevState, task: '' }));
//   };

const handleSubmit = (e) => {
    e.preventDefault();
    if (existingUser) {
      dispatch(updateUser({ ...userData, id: existingUser.id }));
      router.push('/'); // Redirect to the home page or another page
    } else {
      dispatch(addUser(userData));
      // Optionally clear the form or redirect
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="date"
        name="bday"
        placeholder="Birthday"
        value={formData.bday}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="task"
        placeholder="Add a task"
        value={formData.task}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
