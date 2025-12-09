import { FunctionComponent } from 'react';
import Navbar from './Navbar';

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
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
      about
    </>
  );
};

export default About;
