import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

import { Grid, Typography, MenuItem, FormControl, Select, InputLabel, Button, Modal, Box, TextField, InputAdornment } from '@mui/material';

const ProductData = () => {
  const [brands, setBrands] = useState([]); // State to store brands
  const [loading, setLoading] = useState(true); // Loading state for API call
  const [error, setError] = useState(''); // Error state for API call
  const [selectedBrand, setSelectedBrand] = useState(''); // State to store selected brand
  const [brandDetails, setBrandDetails] = useState([]); // State to store selected brand details
  const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for brand details
  const [detailsError, setDetailsError] = useState(''); // Error state for brand details
  const [open, setOpen] = useState(false); // State for modal visibility
  const [specData, setSpecData] = useState(null); // State for modal data
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  // const [filteredBrands, setFilteredBrands] = useState([]); // State for filtered brands
  // console.log(filteredBrands);

  const handleOpen = (moreSpecification) => {
    // Parse JSON if needed and set spec data
    if (typeof moreSpecification === 'string') {
      const parsedData = JSON.parse(moreSpecification);
      setSpecData(parsedData);
    } else {
      setSpecData(moreSpecification);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSpecData(null);
  };

  // ** Fetch brands from API **
  const fetchBrands = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/phone/fetchBrands', {
        method: 'GET', // Explicitly specifying HTTP method
        headers: {
          'Content-Type': 'application/json' // Indicating the request accepts JSON
        }
      });
      console.log('Fetch Brand Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json(); // Parse JSON response
      console.log('Parsed Data:', data); // Log parsed data for debugging
      setBrands(data.data); // Assuming response format: { data: [...] }
      setLoading(false); // Stop loading
    } catch (err) {
      console.error('Error:', err); // Log error for debugging
      setError('Failed to fetch brands! Please try again later.');
      setLoading(false); // Stop loading on error
    }
  };

  // ** Fetch brand details after brand is selected **
  const fetchBrandDetails = async (brand) => {
    setDetailsLoading(true); // Start loading for brand details
    try {
      const response = await fetch(`http://localhost:8080/api/v1/phone/fetchDetailsOfModel/${brand}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Fetch Brand Details Response:', response);
      if (!response.ok) {
        throw new Error('Failed to fetch brand details');
      }
      const data = await response.json();
      console.log('Parsed Brand Details:', data);
      setBrandDetails(data.data); // Assuming response format: { data: [...] }
      setDetailsLoading(false); // Stop loading

      // Parse the `moreSpecification` field for each brand detail
      const parsedDetails = data.data.map((brandDetail) => {
        let moreSpecification = [];
        if (brandDetail.moreSpecification) {
          try {
            moreSpecification = JSON.parse(brandDetail.moreSpecification);
          } catch (err) {
            console.error(`Error parsing moreSpecification for ${brandDetail.model}:`, err);
          }
        }
        return { ...brandDetail, moreSpecification }; // Add parsed `moreSpecification` to each detail
      });

      setBrandDetails(parsedDetails); // Assuming response format: { data: [...] }
      setDetailsLoading(false); // Stop loading
    } catch (err) {
      console.error('Error:', err); // Log error for debugging
      setDetailsError('Failed to fetch brand details! Please try again later.');
      setDetailsLoading(false); // Stop loading on error
    }
  };

  // ** Handle Search Query Change **
  const handleSearchChange = (event) => {
    const query = event.target.value;

    // Allow only alphabets and spaces using regex
    if (!/^[a-zA-Z\s]*$/.test(query)) {
      alert('Only alphabets are allowed!'); // Display an error for invalid input
      return;
    }

    // Capitalize the first letter and make the rest lowercase
    const formattedQuery = query
      .split(' ') // Split input by spaces to handle multiple words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' '); // Join the words back with a space

    setSearchQuery(formattedQuery);

    // // Filter brands based on search query
    // const filtered = brands.filter((brand) => brand.toLowerCase().includes(query.toLowerCase()));
    // setFilteredBrands(filtered);

    // Trigger API call when user presses Enter
    if (query && event.key === 'Enter') {
      fetchBrandDetails(query);
    }
  };

  // ** Handle Brand Change (Dropdown selection) **
  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand); // Set the selected brand
    console.log('Selected Brand:', brand);
    fetchBrandDetails(brand); // Fetch brand details when a brand is selected
  };

  // ** Call fetchBrands on component mount **
  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* Grid for Title */}
      <Grid item xs={12}>
        <Typography variant="h5" sx={{ marginTop: '20px', marginBottom: '10px', textAlign: 'center', marginLeft: '50%' }}>
          Brand List
        </Typography>
        {loading && <Typography>Loading...</Typography>} {/* Loading Indicator */}
        {error && <Typography color="error">{error}</Typography>} {/* Error Message */}
      </Grid>

      <Grid item md={12} style={{ display: 'flex' }}>
        <Grid item xs={6}></Grid>
        {/* Grid for Dropdown */}
        <Grid item xs={3} mr={1}>
          <FormControl fullWidth>
            <InputLabel id="brand-select-label">Select Brand</InputLabel>
            <Select
              labelId="brand-select-label"
              value={selectedBrand}
              label="Select Brand"
              onChange={handleBrandChange}
              MenuProps={{
                PaperProps: {
                  sx: {
                    maxHeight: 200, // Limit the height of the dropdown
                    overflowY: 'auto', // Enable vertical scrolling
                    '::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar for Webkit browsers
                    msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
                    scrollbarWidth: 'none' // Hide scrollbar for Firefox
                  }
                }
              }}
            >
              {brands.map((brand, index) => (
                <MenuItem key={index} value={brand}>
                  {brand}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Grid for Search Box */}
        <Grid item xs={3} mr={1}>
          <TextField
            label="Search Brand"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchChange(e)}
            sx={{
              borderRadius: '8px'
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>
      </Grid>

      {/* Brand Details */}
      <Grid item xs={12}>
        {detailsLoading && <Typography>Loading brand details...</Typography>}
        {detailsError && <Typography color="error">{detailsError}</Typography>}
        {!detailsLoading && !detailsError && brandDetails.length > 0 && (
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'auto'
            }}
          >
            <Typography variant="h5">Brand Details</Typography>
            <div
              style={{
                marginTop: '3px',
                display: 'flex',
                flexWrap: 'wrap', // Allow items to wrap to the next line if needed
                gap: '25px' // Space between the items
              }}
            >
              {brandDetails.map((brandDetail, index) => (
                <div
                  key={index}
                  style={{
                    flex: '1 1 calc(25% - 16px)', // Takes 25% of the container width minus space
                    boxSizing: 'border-box' // Ensures padding is included in the width
                  }}
                >
                  <Typography variant="h6">{brandDetail.model}</Typography>
                  <img src={brandDetail.deviceImage} alt={brandDetail.model} style={{ width: '100px', height: 'auto' }} />
                  <Typography>
                    <strong>Body:</strong> {brandDetail.body}
                  </Typography>
                  <Typography>
                    <strong>Display Resolution:</strong> {brandDetail.displayResolution}
                  </Typography>
                  <Typography>
                    <strong>Video:</strong> {brandDetail.video}
                  </Typography>
                  <Typography>
                    <strong>Ram:</strong> {brandDetail.ram}
                  </Typography>
                  <Typography>
                    <strong>Chipset:</strong> {brandDetail.chipset}
                  </Typography>
                  <Typography>
                    <strong>Release Date:</strong> {brandDetail.releaseDate}
                  </Typography>
                  <Typography>
                    <strong>Storage:</strong> {brandDetail.storage}
                  </Typography>
                  <Typography>
                    <strong>Battery:</strong> {brandDetail.battery}
                  </Typography>
                  <Typography>
                    <strong>Camera:</strong> {brandDetail.camera}
                  </Typography>
                  <Typography>
                    <strong>Display Size:</strong> {brandDetail.displaySize}
                  </Typography>
                  <Typography>
                    <strong>OS:</strong> {brandDetail.osType}
                  </Typography>
                  {/*<Typography>*/}
                  {/*  <strong>Price:</strong>{' '}*/}
                  {/*  {brandDetail.moreSpecification && Array.isArray(brandDetail.moreSpecification)*/}
                  {/*    ? brandDetail.moreSpecification.find((spec) => spec.title === 'Misc')?.data[0]*/}
                  {/*    : 'No price available'}*/}
                  {/*</Typography>*/}

                  {/* Additional Specifications Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(brandDetail.moreSpecification)}
                    style={{ marginTop: '10px' }}
                  >
                    Additional Specifications
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </Grid>
      {/* Modal for Additional Specifications */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 1100,
            height: 500, // Reduced height
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflow: 'auto', // Enables scrolling for the content
            '::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar for Webkit browsers
            msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
            scrollbarWidth: 'none' // Hide scrollbar for Firefox
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1, // Padding for the header
              borderBottom: '2px solid #ddd' // Add a border for separation
            }}
          >
            <Typography id="modal-title" variant="h6" component="h2">
              Additional Details
            </Typography>
            <Box
              sx={{
                cursor: 'pointer'
              }}
              onClick={handleClose}
            >
              <CloseIcon />
            </Box>
          </Box>

          {/* Scrollable Content */}
          <Box
            sx={{
              overflowY: 'auto',
              height: 'calc(100% - 64px)', // Adjust height to exclude the header (64px is header height)
              p: 2, // Padding for content
              '::-webkit-scrollbar': { display: 'none' }, // Hide the scrollbar for Webkit browsers
              msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
              scrollbarWidth: 'none' // Hide scrollbar for Firefox
            }}
          >
            {specData && Array.isArray(specData) ? (
              <ul>
                {specData.map((spec, idx) => (
                  <li key={idx}>
                    <Typography>
                      <strong>{spec.title}:</strong>
                    </Typography>
                    <ul>
                      {spec.data.map((item, subIdx) => (
                        <li key={subIdx}>
                          {item.title}: {item.data}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No additional specifications available</Typography>
            )}
          </Box>
        </Box>
      </Modal>
    </Grid>
  );
};

export default ProductData;
