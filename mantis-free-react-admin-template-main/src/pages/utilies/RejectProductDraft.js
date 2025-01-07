import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify'; // Optional for notifications
import 'react-toastify/dist/ReactToastify.css';

const RejectProductDraft = async (draftId) => {
  const token = Cookies.get('authToken');

  if (!token) {
    toast.error('Authentication token is missing. Please log in again.');
    return;
  }

  try {
    // API call to reject product draft
    const response = await axios.put(`http://localhost:8080/product/${draftId}/rejectProductDraft`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      // Display success notification
      toast.success('Product Draft Rejected Successfully!');
      setTimeout(() => (window.location.href = '/fetchProductDraft'), 2000);
      return response.data; // Return the API response data if needed
    } else {
      toast.error(`Failed to reject the product draft. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error rejecting the product draft:', error);
    toast.error('An error occurred while rejecting the product draft. Please try again.');
  }
};

export default RejectProductDraft;
