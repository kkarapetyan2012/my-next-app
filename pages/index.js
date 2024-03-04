// // // pages/index.js
// // import { useSelector, useDispatch } from 'react-redux';
// // import { deleteUser } from '../store/usersSlice';
// // import UserForm from '../components/UserForm';
// // import Link from 'next/link';

// // export default function Home() {
// //   const users = useSelector((state) => state.users.users);
// //   const dispatch = useDispatch();

// //   return (
// //     <div>
// //       <UserForm />
// //       <ul>
// //         {users.map(user => (
// //           <li key={user.id}>
// //             {user.name} {user.lastName} - {user.email}
// //             <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
// //             <Link href={`/users/${user.id}`}>
// //               Edit
// //             </Link>
// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }

// // 'use client'
// // // pages/index.js
// // import { useEffect, useMemo, useState } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { addUser, deleteUser } from '../store/usersSlice';
// // import UserForm from '../components/UserForm';
// // import Link from 'next/link';

// // export default function Home({ initialUsers }) {
// //   const dispatch = useDispatch();
// //   const [searchQuery, setSearchQuery] = useState('');
// //   // const { users, isLoading } = useSelector((state) => state.users.users);
// //   const users = useSelector((state) => state.users.users);

// //   // Filter items based on the search query
// //   const filteredItems = useMemo(() => {
// //     if (!searchQuery) return users;

// //     // Convert search query to lowercase for case-insensitive comparison
// //     const lowercasedQuery = searchQuery.toLowerCase();

// //     // Filter items that match the query in any field
// //     return users.filter((user) =>
// //       Object.values(user).some(
// //         (value) =>
// //           typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery)
// //       )
// //     );
// //   }, [users, searchQuery]);

// //   // Hydrate the store with the initial server-side fetched users
// //   // useEffect(() => {
// //   //   if (initialUsers.length > 0) {
// //   //     initialUsers.forEach(user => {
// //   //       dispatch(addUser(user));
// //   //     });
// //   //   }
// //   // }, [dispatch, initialUsers]);

// //   useEffect(() => {
// //     if (initialUsers.length > 0) {
// //       initialUsers.forEach(user => {
// //         dispatch(addUser(user));
// //       });
// //     }
// //   }, [dispatch, initialUsers]);

// //   return (
// //     <div>
// //       <UserForm />
// //       <input
// //         type="text"
// //         placeholder="Search items..."
// //         value={searchQuery}
// //         onChange={(e) => setSearchQuery(e.target.value)}
// //       />
// //       {filteredItems.length > 0 ? (
// //       <ul className='user-list'>
// //         {/* {!searchQuery ? filteredItems.map(user => (
// //           <li className='user-item' key={user.id}>
// //             {user.name} {user.lastName} - {user.email} - {user.phone} - {user.address}
// //             <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>
// //             <Link href={`/users/${user.id}`}>
// //               Edit
// //             </Link>
// //           </li>
// //         )): <li>not match</li>} */}
// //         {filteredItems.map((user) => (
// //           <li key={user.id}>{user.name} {user.lastName} - {user.email} - {user.phone} - {user.address} {' '} 
// //           <button onClick={() => dispatch(deleteUser(user.id))}>Delete</button>{' '}
// //           <Link href={`/users/${user.id}`}>
// //             Edit
// //           </Link></li>
// //         ))}
// //       </ul>): (
// //         <p>No match found.</p> // Displayed when no items match the search query
// //       )}
// //     </div>
// //   );
// // }

// // // This function runs on the server for each request
// // export async function getServerSideProps(context) {
// //   // Fetch data from an API or other data source

// //   const initialUsers = [];
  
// //   // Return the initialUsers as props
// //   return {
// //     props: { initialUsers }, // will be passed to the page component as props
// //   };
// // }

// pages/index.js
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser } from '../store/usersSlice';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function Home({ initialUsers }) {
  const dispatch = useDispatch();
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const users = useSelector((state) => state.users.users);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return users;

    const lowercasedQuery = searchQuery.toLowerCase();

    return users.filter((user) =>
      Object.values(user).some(
        (value) =>
          typeof value === 'string' && value.toLowerCase().includes(lowercasedQuery)
      )
    );
  }, [users, searchQuery]);

  // useEffect(() => {
  //   if (initialUsers.length > 0) {
  //     initialUsers.forEach(user => {
  //       dispatch(addUser(user));
  //     });
  //   }
  //   console.log('initialUsers', initialUsers)
  // }, [dispatch, initialUsers]);

  useEffect(() => {
    // Fetch data from localStorage
    if (typeof window !== 'undefined') {
      const storedUsers = localStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        users.forEach(user => {
          dispatch(addUser(user));
        });
      }
      setInitialLoaded(true);
    }
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <section>
      <UserForm />
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <UserList users={filteredItems} onDelete={handleDelete} />
      
    </section>
  );
}

// getServerSideProps remains the same
// This function runs on the server for each request
export async function getServerSideProps(context) {
  // Fetch data from an API or other data source

  const initialUsers = [];
  
  // Return the initialUsers as props
  return {
    props: { 
      initialUsers
    }, // will be passed to the page component as props
  };
}

// // pagesindex.js
// export async function getServerSideProps(context) {
//   try {
//     const initialUsers = await fetchData();
//     return {
//       props: { initialUsers },
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: { initialUsers: [] },
//     };
//   }
// }




// // pages/index.js
// import { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { addUser, deleteUser } from '../store/usersSlice';
// import UserForm from '../components/UserForm';
// import UserList from '../components/UserList';
// import { getInitialUsers } from '../utils/localStorage';

// export default function Home({ initialUsers }) {
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users.users);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Hydrate Redux store with initialUsers from props
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//     initialUsers.forEach(user => {
//       dispatch(addUser(user));
//     })}
//   }, [dispatch, initialUsers]);

//   // Filter users based on search query
//   const filteredUsers = useMemo(() => {
    
//       if (!searchQuery) return users;
//       const lowerCaseQuery = searchQuery.toLowerCase();
//       return users.filter(user =>
//         Object.values(user).some(
//           value => typeof value === 'string' && value.toLowerCase().includes(lowerCaseQuery)
//         )
//       );
    
//   }, [users, searchQuery]);

//   const handleDeleteUser = (userId) => {
//     dispatch(deleteUser(userId));
//   };

//   return (
//     <div>
//       <UserForm />
//       <input
//         type="text"
//         placeholder="Search users..."
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//       />
//       <UserList users={filteredUsers} onDeleteUser={handleDeleteUser} />
//     </div>
//   );
// }

// // This function runs on the server for each request
// export async function getServerSideProps(context) {
//   const initialUsers = getInitialUsers();
  
//   return {
//     props: { initialUsers },
//   };
// }

// // // This function runs at build time on the server
// // export async function getStaticProps() {
// //   // Fetch initial user data from wherever it's stored (e.g., localStorage)
// //   const initialUsers = getInitialUsers();

// //   return {
// //     props: { initialUsers },
// //   };
// // }