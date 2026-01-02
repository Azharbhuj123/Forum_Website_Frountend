import { useEffect, useState, useRef } from "react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { Location_Svg } from "../../Svg_components/Svgs";

const containerStyle = {
  width: "100%",
  height: "250px",
  borderRadius: "12px",
};
const containerStyleSearch = {
  width: "100%",
  height: "100%",
  borderRadius: "12px",
};



function useUserCountry() {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const geocoder = new window.google.maps.Geocoder();
        const latlng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === "OK" && results[0]) {
            const countryComp = results[0].address_components.find((c) =>
              c.types.includes("country")
            );
            if (countryComp) {
              setCountry(countryComp.short_name); // e.g. "US", "PK"
            }
          }
        });
      });
    }
  }, []);

  return country;
}

export function PropertyAddressInput({ setValue, address }) {
  const country = useUserCountry();
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  const {
    ready,
    value,
    setValue: setAutoValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      ...(country && { componentRestrictions: { country } }),
      ...(coords && {
        locationBias: {
          center: coords,
          radius: 50000,
        },
      }),
    },
    debounce: 300,
  });

 useEffect(() => {
  if (address) {
    setAutoValue(address, false);

    (async () => {
      try {
        const results = await getGeocode({ address });
        const { lat, lng } = await getLatLng(results[0]);

        setValue("latitude", lat);
        setValue("longitude", lng);
      } catch (err) {
        console.error("Failed to get lat/lng from address", err);
      }
    })();
  }
}, [address]);


  const handleInputChange = (e) => {
    setAutoValue(e.target.value);
    setValue("fullAddress", e.target.value, { shouldValidate: true });
  };

  const handleSelect = ({ description }) => async () => {
    setAutoValue(description, false);
    clearSuggestions();

    setValue("fullAddress", description, { shouldValidate: true });

    const results = await getGeocode({ address: description });
    const { lat, lng } = await getLatLng(results[0]);

    setValue("latitude", lat);
    setValue("longitude", lng);

    const postalCodeComp = results[0].address_components.find((comp) =>
      comp.types.includes("postal_code")
    );

    const postalCode = postalCodeComp?.long_name || "";

    setValue("zipcode", postalCode, { shouldValidate: true });

    console.log("Coords:", { lat, lng });
  };

  return (
    <div className="coolinput">
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        disabled={!ready}
        placeholder="Search Address..."
        className="form-text-input"
      />

      {status === "OK" && (
        <ul className="suggestions">
          {data.map(({ place_id, description }) => (
            <li key={place_id} onClick={handleSelect({ description })}>
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


export function PropertyMapPreview({ lat, lng }) {
  if (!lat || !lng) {
    return (
      <div className="map-placeholder-section">
        <div className="map-icon-container">
          <Location_Svg />
        </div>
        <p className="map-placeholder-text">
          Map preview will appear here
        </p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat, lng }}
      zoom={15}
      options={{
        disableDefaultUI: true,
      }}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  );
}


export const openGoogleMaps = ({rental_data}) => {
  if (!rental_data) return;

  let url = "https://www.google.com/maps/search/?api=1";

  const coordinates = rental_data?.property_location?.coordinates;

  if (Array.isArray(coordinates) && coordinates.length === 2) {
    // GeoJSON order: [lng, lat]
    const lat = coordinates[1];
    const lng = coordinates[0];
    url += `&query=${lat},${lng}`;
  } else if (rental_data.fullAddress) {
    // fallback to full address
    url += `&query=${encodeURIComponent(rental_data.fullAddress)}`;
  } else {
    return; // nothing to show
  }

  window.open(url, "_blank"); // opens in new tab
};



export function LocationSearchBar({ searchQuery, setSearchQuery }) {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  // Sync input value with searchQuery
  useEffect(() => {
    if (searchQuery.location && searchQuery.location !== value) {
      setValue(searchQuery.location, false);
    }
  }, [searchQuery.location]);

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    setSearchQuery((prev) => ({
      ...prev,
      location: description,
    }));
  };

  return (
    <div className="SearchBar-section" style={{ position: "relative" }}>
      <Location_Svg />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter city or location"
        disabled={!ready}
        className="search-input"
      />
      {status === "OK" && (
        <ul
          className="suggestions-dropdown"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "#fff",
            zIndex: 1000,
            maxHeight: "200px",
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              style={{
                padding: "8px",
                cursor: "pointer",
              }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}


export function MapView({ properties }) {
  const mapRef = useRef(null);

  // Extract markers from properties
  const markers = properties
    .map((item) => {
      const coords = item?.property_location?.coordinates;
      if (!Array.isArray(coords) || coords.length !== 2) return null;
      return {
        lat: coords[1], // GeoJSON order: [lng, lat]
        lng: coords[0],
        title: item.listingTitle,
        address: item.fullAddress,
      };
    })
    .filter(Boolean);

  // Default center
  const defaultCenter = markers[0] || { lat: 0, lng: 0 };

  // Auto-fit bounds whenever markers change
  useEffect(() => {
    if (!mapRef.current || markers.length === 0) return;

    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((marker) =>
      bounds.extend(new window.google.maps.LatLng(marker.lat, marker.lng))
    );
    mapRef.current.fitBounds(bounds);
  }, [markers]);

  return (
    <GoogleMap
      mapContainerStyle={containerStyleSearch}
      center={defaultCenter}
      zoom={14} // initial zoom, will auto-fit anyway
      onLoad={(map) => (mapRef.current = map)}
      options={{ disableDefaultUI: true }}
    >
      {markers.map((marker, idx) => (
        <Marker
          key={idx}
          position={{ lat: marker.lat, lng: marker.lng }}
          title={marker.title}
        />
      ))}
    </GoogleMap>
  );
}