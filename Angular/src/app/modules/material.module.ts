import { NgModule } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import matnativedatemodule, { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import matformfieldmodule, { MatFormFieldModule } from '@angular/material/form-field';
import matinputmodule, { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
    imports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ],
      exports: [
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
      ],
      providers: [ MatDatepickerModule ],
})

export class MaterialModule {}