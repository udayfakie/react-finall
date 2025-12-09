import { FunctionComponent } from 'react';
import Navbar from './Navbar';

interface SendboxProps {}

const Sendbox: FunctionComponent<SendboxProps> = () => {
  return (
    <>
      <Navbar
        setTerm={() => {
          ('');
        }}
        setMyCardsTerm={() => {
          ('');
        }}
        setFilteredTerm={() => {
          ('');
        }}
      />
      Abc!123Abc sandbox
    </>
  );
};

export default Sendbox;
