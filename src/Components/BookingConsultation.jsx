import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorCard from './DoctorCard/DoctorCard';

const BookingConsultation = () => {
  const [searchParams] = useSearchParams();
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  useEffect(() => {
    fetch('https://api.npoint.io/9a5543d36f1460da2f63')
      .then((res) => res.json())
      .then((data) => {
        const speciality = searchParams.get('speciality');
        if (speciality) {
          setFilteredDoctors(data.filter((d) => d.speciality.toLowerCase() === speciality.toLowerCase()));
          setIsSearched(true);
        } else {
          setFilteredDoctors([]);
          setIsSearched(false);
        }
      })
      .catch((err) => console.log(err));
  }, [searchParams]);

  return (
    <center>
      <div className="searchpage-container">
        <FindDoctorSearch />
        <div className="search-results-container">
          {isSearched && (
            <center>
              <h2>{filteredDoctors.length} doctors are available</h2>
              <h3>Book appointments with minimum wait-time & verified doctor details</h3>
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => <DoctorCard {...doctor} key={doctor.name} />)
              ) : (
                <p>No doctors found.</p>
              )}
            </center>
          )}
        </div>
      </div>
    </center>
  );
};

export default BookingConsultation;
