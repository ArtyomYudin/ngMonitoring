import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';

declare let streamCamRoom1: any;

@Component({
  selector: 'app-server-room-1',
  templateUrl: './server-room-1.component.html',
  styleUrls: ['./server-room-1.component.scss'],
})
export class ServerRoom1Component implements OnInit {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) {}

  public ngOnInit(): void {
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader
      .load('jsmpeg', 'videocanvas')
      .then(() => {
        // Script Loaded Successfully
        streamCamRoom1();
      })
      .catch(error => console.log(error));
  }
}
