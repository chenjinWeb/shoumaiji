
export function getLocation() {
  return new Promise((resolved, rejected) => {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(
      (res)=>{
        resolved({
          lat: res.latitude,
          lng: res.longitude,
        })
      },
      (res)=>{
        rejected(res);
      }
    )
    /*navigator.geolocation.getCurrentPosition(
      (res) => {
        resolved({
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        })
      },
      (res) => {
        rejected(res);
      }
    )*/
  })
}

