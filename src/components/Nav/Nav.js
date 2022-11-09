import React, { useState, useRef, useEffect } from 'react';

import LoginModal from '../Modal/LoginModal';
import SignModal from '../Modal/SignModal';
import BeforeSearch from './BeforeSearch';
import OnClickSearch from './OnClickSearch';

import { useDispatch, useSelector } from 'react-redux';
import { TOKEN_DELETE, TOKEN_EXIST } from '../../reducers/nav';

const Nav = () => {
  const dispatch = useDispatch();
  const { isToken } = useSelector(state => state.nav);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [guest, setGuest] = useState(0);
  const modalRef = useRef();

  useEffect(() => {
    if (localStorage.getItem('Token')) {
      dispatch({
        type: TOKEN_EXIST,
      });
    } else {
      dispatch({
        type: TOKEN_DELETE,
      });
    }
  }, [isToken]);

  const onChange = dates => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const increseNum = () => {
    setGuest(prev => prev + 1);
  };

  const decreseNum = () => {
    setGuest(prev => prev - 1);
  };

  return (
    <>
      <div>
        <BeforeSearch
          startDate={startDate}
          endDate={endDate}
          guest={guest}
          onChange={onChange}
          increseNum={increseNum}
          decreseNum={decreseNum}
        />
        <OnClickSearch
          startDate={startDate}
          endDate={endDate}
          guest={guest}
          onChange={onChange}
          increseNum={increseNum}
          decreseNum={decreseNum}
          modalRef={modalRef}
        />
      </div>
      {localStorage.getItem('key') ? <SignModal /> : <LoginModal />}
    </>
  );
};

export default Nav;
