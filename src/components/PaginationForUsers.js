import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationRounded({ handlePage, page, count }) {
    return (
        <Stack spacing={2} >
            <Pagination
                sx={{ marginTop: "15px", marginBottom: "25px", justifyContent: "center", display: "flex" }}
                onChange={(event, value) => handlePage(value)}
                page={page}
                count={count}
                variant="outlined" shape="rounded" />
        </Stack>
    );
}