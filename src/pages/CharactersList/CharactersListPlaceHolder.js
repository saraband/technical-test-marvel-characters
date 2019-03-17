/**
 *  PlaceHolder for the characters listing page
 */

import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import PlaceHolder from '@components/PlaceHolder';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

export default () => (
  <Table>
    <TableBody>
      {new Array(20).fill(1).map((_, index) => (
        <TableRow key={index}>
          <StyledTableCell>
            <StyledPlaceHolder />
          </StyledTableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
)

/* STYLES */
const StyledTableCell = styled(TableCell)`
  padding: 10px !important;
`;

const StyledPlaceHolder = styled(PlaceHolder)`
  border-radius: 3px;
  width: 100%;
  height: 40px;
`;