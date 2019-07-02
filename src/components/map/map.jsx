import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

import {MapParams} from '../../data';
import {getLocationsCoordinates} from '../../reducers/data/data';
import leaflet from 'leaflet';

export default class Map extends PureComponent {
  constructor(props) {
    super(props);

    this._markerGroup = null;
    this._mapRef = createRef();
  }

  set markerGroup(object) {
    this._markerGroup = object;
  }

  get markerGroup() {
    if (this._markerGroup &&
      typeof this._markerGroup === `object`) {
      return this._markerGroup;
    }
    return {};
  }

  render() {
    return (
      <div ref={this._mapRef}></div>
    );
  }

  componentDidMount() {
    const {locations, mapId} = this.props;

    const currentMap = this._mapRef.current;

    currentMap.id = mapId;
    const {
      ZOOM, CITY, ICON, TILE_LAYER
    } = MapParams;

    const icon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: ICON.SIZE,
      id: null
    });

    const newIcon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: [40, 40],
      id: null
    });

    const map = leaflet.map(currentMap, {
      center: CITY,
      zoom: ZOOM,
      zoomControl: false,
      marker: true
    }).setView(CITY, ZOOM);


    leaflet.tileLayer(TILE_LAYER.URL, {
      attribution: TILE_LAYER.OPTIONS.ATTRIBUTION
    })
      .addTo(map);

    this.markerGroup = leaflet.layerGroup().addTo(map);

    const markers = [...locations].forEach((it) => {

      return leaflet.marker(getLocationsCoordinates(it), {icon, id: it.id})
        .addTo(this.markerGroup).on('click', (e) => {

        const {target} = e;
        target.setIcon(newIcon);
      });
    });
  }

  componentDidUpdate() {
    const {locations} = this.props;

    const {ICON} = MapParams;

    const icon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: ICON.SIZE
    });

    const newIcon = leaflet.icon({
      iconUrl: ICON.URL,
      iconSize: [40, 40],
      id: null
    });

    this.markerGroup.clearLayers();

    const markers = [...locations].forEach((it) =>
      leaflet.marker(it, {icon}).addTo(this.markerGroup).on('click', (e) => {
        const {target} = e;

        target.setIcon(newIcon);
      }));

    console.log(this.markerGroup);
  }
}

Map.propTypes = {
  mapId: PropTypes.string.isRequired,
  locations: PropTypes.array.isRequired
};
