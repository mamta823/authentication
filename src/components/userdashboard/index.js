import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Services from '../../services';
import "../../components/index.css"
// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function UserDashboard() {
    const [user, setUser] = React.useState([])
    const userDetail = async () => {
        const response = await Services.getUser()
        console.log(response.data, "ressssss")
        if (response) {
            setUser(response.data)
        }
    }
    React.useEffect(() => {
        userDetail()
    }, [])
    console.log(user, "user")
    const handleDelete = async (id) => {
        console.log(id, "idd")
        const response = await Services.deleteUser(id)
        console.log(response, "delete")

    }
    const handleUpdate = () => {

    }
    return (
        <>
            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell align="right">Update user</TableCell>
                                <TableCell align="right">Delete user</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell onClick={() => handleUpdate()} align="right">Update</TableCell>
                                    <TableCell onClick={() => handleDelete(row.id)} align="right">Delete</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}