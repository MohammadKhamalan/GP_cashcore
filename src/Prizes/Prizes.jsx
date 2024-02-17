import React, { useState, useEffect } from 'react';
import { makeRequest } from '../axios';
import './Prizes.scss';
import { motion } from 'framer-motion'; // Import motion from Framer Motion


function Prizes() {
    const [prizes, setPrizes] = useState([]);
    const [timer, setTimer] = useState(0);
  const [shouldStartTimer, setShouldStartTimer] = useState(false);
  const[showtimer,setShowTimer]=useState(false);
    const [formData, setFormData] = useState({
      draw_name: '',
      draw_description: '',
      prize_details: '',
    });
    const [prizeDraw, setPrizeDraw] = useState(null);
  
    const fetchPrizes = async () => {
      try {
        const response = await makeRequest.get('/prize');
        setPrizes(response.data);
      } catch (error) {
        console.error('Error fetching prizes:', error);
      }
    };
  
    useEffect(() => {
      fetchPrizes();
    }, []);
  
    useEffect(() => {
        let interval;
        if (shouldStartTimer && timer > 0) {
          interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
        } else if (timer === 0 && shouldStartTimer) { // Check if the timer reached 0 and shouldStartTimer is true
          clearInterval(interval);
          setShouldStartTimer(false); // Reset the flag after timer completion
          createPrizeDraw(); // Add prize draw only once after the timer reaches 0
        }
        return () => clearInterval(interval);
      }, [timer, shouldStartTimer]);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setPrizeDraw(null);
        setTimer(10); // Reset the timer to 60 seconds
        setShouldStartTimer(true); // Set the flag to start the timer
        setShowTimer(true);
      };
    
      const createPrizeDraw = async () => {
        try {
          const response = await makeRequest.post('/prize', formData);
          setPrizeDraw(response.data);
        } catch (error) {
          console.error('Error creating prize draw:', error);
        }
      };
    
      const startTimer = () => {
        setTimer(10); // Set timer to 60 seconds when the button is clicked
      };
      const calculateDuration = (drawDate) => {
        const currentDate = new Date();
        const prizeDate = new Date(drawDate);
        const timeDifference = currentDate.getTime() - prizeDate.getTime(); // Get the time difference in milliseconds
      
        const secondsDifference = Math.floor(timeDifference / 1000);
        const minutesDifference = Math.floor(secondsDifference / 60);
        const hoursDifference = Math.floor(minutesDifference / 60);
        const daysDifference = Math.floor(hoursDifference / 24);
      
        if (daysDifference > 0) {
          return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
        } else if (hoursDifference > 0) {
          return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
        } else if (minutesDifference > 0) {
          return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
        } else {
          return `Just now`;
        }
      };
      


return (
    <motion.div
      className="prizes-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
     
        <div className='above'>
          <form onSubmit={handleSubmit}>         
             <label>
              Draw Name:
              <input
                type="text"
                name="draw_name"
                value={formData.draw_name}
                onChange={handleChange}
              />
            </label>
            <label>
              Draw Description:
              <input
                type="text"
                name="draw_description"
                value={formData.draw_description	}
                onChange={handleChange}
              />
            </label>
            <label>
              Prize Details:
              <input
                type="text"
                name="prize_details"
                value={formData.prize_details}
                onChange={handleChange}
              />
            </label>

            <button type="submit" onClick={() => setTimer(60)}>Add Prize Draw</button>
            {showtimer &&  <h2>Time ramainig for prize!: {timer} seconds</h2>}

          </form>
        </div>
   

      <ul className="prize-list">
        {prizes.map((prize) => (
          <motion.li
            key={prize.draw_id}
            className="prize-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
           <div className="prize-box">
  <div className="title">
    <img src="/logo1.png" alt="" className="photocash" />
    <div className="name">{prize.draw_name}</div>
    <img src="/prizePNG.PNG" alt="" className="photoprize" />

  </div>
  <div className="winner-details">
    <p>Winner Name: {prize.user_name}</p>
    <p>Winner Account ID: {prize.account_id}</p>
  </div>
  <div className="description-details">
    <p>Description: {prize.draw_description	}</p>
    <p>Details: {prize.prize_details}</p>
  </div>
  <div className="date">{calculateDuration(prize.draw_date)}</div>
</div>

          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
  
}

export default Prizes;

