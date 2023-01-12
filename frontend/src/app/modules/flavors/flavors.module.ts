import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlavorsComponent } from './flavors/flavors.component';
import { FlavorsRoutingModule } from './flavors-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from 'src/app/highlight.directive';
import { MatRippleModule } from '@angular/material/core';
import { FlavorComponent } from './flavor/flavor.component';
import { PricePipe } from 'src/app/pipes/price.pipe';
import { CommentsComponent } from './comments/comments.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  declarations: [
    FlavorsComponent,
    HighlightDirective,
    FlavorComponent,
    PricePipe,
    CommentsComponent
  ],
  imports: [
    CommonModule,
    FlavorsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  exports: [
    HighlightDirective,
    PricePipe,
  ]
})
export class FlavorsModule { }
