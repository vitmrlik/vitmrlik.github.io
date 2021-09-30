import {Component, NgZone, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'mal-maps';
  showOldMap = true;
  opacity = 0.1;

  map;
  mapClickListener;

  // map zoom level
  zoom: number = 15;

  // initial center position for the map
  defaultMapPosition = {
    lat: 49.20812882290773,
    lng: 17.595279087712342,
  };

  oldMapPosition = {
    lat: 49.20169028265298,
    lng: 17.589803490611967,
    bounds: {
      x: {
        latitude: 0,
        longitude: 0
      },
      y: {
        latitude: 0.0108,
        longitude:0.0132
      }
    }
  }

  constructor(protected zone: NgZone) {}

  oldMapShowToggle() {
    this.showOldMap = !this.showOldMap;
  }

  mapClicked(lat, lng) {
    console.log(
      `{
        lat: ${lat},
        lng: ${lng},
      }`
    );

    this.oldMapPosition = {
      ...this.oldMapPosition,
      lat: lat,
      lng: lng,
    }

    // this.markers.push({
    //   lat: lat,
    //   lng: lng,
    //   draggable: false
    // });

  }

  mapReadyHandler(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.zone.run(() => {
        this.mapClicked(e.latLng.lat(), e.latLng.lng())
      });
    });
  }

  ngOnDestroy() {
    if (this.mapClickListener) {
      this.mapClickListener.remove();
    }
  }


  markers: marker[] = [
    // {
    //   lat: 51.673858,
    //   lng: 7.815982,
    //   label: 'A',
    //   draggable: true
    // },
    // {
    //   lat: 51.373858,
    //   lng: 7.215982,
    //   label: 'B',
    //   draggable: false
    // },
    // {
    //   lat: 51.723858,
    //   lng: 7.895982,
    //   label: 'C',
    //   draggable: true
    // }
  ]

  setOpacity(number: number) {
    this.showOldMap = true;
    this.opacity = number;
  }

  setBoundLat(number: number) {
    this.showOldMap = false;
    this.oldMapPosition.bounds.y.latitude = this.oldMapPosition.bounds.y.latitude + number;
    this.oldMapPosition.bounds.y.longitude = this.oldMapPosition.bounds.y.longitude + number;
    this.showOldMap = true;

    console.log(this.oldMapPosition.bounds.y)
  }

  setBoundLng(number: number) {
    this.oldMapPosition.bounds.y.longitude = this.oldMapPosition.bounds.y.longitude + number;
    console.log(this.oldMapPosition.bounds)
  }
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
