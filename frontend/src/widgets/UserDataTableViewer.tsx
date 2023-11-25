import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { SERVER_PORT } from '../constants';
import moment from 'moment';
import axios from 'axios';
import { Avatar, Button, Chip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'react';
import { AnyAction } from '@reduxjs/toolkit';
import { State, setLogin } from '../state';
import toast, { Toaster } from 'react-hot-toast';

const columns: GridColDef[] = [
  {
    field: 'userImg',
    headerName: 'User',
    width: 150,
    renderCell: (params) => {
      return (
        <>
          <Avatar src={`${SERVER_PORT}/images/${params.row?.userImg}`} />
          <span style={{ marginLeft: '3px' }}>{params.row.username}</span>
        </>
      );
    },
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 80,
    editable: true,
  },
  {
    field: 'phoneNumber',
    headerName: 'Phone Number',
    sortable: false,
    width: 120,
  },
  {
    field: 'accepted',
    headerName: 'Accepted',
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <Chip
        label={params.row.accepted ? 'Accepted' : 'Not Accepted'}
        color={params.row.accepted === false ? 'warning' : 'primary'}
      />
    ),
  },
  {
    field: 'userDocs',
    headerName: 'User Documents',
    sortable: false,
    width: 120,
    renderCell: (params) => (
      <a
        target="blank"
        href={`${SERVER_PORT}/docs/${params.row.userDocs}`}
        style={{ color: '#001f3f', fontWeight: '700' }}
      >
        User PDF
      </a>
    ),
  },
  {
    field: 'createdAt',
    headerName: 'Registered On',
    width: 150,
    valueGetter: (params) =>
      moment(params.row.createdAt, 'YYYY-MM-DD hh:mm:ss+ZZ').format(
        'DD/MM/YYYY'
      ),
  },
  {
    field: '_id',
    headerName: 'User Actions',
    width: 200,
    renderCell: (params) => RenderUserActionButtons(params),
  },
];

const RenderUserActionButtons = (params: {
  row: { accepted: boolean; _id: string; username: string };
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state: State) => state.token);

  return (
    <>
      <Button
        onClick={() => onDeleteUser(params.row)}
        variant="contained"
        color={'error'}
      >
        Delete
      </Button>

      <Button
        onClick={() => onAcceptUser(token, dispatch, params.row)}
        variant="contained"
        color={!params.row.accepted ? 'success' : 'warning'}
        sx={{ ml: 1 }}
      >
        {!params.row.accepted ? 'Accept' : 'Decline'}
      </Button>
    </>
  );
};

const onDeleteUser = (rowData: { username: string; _id: string }) => {
  toast.promise(axios.delete(`${SERVER_PORT}/auth/user/${rowData._id}`), {
    loading: 'Deleting user...',
    error: 'Error deleting user. Please try again.',
    success: 'User deleted successfully!',
  });
};

const onAcceptUser = (
  token: string,
  dispatch: Dispatch<AnyAction>,
  rowData: { _id: string; accepted: boolean }
) => {
  toast
    .promise(
      axios.patch(`${SERVER_PORT}/auth/acceptance-status/${rowData._id}`, {
        acceptanceStatus: !rowData.accepted,
      }),
      {
        loading: `${!rowData.accepted ? 'Accepting' : 'Declining'} user...`,
        error: `Error ${
          !rowData.accepted ? 'accepting' : 'declining'
        } user. Please try again.`,
        success: `User ${
          !rowData.accepted ? 'accepted' : 'declined'
        }  successfully!`,
      }
    )
    .then((res) => {
      dispatch(setLogin({ user: res.data.user, token }));
    });
};

const UserDataTableViewer = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      axios.get(`${SERVER_PORT}/auth/`).then((res) => res.data.users),
  });

  if (isPending) return 'Loading...';

  if (error) console.warn(error.message);

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <Toaster />
      <DataGrid
        rows={data}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default UserDataTableViewer;
