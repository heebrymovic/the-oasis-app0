import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/global";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Pagination = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  let currentPage = searchParams.get("page");

  currentPage = currentPage ? +currentPage : 1;

  let totalPage = Math.ceil(total / PAGE_SIZE);

  const pageStart = currentPage * PAGE_SIZE - PAGE_SIZE + 1;

  const pageEnd =
    currentPage * PAGE_SIZE > total ? total : currentPage * PAGE_SIZE;

  const prev = () => {
    searchParams.set("page", currentPage !== 1 ? currentPage - 1 : 1);

    setSearchParams(searchParams);
  };

  const next = () => {
    searchParams.set(
      "page",
      totalPage !== currentPage ? currentPage + 1 : currentPage,
    );
    setSearchParams(searchParams);
  };

  return (
    <StyledPagination>
      <P>
        showing <span>{pageStart}</span> to <span>{pageEnd}</span> of
        <span> {total}</span> results
      </P>

      {total > PAGE_SIZE && (
        <Buttons>
          <PaginationButton disabled={currentPage === 1} onClick={prev}>
            Previous
          </PaginationButton>
          <PaginationButton disabled={currentPage >= totalPage} onClick={next}>
            Next
          </PaginationButton>
        </Buttons>
      )}
    </StyledPagination>
  );
};

export default Pagination;
