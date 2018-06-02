import { NgModule } from '@angular/core';
import { DialogueContainerComponent } from './dialogue-container/dialogue-container';
import { LoaderComponent } from './loader/loader';
@NgModule({
	declarations: [DialogueContainerComponent,
    LoaderComponent],
	imports: [],
	exports: [DialogueContainerComponent,
    LoaderComponent]
})
export class ComponentsModule {}
