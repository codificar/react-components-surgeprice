import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import { Heatmap, Marker } from 'react-native-maps';
import mapStyle from './MapStyle';
import SurgeMarker from './SurgeMarker';

export default App = () => {
  const server = '192.168.0.12:8000' // REPLACE WITH YOU API SERVER IP
  const [isLoading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [heatmaps, setHeatmapsData] = useState([]);
  const [labels, setLabels] = useState([])
  const getData = async () => {
     try {
      setLabels([]);
      const response = await fetch('http://'+server+'/surgeprice/heatmap');
      if(response.status == 200) {
        const json = await response.json();
        if(json.heatmaps.length > 0)
        {
          setHeatmapsData(json.heatmaps);
          setLabels(json.labels);
          setHasData(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const refresh = async () => {
    setHeatmapsData([]);
    setLabels([]);
    setLoading(true);
    getData();
  }

  useEffect(() => {
    getData();
  }, []);

  let location = {
    // PA
    latitude: -1.370539159114192,
    longitude: -48.45840664158488,
    // PE
    // latitude: -8.2822629,
    // longitude: -35.9714897,
    latitudeDelta: 0.17,
    longitudeDelta: 0.17,
  };

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center"
    }}>

      {isLoading ? <ActivityIndicator/> : (
        <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        mapType='standard'
        minZoomLevel={12.0}
        maxZoomLevel={13.5}
        customMapStyle={mapStyle}
        region={location}
        >
            {hasData && labels.map((label) => (
            <Marker key={label.key}
            coordinate={label.location} >
              <SurgeMarker amount={label.multiplier} />
            </Marker>
            ))}
            {hasData && heatmaps.map((heatmap) => (
              <Heatmap key={heatmap.key}
                opacity={0.5}
                points={heatmap.points}
                gradient={heatmap.gradient}
              />
            ))}
        </MapView> 
      )}

    <View style={{position: "absolute", top: 10}}>
      <Button
        title="Refresh"
        onPress={refresh}
        />
    </View>
    </View>
  );
};
