import axios from 'axios';
import Cookies from 'js-cookie';

const ApproveDraft = async (draftId) => {
  const token = Cookies.get('authToken'); // Get the token from cookies

  if (!token) {
    alert('Authentication token is missing. Please log in again.');
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
      alert('Product Draft Approved Successfully!');
      return response.data; // Return the response data if needed
    } else {
      alert(`Failed to approve the draft. Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error approving the draft:', error);
    alert('An error occurred while approving the draft. Please try again.');
    return null;
  }
};
export default ApproveDraft;
