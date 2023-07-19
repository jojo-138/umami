import { FaHamburger } from 'react-icons/fa';
import { IoIosPizza } from 'react-icons/io';
import { GiDumplingBao, GiNoodles } from 'react-icons/gi';
import { List, CLink } from '../style';

const Category = () => {
  return (
    <List>
      <CLink to="/cuisine/american/1">
        <FaHamburger />
        <p>American</p>
      </CLink>
      <CLink to="/cuisine/italian/1">
        <IoIosPizza />
        <p>Italian</p>
      </CLink>
      <CLink to="/cuisine/chinese/1">
        <GiDumplingBao />
        <p>Chinese</p>
      </CLink>
      <CLink to="/cuisine/thai/1">
        <GiNoodles />
        <p>Thai</p>
      </CLink>
    </List>
  );
};

export default Category;
