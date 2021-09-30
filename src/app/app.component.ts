import {Component, NgZone, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'mal-maps';
  showOldMap = true;
  opacity = 1;

  map;
  mapClickListener;

  // map zoom level
  zoom: number = 14;

  // initial center position for the map
  defaultMapPosition = {
    lat: 49.20390905014341,
    lng: 17.597403397252137,
  };

  oldMapPosition = {
    lat: 49.20169089718813,
    lng: 17.589595155109237,
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
      lat: lat,
      lng: lng
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
}

// just an interface for type safety.
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable?: boolean;
}
