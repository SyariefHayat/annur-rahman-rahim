import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "16px",
};

const center = {
    lat: -6.4251570861590555, 
    lng: 107.03213737301809, 
};

const GoogleMapComponent = () => {
    return (
        <LoadScript googleMapsApiKey="AIzaSyBo0gBJzM32USQCjvM8GRrQSqATbOLvNaU">
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default GoogleMapComponent;
