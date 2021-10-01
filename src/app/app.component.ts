import {Component, NgZone, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {AddPlaceDialogComponent} from './components/add-place-dialog/add-place-dialog.component';

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

  constructor(protected zone: NgZone, private dialog: MatDialog) {}

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

    // this.oldMapPosition = {
    //   ...this.oldMapPosition,
    //   lat: lat,
    //   lng: lng,
    // }


    let dialogRef = this.dialog.open(AddPlaceDialogComponent, {
      height: '500px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result){
        return;
      }
      console.log(`Dialog result:`, result);
      this.markers.push({
        id: this.markers.length,
        lat: lat,
        lng: lng,
        data: result
      });
      console.log(this.markers);
    });
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

  markers: marker[] = [ { "id": 1, "lat": 49.20735603027842, "lng": 17.595353225944535, "data": { "name": "Kruhový objezd", "file": "objezd1990", "description": "Fotka jak se to stavilo v roce 2015. Pozorně si prohlédněte dělníka s červenou čepicí." } }, { "id": 1, "lat": 49.20932904146495, "lng": 17.59640006301824, "data": { "name": "Hospoda na rožku", "file": "hospoda1940", "description": "Podle této budovy, a také podle areálu VLW je zarovnána historická mapa." } }, { "id": 2, "lat": 49.20277841063265, "lng": 17.5956347590512, "data": { "name": "Alej rodinných domů", "file": "zabrani1889", "description": "Docela zajímavé pokoukaní, že tady historická mapa hezky sedí." } } ]
  showMarkers = true;

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

  editMark(id: number) {
    let is = this.markers.find(m => m.id === id);
    console.log(is);
    let dialogRef = this.dialog.open(AddPlaceDialogComponent, {
      height: '500px',
      width: '600px',
      data: { place: is.data }
    });
  }

  deleteMark(id: number) {
    const index = this.markers.map(m => m.id).indexOf(id);
    this.markers.splice(index, 1);
  }

  output() {
    console.log('EXPORT >> ', this.markers);
  }

  markersToggle() {
    this.showMarkers = !this.showMarkers;
  }
}

// just an interface for type safety.
interface marker {
  id: number;
  lat: number;
  lng: number;
  data: Place;
}

export interface Place {
  name: string,
  file: string,
  description: string
}
