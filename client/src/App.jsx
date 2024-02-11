import React, { useState, useEffect } from 'react';
import './App.css'
import axios from 'axios'

function App() {

  const [data, setData] = useState([]);
  const [name, setName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [salary, setSalary] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3001/data');
    setData(response.data);
  };

  const handleAddData = async () => {
    await axios.post('http://localhost:3001/data', {
      name,
      occupation,
      salary
    });
    fetchData();
  };

  const handleDeleteData = async (id) => {
    await axios.delete(`http://localhost:3001/data/${id}`);
    fetchData();
  };

  return (
    <>
      <div className="flex justify-center pt-20">
      <div className='max-w-7xl'>
        <h1 className="text-3xl mb-5">Data List</h1>
        <ul>
          {data.map(item => (
            <li key={item.id} className="mb-3">
              <span>{item.name}, {item.occupation}, {item.salary}</span>
              <button onClick={() => handleDeleteData(item.id)} className="ml-3 bg-red-500 hover:bg-red-700 text-white py-1 text-sm px-4 rounded-md transition">Delete</button>
            </li>
          ))}
        </ul>
        <h2 className="text-2xl my-5">Add Data</h2>
        <div className="flex">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="mr-3 p-2 border border-gray-400 rounded-md" />
          <input type="text" placeholder="Occupation" value={occupation} onChange={(e) => setOccupation(e.target.value)} className="mr-3 p-2 border border-gray-400 rounded-md" />
          <input type="text" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="mr-3 p-2 border border-gray-400 rounded-md" />
          <button onClick={handleAddData} className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Add Data</button>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
