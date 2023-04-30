import React, { useState } from 'react';
import feeStructure from './feeStructure.json';
import './App.css';
import FeeTime from './FeeTime';

const App = () => {
    const [selectedFee, setSelectedFee] = useState('');
    const [selectedNationality, setSelectedNationality] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
    const ALL_COURSES = ['Medical', 'Dental', 'Ayurveda']
    const ALL_LEVELS = ['UG', 'PG', 'DIPLOMA', 'Ph.D']

    const fees = Object.keys(feeStructure);
    const nationalities = selectedFee ? Object.keys(feeStructure[selectedFee]) : [];
    const courses = selectedFee && selectedNationality
      ? Object.keys(feeStructure[selectedFee][selectedNationality]).map((course) => 
          course === 'ALL_COURSES​' ? ALL_COURSES : course) : [];
    const levels = selectedFee && selectedNationality && selectedCourse
      ? Object.keys(feeStructure[selectedFee][selectedNationality][ALL_COURSES.includes(selectedCourse) ? 'ALL_COURSES​' : selectedCourse]).map((level) =>
          level === 'ALL_LEVEL​' ? ALL_LEVELS : level) : [];

    const feesOptions = fees.map((fee) => (
    <option key={fee} value={fee}>
        {fee}
    </option>
    ));

    const nationalitiesOptions = nationalities.map((nationality) => (
    <option key={nationality} value={nationality}>
        {nationality}
    </option>
    ));

    const coursesOptions = courses.map((course) =>
    Array.isArray(course) ? (
        course.map((c) => (
        <option key={c} value={c}>
            {c}
        </option>
        ))
    ) : (
        <option key={course} value={course}>
        {course}
        </option>
    )
    );

    const levelsOptions = levels.map((level) =>
    Array.isArray(level) ? (
        level.map((l) => (
        <option key={l} value={l}>
            {l}
        </option>
        ))
    ) : (
        <option key={level} value={level}>
        {level}
        </option>
    )
    );

    const handleFeeChange = (event) => {
    setSelectedFee(event.target.value);
    setSelectedNationality('');
    setSelectedCourse('');
    setSelectedLevel('');
    };

    const handleNationalityChange = (event) => {
    setSelectedNationality(event.target.value);
    setSelectedCourse('');
    setSelectedLevel('');
    };

    const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
    setSelectedLevel('');
    };

    const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
    };

    const handleSubmit = (event) => {
    event.preventDefault();
    const feeAmount = feeStructure[selectedFee][selectedNationality][[ALL_COURSES.includes(selectedCourse) ? 'ALL_COURSES​' : selectedCourse]][ALL_LEVELS.includes(selectedLevel) && selectedFee === 'Exam Fee' ? 'ALL_LEVEL​' : selectedLevel];
    alert(`Fee Amount: ${feeAmount.amount}`);
    };
        

    return (
        <div className='container'>
        <form className='form-container'onSubmit={handleSubmit}>
                <h1>Fee Calculator</h1>
                <FeeTime label={"Fee"}  selectedValue={selectedFee} handleChange={handleFeeChange} dropdownOptions={feesOptions} />
                <FeeTime label={"Nationality"}  selectedValue={selectedNationality} handleChange={handleNationalityChange} dropdownOptions={nationalitiesOptions} />
                <FeeTime label={"Course"}  selectedValue={selectedCourse} handleChange={handleCourseChange} dropdownOptions={coursesOptions} />
                <FeeTime label={"Level"}  selectedValue={selectedLevel} handleChange={handleLevelChange} dropdownOptions={levelsOptions} />          
                <button type="submit" disabled={!selectedLevel}>Submit</button>
        </form>
        </div>
    )
}

export default App;