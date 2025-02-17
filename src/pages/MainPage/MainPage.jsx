import React, { useEffect } from "react";
import TicketsList from "../../components/TicketList/TicketsList";
import { useDispatch } from "react-redux";

const MainPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  return (
    <>
      <TicketsList />
    </>
  );
};

export default MainPage;
