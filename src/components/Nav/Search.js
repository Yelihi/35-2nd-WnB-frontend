import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import 'react-datepicker/dist/react-datepicker.css';
import Location from './modal/Location';
import Calender from './modal/Calender';
import GuestType from './modal/GuestType';

import { useDispatch, useSelector } from 'react-redux';

import {
  clickLocationModal,
  clickDateModal,
  clickGuestModal,
  layoutClick,
  searchAccommodationRequest,
} from '../../reducers/search';

const Search = ({ modalRef }) => {
  const dispatch = useDispatch();
  const { location, guestCount } = useSelector(state => state.nav);
  const { start, end } = useSelector(state => state.nav.date);
  const {
    isDateModalOpen,
    isLocationModalOpen,
    isGuestModalOpen,
    currentModalId,
  } = useSelector(state => state.search);
  const navigate = useNavigate();

  const disabled = guestCount > 0;

  const overLayClick = e => {
    if (modalRef.current === e.target) {
      dispatch(layoutClick());
    }
  };

  const leftPad = value => {
    if (value >= 10) {
      return value;
    }

    return `0${value}`;
  };

  const toStringByFormatting = (date, delimiter) => {
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());

    return [year, month, day].join(delimiter);
  };

  const toSearchUserInfo = e => {
    e.stopPropagation();

    const startDay = start
      ? `&check_in=${toStringByFormatting(start, '-')}`
      : '';
    const endDay = end ? `&check_out=${toStringByFormatting(end, '-')}` : '';
    const selectLocation = location ? `&address=${location}` : '';
    const totalGuest = guestCount ? `&maximum_occupancy=${guestCount}` : '';

    dispatch(
      searchAccommodationRequest({
        startDay: startDay,
        endDay: endDay,
        selectLocation: selectLocation,
        totalGuest: totalGuest,
      })
    );

    navigate(`/list?${startDay}${endDay}${selectLocation}${totalGuest}`);
  };

  const ModalComponent = {
    1: <Location />,
    2: <Calender />,
    3: <GuestType disabled={disabled} />,
  };

  return (
    <SearchSection>
      {isLocationModalOpen || isDateModalOpen || isGuestModalOpen ? (
        <ModalOverLay onClick={overLayClick} ref={modalRef} />
      ) : null}
      <SearchBarContainer>
        <WrapperLocationContainer
          className={currentModalId === 1 ? 'is_open' : null}
          onClick={() => dispatch(clickLocationModal())}
        >
          <DatePickerLabel>여행지</DatePickerLabel>
          <SearchBarSpan>{location}</SearchBarSpan>
        </WrapperLocationContainer>
        <WrapperDatePicker>
          <WrapperDatePickerInput
            className={currentModalId === 2 && !end ? 'is_open' : null}
            onClick={() => dispatch(clickDateModal())}
          >
            <DatePickerLabel>체크인</DatePickerLabel>
            <SearchBarSpan>
              {start
                ? `${start.getMonth() + 1}월 ${start.getDate()}일`
                : '날짜 선택'}
            </SearchBarSpan>
          </WrapperDatePickerInput>
          <WrapperDatePickerInput
            className={currentModalId === 2 && end ? 'is_open' : null}
            onClick={() => dispatch(clickDateModal())}
          >
            <DatePickerLabel>체크아웃</DatePickerLabel>
            <SearchBarSpan>
              {end ? `${end.getMonth() + 1}월 ${end.getDate()}일` : '날짜 선택'}
            </SearchBarSpan>
          </WrapperDatePickerInput>
        </WrapperDatePicker>
        <WrapperGuestContainer
          className={currentModalId === 3 ? 'is_open' : null}
          onClick={() => dispatch(clickGuestModal())}
        >
          <DatePickerLabel>여행자</DatePickerLabel>
          <SearchBarSpan>
            {guestCount !== 0 ? `성인 ${guestCount}명` : '게스트 추가'}
          </SearchBarSpan>
          <IconContainer onClick={toSearchUserInfo}>
            <i class="bx bx-search" />
          </IconContainer>
        </WrapperGuestContainer>
        {ModalComponent[currentModalId]}
      </SearchBarContainer>
    </SearchSection>
  );
};

export default Search;

const SearchSection = styled.div`
  ${props => props.theme.variables.flex('', 'center', 'center')}
  width: 100vw;
`;

const WrapperDatePicker = styled.div`
  ${props => props.theme.variables.flex('', 'center', 'center')}
  width: fit-content;
  height: auto;
`;

const SearchBarContainer = styled.div`
  ${props => props.theme.variables.flex('', 'center', 'center')}
  position: relative;
  width: fit-content;
  height: auto;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 32.5px;
`;

const WrapperDatePickerInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 130px;
  height: 65px;
  padding: 14px 24px;
  &.is_open {
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  border-radius: 32.5px;
`;

const WrapperLocationContainer = styled(WrapperDatePickerInput)`
  width: 312px;
  height: 65px;
  border-radius: 32.5px;
`;

const WrapperGuestContainer = styled(WrapperDatePickerInput)`
  position: relative;
  width: 250px;
  height: 65px;
  border-radius: 32.5px;
`;

const DatePickerLabel = styled.span`
  font-size: 12px;
  font-weight: 500;
  padding-left: 3px;
`;

const SearchBarSpan = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
`;

const IconContainer = styled.div`
  ${props => props.theme.variables.flex('', 'center', 'center')}
  position: absolute;
  top: 7.5px;
  right: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #7a0bc0;
  color: white;
  font-size: 20px;
  cursor: pointer;
  z-index: 106;
`;

const ModalOverLay = styled.div`
  position: absolute;
  top: 170px;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
`;

const ModalOverLayWhite = styled(ModalOverLay)`
  background-color: none;
`;
