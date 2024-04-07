import styled from "styled-components";
import { createContext, useContext } from "react";

const TableOverflow = styled.div`
  overflow-x: auto;
  width: 100%;
`;

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
`;

const CommonRow = styled.div.withConfig({
  shouldForwardProp: (prop, defaultValidatorFn) => !["columns"].includes(prop),
})`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 20px 30px;
  text-align: ${(props) => props.align}
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

/*const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;
*/
const TableContext = createContext();

const Table = ({ children, columns }) => {
  return (
    <TableContext.Provider value={{ columns }}>
      <TableOverflow>
        <StyledTable>{children}</StyledTable>
      </TableOverflow>
    </TableContext.Provider>
  );
};

const TableHeader = ({ children }) => {
  const { columns } = useContext(TableContext);

  return <StyledHeader columns={columns}>{children}</StyledHeader>;
};

const TableRow = ({ children }) => {
  const { columns } = useContext(TableContext);

  return <StyledRow columns={columns}>{children}</StyledRow>;
};

const TableBody = ({ data, render }) => {
  return (
    <StyledBody>
      {!data?.length ? (
        <StyledRow align="center">No data available in the table</StyledRow>
      ) : (
        data.map(render)
      )}
    </StyledBody>
  );
};

Table.Header = TableHeader;
Table.Row = TableRow;
Table.Body = TableBody;
Table.Footer = Footer;

export default Table;
