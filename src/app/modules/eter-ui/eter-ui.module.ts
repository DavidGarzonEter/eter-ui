import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/** @material modules */

import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

const Material = [
  MatSlideToggleModule,
  MatProgressBarModule,
  MatRippleModule,
  MatBottomSheetModule,
  MatChipsModule,
  MatTreeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatBadgeModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatListModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatTabsModule,
  MatCardModule,
  MatStepperModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSliderModule
];

/** end @material mdoules */

/** @Bootstrap module */
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/** end @Bootstrap module */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpClientModule } from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TableModalComponent } from './components/data-table/table-modal/table-modal.component';
import { CombosComponent } from './components/combos/combos.component';
import { HttpService } from '../services/http.service';
import { FileInputComponent } from './components/file-input/file-input.component';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { LoadingComponent } from '../services/loading/loading.component';

import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

export function playerFactory() {
  return player;
}


@NgModule({
  declarations: [
    DataTableComponent,
    TableModalComponent,
    CombosComponent,
    FileInputComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    Material,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialFileInputModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  exports: [
    Material,
    DataTableComponent,
    TableModalComponent,
    CombosComponent,
    FileInputComponent,
    LoadingComponent
  ],
  providers: [
    HttpService
  ],
  entryComponents:[
    TableModalComponent,
    LoadingComponent
  ]
})
export class EterUiModule { }
