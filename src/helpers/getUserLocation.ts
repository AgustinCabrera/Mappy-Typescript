
export const getUserLocation = async(): Promise<[number,number]> => {
  return new Promise ((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (error) => {
        alert('error getting location');
        console.log(error);
        reject(error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  });
}
