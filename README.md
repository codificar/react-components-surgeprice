# Tarifa dinâmica - Heatmap

## Setup

**Install dependencies**
```shell
npm install
```

**Generate Android debug keystore:**

```shell
cd android/app/

keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000
```

**Specify your Google Maps API key:**

Add your API key to your manifest file (`android/app/src/main/AndroidManifest.xml`):

```xml
<application>
   <!-- You will only need to add this meta-data tag, but make sure it's a child of application -->
   <meta-data
     android:name="com.google.android.geo.API_KEY"
     android:value="Your Google maps API Key Here"/>

   <!-- You will also only need to add this uses-library tag -->
   <uses-library android:name="org.apache.http.legacy" android:required="false"/>
</application>
```

**Specify Heatmap API server:**

Add the Heatmap API server domain (`App.js`):

```javascript
  const server = '192.168.0.12:8000' // REPLACE WITH HEATMAP API SERVER IP
```

## Run on Android
```shell
react-native run-android
```
