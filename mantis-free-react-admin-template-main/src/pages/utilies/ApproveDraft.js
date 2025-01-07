import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApproveDraft = async (draftId) => {
  const token = Cookies.get('authToken'); // Get the token from cookies

  if (!token) {
    toast.error('Authentication token is missing. Please log in again.');
    return;
  }

  try {
    const response = await axios.post(`http://localhost:8080/product/${draftId}/approveProductDraft`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Pass token in headers
      }
    });
    if (response.status === 200) {
      toast.success('Product Draft Approved Successfully!');
      setTimeout(() => (window.location.href = '/fetchProductDraft'), 2000);
      return response.data; // Return the response data if needed
    } else {
      toast.error(`Failed to approve the draft. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error approving the draft:', error);
    toast.error('An error occurred while approving the draft. Please try again.');
    return null;
  }
};
export default ApproveDraft;
