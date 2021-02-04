import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  formGroup: any;
  locales: any;
  map: google.maps.Map;
  markers: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private globalService: GlobalService
  ) { 
      this.formGroup = formBuilder.group({
        comuna: new FormControl("", {}),
        local: new FormControl("", {})
      });
    }

  async ngOnInit() {
    this.locales = await this.globalService.locales().toPromise();
    this.initMap();
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -33.4724727, lng: -70.9100297},
      zoom: 10,
    });
  }

  search(): void {
    let locales = this.locales;

    if (this.formGroup.get('comuna').value) {
      locales = locales.filter((obj: any) => {
        return obj.comuna_nombre.toLowerCase().indexOf(this.formGroup.get('comuna').value.toLowerCase()) !== -1
      });
    }

    if (this.formGroup.get('local').value) {
      locales = locales.filter((obj: any) => {
        return obj.local_nombre.toLowerCase().indexOf(this.formGroup.get('local').value.toLowerCase()) !== -1
      });
    }
    
    for (let marker of this.markers) {
      marker.setMap(null);
    }

    this.markers = [];

    for (let local of locales) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(local.local_lat, local.local_lng),
        title: local.local_nombre
      });
      
      marker.setMap(this.map);
      this.markers.push(marker);
    }
  }
}
