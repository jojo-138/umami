import PropTypes from 'prop-types';
import Pagination from 'react-responsive-pagination';
import { useNavigate } from 'react-router-dom';
import './pagination.css';

const Page = ({ results, type, input, currentPage }) => {
  const navigate = useNavigate();
  const totalPages = Math.ceil(results / 15);

  const handlePageChange = (page) => {
    input ? navigate(`/${type}/${input}/${page}`) : navigate(`/cuisine/${type}/${page}`);
  };

  return (
    <Pagination
      total={totalPages}
      current={parseInt(currentPage)}
      onPageChange={(page) => handlePageChange(page)}
      maxWidth={100}
    />
  );
};

Page.propTypes = {
  results: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  input: PropTypes.string,
  currentPage: PropTypes.string.isRequired
};

export default Page;
