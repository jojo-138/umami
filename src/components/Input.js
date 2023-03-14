import { Form } from '../style';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Input = () => {
  const [input, setInput] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${input}/1`);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <input type="text" aria-label="Search recipes" onChange={(e) => setInput(e.target.value)} />
        <FaSearch />
      </div>
    </Form>
  );
};

export default Input;
