import { Component, OnInit } from '@angular/core';
import { DynamicScriptLoaderService } from '@services/dynamicscriptloader.service';

declare let streamCamRoom2: any;

@Component({
  selector: 'app-server-room-2',
  templateUrl: './server-room-2.component.html',
  styleUrls: ['./server-room-2.component.scss'],
})
export class ServerRoom2Component implements OnInit {
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService) { }

  public ngOnInit() :void {
    this.loadScripts();
  }

  private loadScripts() {
    this.dynamicScriptLoader.load('jsmpeg', 'videocanvas').then(() => {
      // Script Loaded Successfully
      streamCamRoom2();
    }).catch((error) => console.log(error));
  }
}
