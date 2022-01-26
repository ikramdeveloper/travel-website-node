const api = "sNAxHn1Oh2Mtqn4KQopNaQKZ7iFuA392oxvAwCwqtrU";

const landmarkName = document.querySelector(".landmark-name").textContent;

// Create a Platform object (one per application):
const platform = new H.service.Platform({
  apikey: api,
});

// Get an object containing the default map layers:
const defaultLayers = platform.createDefaultLayers();
const service = platform.getSearchService();

service.geocode(
  {
    q: landmarkName,
  },
  (result) => {
    const map = new H.Map(
      document.querySelector(".map"),
      defaultLayers.vector.normal.map,
      {
        zoom: 10,
        center: result.items[0].position,
      }
    );
    map.addObject(new H.map.Marker(result.items[0].position));
    const ui = H.ui.UI.createDefault(map, defaultLayers);
  },
  alert
);
