import axios from 'axios';

import {
    BASE_URL, 
} from '../Urls/Url';
   
  const api = axios.create({
    baseURL: BASE_URL,
  });
 
  const getUserById = async (userId) => {
    try {
      console.log("Fetching user by id:", userId);
      if (!userId) {
        throw new Error('Invalid userId');
      }
 
      console.log(api.get(`/users/${userId}`));

      return api.get(`/users/${userId}`);
    } catch (error) {
      console.error('Error during request:', error);
      throw error;
    }
  };
  
 
export { getUserById };