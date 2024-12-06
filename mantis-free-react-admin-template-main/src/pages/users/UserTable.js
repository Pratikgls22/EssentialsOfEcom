import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TablePagination } from '@mui/material';
import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';

// ==============================|| USER TABLE - HEADER ||============================== //

const headCells = [
  { id: 'id', align: 'center', label: 'ID' },
  { id: 'userName', align: 'center', label: 'User Name' },
  { id: 'email', align: 'center', label: 'Email' },
  { id: 'address', align: 'center', label: 'Address' },
  { id: 'roleName', align: 'center', label: 'Role Name' }
];

function UserTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.align} sx={{ border: '1px solid #ddd', backgroundColor: 'black', color: 'white' }}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

UserTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| USER TABLE COMPONENT ||============================== //

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchUsers = async (pageNo, pageSize) => {
    setLoading(true);
    setError('');
    try {
      // Retrieve the token from cookies
      const token = Cookies.get('authToken');
      console.log(token);

      if (!token) {
        // eslint-disable-next-line no-unreachable
        setTimeout(() => (window.location.href = '/login'), 3000);
        throw new Error('Authentication token is missing. Please log in again.');
      }

      // // Decode the token to extract user details
      // const decodedToken = jwtDecode(token);
      // console.log('Decoded Token:', decodedToken);
      //
      // // Check if the user's role is ROLE_ADMIN
      // if (decodedToken.roleName !== 'ROLE_ADMIN') {
      //   setTimeout(() => (window.location.href = '/accessDenied'), 3000);
      //   throw new Error('Access Denied. You do not have the required role.');
      // }

      const response = await fetch(
        `http://localhost:8080/api/v1/user/searchUser?pageNo=${pageNo}&pageSize=${pageSize}&sortBy=Id&sortOrder=ASC`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', // Set the content type for the API
            Authorization: `Bearer ${token}` // Pass the token in the Authorization header
          }
        }
      );
      console.log('Response for UserTable:', response);
      if (!response.ok) {
        // eslint-disable-next-line no-unreachable
        setTimeout(() => (window.location.href = '/userTable'), 3000);
        throw new Error('Failed to fetch users');
      }
      const data = await response.json();
      setUsers(data.data); // Assuming API returns a `content` field with user data
      setTotalUsers(data.length); // Assuming API has `totalElements` for total users
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, newPage) => {
    console.log('Page changed to:', newPage);
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
  }, [page, rowsPerPage]);

  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center', // Centers the text horizontally
          my: 4 // Adds top and bottom margin (shorthand for marginY)
        }}
      >
        User Management
      </Typography>
      {loading && <Typography variant="body1">Fetching user data...</Typography>}
      {error && <Typography color="error" variant="body1">{`Error: ${error}`}</Typography>}
      {!loading && !error && (
        <TableContainer
          sx={{
            width: '100%',
            overflowX: 'auto',
            position: 'relative',
            display: 'block',
            maxWidth: '1000px',
            margin: '0 auto', // Centers the table horizontally
            '& td, & th': { whiteSpace: 'nowrap' }
          }}
        >
          <Table
            sx={{
              // textAlign: 'center', // Centers the text horizontally
              // my: 3, // Adds top and bottom margin (shorthand for marginY)
              margin: '0 auto' // Centers the table horizontally
            }}
          >
            <UserTableHead />
            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' },
                    '&:hover': { backgroundColor: '#f1f1f1' },
                    borderBottom: '1px solid #ddd' // Adds border to rows
                  }}
                >
                  <TableCell align="left" sx={{ border: '1px solid #ddd' }}>
                    {user.id}
                  </TableCell>
                  <TableCell align="left" sx={{ border: '1px solid #ddd' }}>
                    {user.userName}
                  </TableCell>
                  <TableCell align="left" sx={{ border: '1px solid #ddd' }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="left" sx={{ border: '1px solid #ddd' }}>
                    {user.address}
                  </TableCell>
                  <TableCell align="left" sx={{ border: '1px solid #ddd' }}>
                    {user.roleName}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalUsers}
            rowsPerPage={rowsPerPage}
            page={page}
            nextIconButtonProps
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            sx={{ borderTop: '1px solid #ddd', padding: '10px' }}
          />
        </TableContainer>
      )}
    </Box>
  );
};

export default UserTable;
