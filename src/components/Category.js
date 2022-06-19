/* eslint-disable prettier/prettier */
import { FaHamburger } from 'react-icons/fa';
import { IoIosPizza } from 'react-icons/io';
import { GiDumplingBao, GiNoodles } from 'react-icons/gi';
import { List, CLink } from '../style';
import { useLocation } from 'react-router-dom';

const Category = () => {
  const { pathname } = useLocation();
  
  return (
    <List>
      <CLink to="/cuisine/american/1" style={{ background: pathname.includes('american') ? 'linear-gradient(#d66e66, #b21024)' : 'linear-gradient(#868686, #1f1f1f)'}}>
        <FaHamburger />
        <p>American</p>
      </CLink>
      <CLink to="/cuisine/italian/1" style={{ background: pathname.includes('italian') ? 'linear-gradient(#d66e66, #b21024)' : 'linear-gradient(#868686, #1f1f1f)'}}>
        <IoIosPizza />
        <p>Italian</p>
      </CLink>
      <CLink to="/cuisine/chinese/1" style={{ background: pathname.includes('chinese') ? 'linear-gradient(#d66e66, #b21024)' : 'linear-gradient(#868686, #1f1f1f)'}}>
        <GiDumplingBao />
        <p>Chinese</p>
      </CLink>
      <CLink to="/cuisine/thai/1" style={{ background: pathname.includes('thai') ? 'linear-gradient(#d66e66, #b21024)' : 'linear-gradient(#868686, #1f1f1f)'}}>
        <GiNoodles />
        <p>Thai</p>
      </CLink>
    </List>
  );
};

export default Category;
