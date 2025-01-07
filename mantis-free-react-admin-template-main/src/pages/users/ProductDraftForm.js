import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, FormControl, InputLabel, Select, MenuItem, Typography, Button, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnimateButton from '../../components/@extended/AnimateButton';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const ProductDraftForm = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [colors, setColors] = useState([]);
  const [selectedColor, setSelectedColor] = useState([]);
  const [rams, setRams] = useState([]);
  const [selectedRam, setSelectedRam] = useState([]);
  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState([]);
  const [batteries, setBatteries] = useState([]);
  const [selectedBattery, setSelectedBattery] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [operatingSystems, setOperatingSystems] = useState([]);
  const [selectedOperatingSystem, setSelectedOperatingSystem] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [modelError, setModelError] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState([]);
  const [internalStorages, setInternalStorages] = useState([]);
  const [selectedInternalStorage, setSelectedInternalStorage] = useState([]);
  const [price, setPrice] = useState('');
  const [status] = useState('PENDING');
  const [productId] = useState('');

  // For Fetch All Colors:
  const fetchColors = async () => {
    <ToastContainer />;
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchColor');

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setColors(data);
        console.log('Colors :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching color:', err);
      setError('Failed to load colors. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // For Fetch All Colors:
  const fetchInternalStorage = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchInternalStorage');

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setInternalStorages(data);
        console.log('InternalStorage :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching internalStorage:', err);
      setError('Failed to load internalStorages. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // For Fetch All Rams :
  const fetchRams = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchRam');

      const data = await response.data.data;

      console.log('API Response for Ram: ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setRams(data);
        console.log('Rams :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching ram:', err);
      setError('Failed to load rams. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // For Fetch All Cameras :
  const fetchCameras = async (model) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:8080/api/v1/phone/fetchCamera/${model}`);

      const data = await response.data.data;

      console.log('API Response for Camera: ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setCameras(data);
        console.log('Cameras :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching camera:', err);
      setError('Failed to load cameras. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  // For Fetch All Batteries :
  const fetchBatteries = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchBattery');

      const data = await response.data.data;

      console.log('API Response for Camera: ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setBatteries(data);
        console.log('Batteries :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching battery:', err);
      setError('Failed to load batteries. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // For Fetch All Brands:
  const fetchBrands = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchBrands');

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setBrands(data);
        console.log('Brands :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching brand:', err);
      setError('Failed to load brands. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // For Fetch All Colors:
  const fetchOperatingSystems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/v1/phone/fetchOperatingSystem');

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setOperatingSystems(data);
        console.log('OperatingSystems :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching operatingSystem:', err);
      setError('Failed to load operatingSystems. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // For Fetch All Models:
  const fetchModels = async (brand) => {
    try {
      setLoading(true);
      setModels([]);
      setModelError(null);

      const response = await axios.get(`http://localhost:8080/api/v1/phone/fetchModel/${brand}`);

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setModels(data);
        console.log('Models :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching model:', err);
      setModels([]);
      // setModelError('Failed to load models. This Brand have no Models Select another Brnad.');
      toast.error('This brand has no models. Please select another brand.', {
        position: 'top-center', // Center the toast
        // className: 'custom-toast', // Apply custom class
        // bodyClassName: 'custom-toast-body', // Apply custom class to body
        style: {
          backgroundColor: 'red', // Red background
          color: 'white', // White text
          fontWeight: 'bold', // Bold text
          textAlign: 'center' // Center the text
        }
      });
    } finally {
      setLoading(false);
    }
  };
  // For Fetch All Models:
  const fetchImages = async (model) => {
    try {
      setLoading(true);
      // setModels(null);

      const response = await axios.get(`http://localhost:8080/api/v1/phone/fetchImages/${model}`);

      const data = await response.data.data;

      console.log('API Response : ', data);

      if (response.status === 200 && Array.isArray(data)) {
        setImages(data);
        console.log('Images :', data);
      } else {
        throw new Error('Unexpected Data format');
      }
    } catch (err) {
      console.error('Error fetching image:', err);
      setError('Failed to load images.This Model have no Image');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (!token) {
      setError('Authentication token is missing. Please log in again.');
      setTimeout(() => (window.location.href = '/login'), 3000);
      return;
    }

    const decodedToken = jwtDecode(token);

    if (decodedToken.userRole !== 'Vendor') {
      setError('Vendor Role is Missing, Please Check your Role');
      toast.error('Only Vendor can Access !!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 5000);
      return; // Stop execution here
    }

    // Fetch data only if no errors
    fetchBrands();
    fetchColors();
    fetchRams();
    fetchBatteries();
    fetchOperatingSystems();
    fetchInternalStorage();
  }, []);

  // Handle dropdown selection change For color:
  const handleColorChange = (event) => {
    const color = event.target.value;
    setSelectedColor(color);
    console.log('Selected color:', color);
  };
  // Handle dropdown selection change For internalStorage:
  const handleInternalStorageChange = (event) => {
    const internalStorage = event.target.value;
    setSelectedInternalStorage(internalStorage);
    console.log('Selected color:', internalStorage);
  };
  // Handle dropdown selection change For ram:
  const handleRamChange = (event) => {
    const ram = event.target.value;
    setSelectedRam(ram);
    console.log('Selected ram:', ram);
  };
  // Handle dropdown selection change For camera:
  const handleCameraChange = (event) => {
    const camera = event.target.value;
    setSelectedCamera(camera);
    console.log('Selected camera:', camera);
  };
  // Handle dropdown selection change For battery:
  const handleBatteryChange = (event) => {
    const battery = event.target.value;
    setSelectedBattery(battery);
    console.log('Selected battery:', battery);
  };
  // Handle dropdown selection change For brand:
  const handleBrandChange = (event) => {
    const brand = event.target.value;
    setSelectedBrand(brand);
    console.log('Selected brand:', brand);
    if (brand) {
      fetchModels(brand);
    }
  };
  // Handle dropdown selection change For model:
  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    console.log('Selected model:', model, event.target.value);
    if (model) {
      fetchCameras(model);
      fetchImages(model);
    }
  };
  // Handle dropdown selection change For image:
  const handleImageChange = (event) => {
    const image = event.target.value;
    setSelectedImage(image);
    console.log('Selected image:', image);
  };
  // Handle dropdown selection change For operatingSystem:
  const handleOperatingSystemChange = (event) => {
    const operatingSystem = event.target.value;
    setSelectedOperatingSystem(operatingSystem);
    console.log('Selected operatingSystem:', operatingSystem);
  };

  const handleProductDraft = async () => {
    if (
      !selectedBrand ||
      !selectedModel ||
      !selectedColor ||
      !selectedRam ||
      !selectedInternalStorage ||
      !selectedCamera ||
      !selectedBattery ||
      !selectedOperatingSystem ||
      !selectedImage
    ) {
      toast.error('Please fill all the required fields.');
    }

    // Prepare data for API
    const productDraftData = {
      brand: selectedBrand,
      modelName: selectedModel,
      color: selectedColor,
      ramStorage: selectedRam,
      internalStorage: selectedInternalStorage,
      camera: selectedCamera,
      battery: selectedBattery,
      operatingSystem: selectedOperatingSystem,
      image: selectedImage,
      price: price, // Optional field, leave empty or add another state if required
      status: status, // Fixed value
      productId: productId // As per your request
    };
    console.log('Submitting Product Draft:', productDraftData);

    try {
      const response = await axios.post('http://localhost:8080/product/createProductDraft', productDraftData, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      });

      if (response.status === 200) {
        toast.success('Product Draft created successfully!');
        setTimeout(() => (window.location.href = '/vendorDraft'), 3000);
      } else {
        toast.error('Failed to create Product Draft. Please try again.');
      }
    } catch (err) {
      console.error('Error creating Product Draft:', err);
      toast.error('Error creating Product Draft. Please try again later.');
    }
  };

  // Render
  return (
    <Grid>
      <Grid
        container
        spacing={2}
        style={{
          padding: '20px',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Grid
          item
          xs={4}
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Product Draft
          </Typography>
        </Grid>

        {/* Display error message */}
        {error && (
          <Grid item xs={12}>
            <Typography
              variant="h6"
              color="error"
              sx={{
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}
            >
              {error}
            </Typography>
          </Grid>
        )}
        {/* Render dropdowns only when no error */}
        {!error && (
          <>
            {/*For Brand*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading brands...</Typography>
              ) : error ? (
                <Typography variant="body1" brand="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Brand</InputLabel>
                  <Select value={selectedBrand} onChange={handleBrandChange}>
                    {brands.map((brand, index) => (
                      <MenuItem key={index} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For Model*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading && <Typography variant="body1">Loading models...</Typography>}
              {/* Error Message via Toastify */}
              {modelError && (
                <Typography
                  color="error"
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '15px'
                  }}
                >
                  {modelError}
                </Typography>
              )}

              <FormControl fullWidth>
                <InputLabel>Select Model</InputLabel>
                <ToastContainer />
                <Select
                  value={selectedModel}
                  onChange={handleModelChange}
                  disabled={Array.isArray(models) && models.length === 0} // Disable dropdown if no models
                >
                  {!loading && !modelError && Array.isArray(models) && models.length > 0 ? (
                    models.map((model, index) => (
                      <MenuItem key={index} value={model}>
                        {model}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No Models Available</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Grid>
            {/*For Image*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading images...</Typography>
              ) : error ? (
                <Typography variant="body1" image="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Image</InputLabel>
                  <Select value={selectedImage} onChange={handleImageChange}>
                    {images.map((image, index) => (
                      <MenuItem key={index} value={image}>
                        {image}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For Color*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading colors...</Typography>
              ) : error ? (
                <Typography variant="body1" color="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Color</InputLabel>
                  <Select value={selectedColor} onChange={handleColorChange}>
                    {colors.map((color, index) => (
                      <MenuItem key={index} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For Ram*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading rams...</Typography>
              ) : error ? (
                <Typography variant="body1" ram="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Ram</InputLabel>
                  <Select value={selectedRam} onChange={handleRamChange}>
                    {rams.map((ram, index) => (
                      <MenuItem key={index} value={ram}>
                        {ram}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For InternalStorage*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading internalStorages...</Typography>
              ) : error ? (
                <Typography variant="body1" internalStorage="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select InternalStorage</InputLabel>
                  <Select value={selectedInternalStorage} onChange={handleInternalStorageChange}>
                    {internalStorages.map((internalStorage, index) => (
                      <MenuItem key={index} value={internalStorage}>
                        {internalStorage}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For Camera*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading cameras...</Typography>
              ) : error ? (
                <Typography variant="body1" camera="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Camera</InputLabel>
                  <Select value={selectedCamera} onChange={handleCameraChange}>
                    {cameras.map((camera, index) => (
                      <MenuItem key={index} value={camera}>
                        {camera}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For Battery*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading batteries...</Typography>
              ) : error ? (
                <Typography variant="body1" battery="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select Battery</InputLabel>
                  <Select value={selectedBattery} onChange={handleBatteryChange}>
                    {batteries.map((battery, index) => (
                      <MenuItem key={index} value={battery}>
                        {battery}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>
            {/*For OperatingSystem*/}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              {loading ? (
                <Typography variant="body1">Loading operatingSystems...</Typography>
              ) : error ? (
                <Typography variant="body1" operatingSystem="error">
                  {error}
                </Typography>
              ) : (
                <FormControl fullWidth>
                  <InputLabel>Select OperatingSystem</InputLabel>
                  <Select value={selectedOperatingSystem} onChange={handleOperatingSystemChange}>
                    {operatingSystems.map((operatingSystem, index) => (
                      <MenuItem key={index} value={operatingSystem}>
                        {operatingSystem}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </Grid>

            {/* For price */}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField label="Price" type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
              </FormControl>
            </Grid>

            {/* For status */}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField label="Status" type="text" value={status} />
              </FormControl>
            </Grid>

            {/* For ProductId */}
            <Grid item xs={12}></Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <TextField label="ProductId" type="text" value={productId} />
              </FormControl>
            </Grid>

            <Grid item xs={12}></Grid>
            <Grid item xs={2}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ fontWeight: 'bold' }}
                  onClick={handleProductDraft}
                >
                  Create Product Draft
                </Button>
              </AnimateButton>
            </Grid>
          </>
        )}
      </Grid>
    </Grid>
  );
};
export default ProductDraftForm;
