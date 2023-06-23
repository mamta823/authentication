import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Services from '../../services';
import "../../components/index.css"
import Deleteuser from '../Deleteuser';
import Updatusermodal from '../Updateusermodal';
import capitalizeFirstLetter from '../../utils/capitalizeFirstLetter';
// 
import ControlledAccordions from '../Userexpand';
import LoaderContext from '../../context/LoaderProvider';
import SearchAppBar from '../Searchbar';
import PaginationRounded from '../PaginationForUsers';
import { Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function UserDashboard(props) {
    const [user, setUser] = React.useState([])
    const [showdeletemodal, setShowdeletemodal] = React.useState(false)
    const [show, setShow] = React.useState()
    const [userid, setUserid] = React.useState('')
    const [editdata, setEditdata] = useState()
    const [filtereddata, setFiltereddata] = useState()
    const { setIsLoading } = useContext(LoaderContext);
    const [search, setSearch] = useState("")
    const [msg, setMsg] = useState()
    const [page, setPage] = useState(1);
    const perPageCount = 8
    const handlePage = (page) => setPage(page);

    //func to list all users
    const userDetail = async () => {
        setIsLoading(true)
        const response = await Services.getUser()
        if (response) {
            setIsLoading(false)
            setUser(response.data)
        }
    }
    React.useEffect(() => {
        userDetail()
    }, [])
    //logic for pagination data below:
    const totalPages = Math.ceil(user.length / perPageCount);
    // const pageContent = user.slice((page - 1) * perPageCount, page * perPageCount);

    //func to delte user below:
    const handleDelete = async (id) => {
        setUserid(id)
        setShowdeletemodal(true)
    }

    //func to update user below:
    const handleUpdate = (id, data) => {
        setUserid(id)
        setEditdata(data)
        setShow(true)
    }
    //func to handle search data:
    const handleSearch = (value) => {
        setSearch(value)
    }
    useEffect(() => {
        const filtered = user.filter((users) => {
            return users.name.toLowerCase().includes(search.toLowerCase())
        }
        );
        setFiltereddata(filtered)

        if (search !== '' && filtered?.length === 0) {
            setMsg("No data found")
        } else {
            setMsg("")
        }
    }, [search, user])

    return (
        <>

            {/* <label >
                <input
                    type="checkbox"
                    checked={theme === 'dark'}
                    onChange={(e) => {
                        setTheme(e.target.checked ? 'dark' : 'light')
                    }}
                />
                Use dark mode
            </label> */}
            <Deleteuser
                setShowdeletemodal={setShowdeletemodal}
                showdeletemodal={showdeletemodal}
                setUserid={setUserid}
                userid={userid}
                userDetail={userDetail} />
            <Updatusermodal
                setShow={setShow}
                show={show}
                setUserid={setUserid}
                userid={userid}
                setEditdata={setEditdata}
                editdata={editdata}
                userDetail={userDetail} />
            <SearchAppBar
                handleSearch={handleSearch}
            />

            <div className="container">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ background: "#0e0e0d", color: "white" }}>

                            <TableRow >
                                <TableCell sx={{ fontWeight: 900, fontSize: "18px", color: "white" }}>Username</TableCell>

                                {/* <TableCell align="left">new head</TableCell> */}
                                <TableCell sx={{ fontWeight: 900, fontSize: "18px", color: "white" }} align="left">Actions</TableCell>
                                <TableCell sx={{ fontWeight: 900, fontSize: "18px", color: "white" }} align="left">User Type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filtereddata?.slice((page - 1) * perPageCount, page * perPageCount)?.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {capitalizeFirstLetter(row.name)}
                                    </TableCell>

                                    <TableCell>
                                        <button align="left" className="btn-size me-3" onClick={() => handleUpdate(row.id, row)} style={{ cursor: 'pointer' }} >Update</button>
                                        <button align="left" className="btn-size" onClick={() => handleDelete(row.id)} style={{ cursor: 'pointer' }} >Delete</button>

                                    </TableCell>
                                    <TableCell>
                                        < ControlledAccordions
                                            data={row}
                                            userid={row.id}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <h2 className="mt-4" style={{ textAlign: 'center' }}>{msg}</h2>
                {/* <div className='container'>
                    <div className='row my-5'> */}
                {user.length > 8 && filtereddata.length > 0 ?
                    <PaginationRounded
                        handlePage={handlePage}
                        page={page}
                        count={totalPages}
                    /> : ""
                }

                {/* </div>
                </div> */}

            </div >

        </>
    );
}