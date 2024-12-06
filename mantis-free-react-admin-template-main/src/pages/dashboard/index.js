// import React, { useEffect, useState } from 'react';

import { Grid, Typography
  // MenuItem, FormControl, Select, InputLabel, Button, Modal, Box
} from '@mui/material';


import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrderTable from './OrdersTable';
// import Shadow from '../components-overview/Shadow';

const DashboardDefault = () => {
  // const [brands, setBrands] = useState([]); // State to store brands
  // const [loading, setLoading] = useState(true); // Loading state for API call
  // const [error, setError] = useState(''); // Error state for API call
  // const [selectedBrand, setSelectedBrand] = useState(''); // State to store selected brand
  // const [brandDetails, setBrandDetails] = useState([]); // State to store selected brand details
  // const [detailsLoading, setDetailsLoading] = useState(false); // Loading state for brand details
  // const [detailsError, setDetailsError] = useState(''); // Error state for brand details
  // const [open, setOpen] = useState(false); // State for modal visibility
  // const [specData, setSpecData] = useState(null); // State for modal data

  // const handleOpen = (moreSpecification) => {
  //   // Parse JSON if needed and set spec data
  //   if (typeof moreSpecification === 'string') {
  //     const parsedData = JSON.parse(moreSpecification);
  //     setSpecData(parsedData);
  //   } else {
  //     setSpecData(moreSpecification);
  //   }
  //   setOpen(true);
  // };
  //
  // const handleClose = () => {
  //   setOpen(false);
  //   setSpecData(null);
  // };
  //
  // // ** Fetch brands from API **
  // const fetchBrands = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/api/v1/phone/fetchBrands', {
  //       method: 'GET', // Explicitly specifying HTTP method
  //       headers: {
  //         'Content-Type': 'application/json' // Indicating the request accepts JSON
  //       }
  //     });
  //     console.log('Fetch Brand Response:', response);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json(); // Parse JSON response
  //     console.log('Parsed Data:', data); // Log parsed data for debugging
  //     setBrands(data.data); // Assuming response format: { data: [...] }
  //     setLoading(false); // Stop loading
  //   } catch (err) {
  //     console.error('Error:', err); // Log error for debugging
  //     setError('Failed to fetch brands! Please try again later.');
  //     setLoading(false); // Stop loading on error
  //   }
  // };
  //
  // // ** Fetch brand details after brand is selected **
  // const fetchBrandDetails = async (brand) => {
  //   setDetailsLoading(true); // Start loading for brand details
  //   try {
  //     const response = await fetch(`http://localhost:8080/api/v1/phone/fetchDetailsOfModel/${brand}`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });
  //     console.log('Fetch Brand Details Response:', response);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch brand details');
  //     }
  //     const data = await response.json();
  //     console.log('Parsed Brand Details:', data);
  //     setBrandDetails(data.data); // Assuming response format: { data: [...] }
  //     setDetailsLoading(false); // Stop loading
  //
  //     // Parse the `moreSpecification` field for each brand detail
  //     const parsedDetails = data.data.map((brandDetail) => {
  //       let moreSpecification = [];
  //       if (brandDetail.moreSpecification) {
  //         try {
  //           moreSpecification = JSON.parse(brandDetail.moreSpecification);
  //         } catch (err) {
  //           console.error(`Error parsing moreSpecification for ${brandDetail.model}:`, err);
  //         }
  //       }
  //       return { ...brandDetail, moreSpecification }; // Add parsed `moreSpecification` to each detail
  //     });
  //
  //     setBrandDetails(parsedDetails); // Assuming response format: { data: [...] }
  //     setDetailsLoading(false); // Stop loading
  //   } catch (err) {
  //     console.error('Error:', err); // Log error for debugging
  //     setDetailsError('Failed to fetch brand details! Please try again later.');
  //     setDetailsLoading(false); // Stop loading on error
  //   }
  // };
  //
  // // ** Handle Brand Change (Dropdown selection) **
  // const handleBrandChange = (event) => {
  //   const brand = event.target.value;
  //   setSelectedBrand(brand); // Set the selected brand
  //   console.log('Selected Brand:', brand);
  //   fetchBrandDetails(brand); // Fetch brand details when a brand is selected
  // };
  //
  // // ** Call fetchBrands on component mount **
  // useEffect(() => {
  //   fetchBrands();
  // }, []);

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12} sx={{ mb: -2.25 }}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Page Views" count="4,42,236" percentage={59.3} extra="35,000" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Users" count="78,250" percentage={70.5} extra="8,900" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Order" count="18,800" percentage={27.4} isLoss color="warning" extra="1,943" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Sales" count="$35,078" percentage={27.4} isLoss color="warning" extra="$20,395" />
      </Grid>

      {/* Brand List */}
      {/*<Grid item xs={1.5}>*/}
      {/*  <Typography variant="h5">Brand List</Typography>*/}
      {/*  {loading && <Typography>Loading...</Typography>} /!* Loading Indicator *!/*/}
      {/*  {error && <Typography color="error">{error}</Typography>} /!* Error Message *!/*/}
      {/*  /!* Dropdown to select a brand *!/*/}
      {/*  {!loading && !error && (*/}
      {/*    <FormControl fullWidth>*/}
      {/*      <InputLabel id="brand-select-label">Select Brand</InputLabel>*/}
      {/*      <Select labelId="brand-select-label" value={selectedBrand} label="Select Brand" onChange={handleBrandChange}>*/}
      {/*        {brands.map((brand, index) => (*/}
      {/*          <MenuItem key={index} value={brand}>*/}
      {/*            {brand} /!* Display brand name in the dropdown *!/*/}
      {/*          </MenuItem>*/}
      {/*        ))}*/}
      {/*      </Select>*/}
      {/*    </FormControl>*/}
      {/*  )}*/}
      {/*</Grid>*/}

      {/* Brand Details */}
      {/*<Grid item xs={12}>*/}
      {/*  {detailsLoading && <Typography>Loading brand details...</Typography>}*/}
      {/*  {detailsError && <Typography color="error">{detailsError}</Typography>}*/}
      {/*  {!detailsLoading && !detailsError && brandDetails.length > 0 && (*/}
      {/*    <div>*/}
      {/*      <Typography variant="h5">Brand Details</Typography>*/}
      {/*      <div*/}
      {/*        style={{*/}
      {/*          marginTop: '3px',*/}
      {/*          display: 'flex',*/}
      {/*          flexWrap: 'wrap', // Allow items to wrap to the next line if needed*/}
      {/*          gap: '25px' // Space between the items*/}
      {/*        }}*/}
      {/*      >*/}
      {/*        {brandDetails.map((brandDetail, index) => (*/}
      {/*          <div*/}
      {/*            key={index}*/}
      {/*            style={{*/}
      {/*              flex: '1 1 calc(25% - 16px)', // Takes 25% of the container width minus space*/}
      {/*              boxSizing: 'border-box' // Ensures padding is included in the width*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <Typography variant="h6">{brandDetail.model}</Typography>*/}
      {/*            <img src={brandDetail.deviceImage} alt={brandDetail.model} style={{ width: '100px', height: 'auto' }} />*/}
      {/*            <Typography>*/}
      {/*              <strong>Body:</strong> {brandDetail.body}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Display Resolution:</strong> {brandDetail.displayResolution}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Video:</strong> {brandDetail.video}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Ram:</strong> {brandDetail.ram}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Chipset:</strong> {brandDetail.chipset}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Release Date:</strong> {brandDetail.releaseDate}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Storage:</strong> {brandDetail.storage}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Battery:</strong> {brandDetail.battery}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Camera:</strong> {brandDetail.camera}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>Display Size:</strong> {brandDetail.displaySize}*/}
      {/*            </Typography>*/}
      {/*            <Typography>*/}
      {/*              <strong>OS:</strong> {brandDetail.osType}*/}
      {/*            </Typography>*/}
      {/*            /!*<Typography>*!/*/}
      {/*            /!*  <strong>Price:</strong>{' '}*!/*/}
      {/*            /!*  {brandDetail.moreSpecification && Array.isArray(brandDetail.moreSpecification)*!/*/}
      {/*            /!*    ? brandDetail.moreSpecification.find((spec) => spec.title === 'Misc')?.data[0]*!/*/}
      {/*            /!*    : 'No price available'}*!/*/}
      {/*            /!*</Typography>*!/*/}

      {/*            /!* Additional Specifications Button *!/*/}
      {/*            <Button*/}
      {/*              variant="contained"*/}
      {/*              color="primary"*/}
      {/*              onClick={() => handleOpen(brandDetail.moreSpecification)}*/}
      {/*              style={{ marginTop: '10px' }}*/}
      {/*            >*/}
      {/*              Additional Specifications*/}
      {/*            </Button>*/}
      {/*          </div>*/}
      {/*        ))}*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Grid>*/}

      {/* Modal for Additional Specifications */}
      {/*<Modal open={open} onClose={handleClose} aria-labelledby="modal-title">*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      position: 'absolute',*/}
      {/*      top: '50%',*/}
      {/*      left: '50%',*/}
      {/*      transform: 'translate(-50%, -50%)',*/}
      {/*      width: 1100,*/}
      {/*      height: 500, // Reduced height*/}
      {/*      bgcolor: 'background.paper',*/}
      {/*      boxShadow: 24,*/}
      {/*      p: 4,*/}
      {/*      borderRadius: 2,*/}
      {/*      overflow: 'auto' // Enables scrolling for the content*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography id="modal-title" variant="h6" component="h2">*/}
      {/*      Additional Specifications*/}
      {/*    </Typography>*/}
      {/*    {specData && Array.isArray(specData) ? (*/}
      {/*      <ul>*/}
      {/*        {specData.map((spec, idx) => (*/}
      {/*          <li key={idx}>*/}
      {/*            <Typography>*/}
      {/*              <strong>{spec.title}:</strong>*/}
      {/*            </Typography>*/}
      {/*            <ul>*/}
      {/*              {spec.data.map((item, subIdx) => (*/}
      {/*                <li key={subIdx}>*/}
      {/*                  {item.title}: {item.data}*/}
      {/*                </li>*/}
      {/*              ))}*/}
      {/*            </ul>*/}
      {/*          </li>*/}
      {/*        ))}*/}
      {/*      </ul>*/}
      {/*    ) : (*/}
      {/*      <Typography>No additional specifications available</Typography>*/}
      {/*    )}*/}
      {/*    <Button variant="contained" onClick={handleClose} sx={{ mt: 2 }}>*/}
      {/*      Close*/}
      {/*    </Button>*/}
      {/*  </Box>*/}
      {/*</Modal>*/}

      {/* Other dashboard components go here */}
      <OrderTable />
      {/*<Shadow />*/}
    </Grid>
  );
};

export default DashboardDefault;
